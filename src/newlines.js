#!/usr/bin/env node

const SUMMARY = {
	colors: true,
	compact: true
};

/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/javascripts/
 * v0.1.0
 *
 * Counts any occurence of various (UNIX, DOS, MAC) newlines
 * if called without additional parameters; as follows:
 *
 * 	  -d / --dos
 * 	  -u / --unix
 *	  -m / --mac
 *	[ -c / --count ]
 *
 * They define the optional target format to which the input
 * will be converted to. Optional, and only one of them per
 * call (last occurence rules).
 * 
 * If `stdin` is being filled, no additional file path parameter
 * will be used. Or define any amount of file paths - they get
 * used in order. The `-` file is also allowed (also `stdin`).
 *
 * Files that don't exist or files with open/read errors will
 * always throw an exception.
 *
 * `stdout` is the place where either the count result will be,
 * or with enabled conversion `stdout` is the place for the new
 * data - `stderr` in this case for the count summary at the end.
 *
 */

//
import fs from 'node:fs';
import util from 'node:util';

//
const parseCommandLine = () => {
	var stopped = false;
	const input = [];
	var output = '';

	for(var i = 2, j = 0; i < process.argv.length; ++i)
	{
		if(process.argv[i] === '--')
		{
			stopped = true;
		}
		else if(process.argv[i] === '-')
		{
			input[j++] = '-';
		}
		else if(fs.existsSync(process.argv[i]))
		{
			input[j++] = process.argv.splice(i--, 1)[0];
		}
		else if(stopped)
		{
			continue;
		}
		else if(process.argv[i][0] !== '-')
		{
			throw new Error('The file \'' + process.argv[i] + '\' doesn\'t exist');
		}
		else if(process.argv[i][1] === '-') switch(process.argv[i])
		{
			case '--unix':
				output = '\n';
				break;
			case '--dos':
				output = '\r\n';
				break;
			case '--mac':
				output = '\r';
				break;
			case '--count':
				output = '';
				break;
		}
		else switch(process.argv[i])
		{
			case '-u':
				output = '\n';
				break;
			case '-d':
				output = '\r\n';
				break;
			case '-m':
				output = '\r';
				break;
			case '-c':
				output = '';
				break;
		}
	}

	return [ input, output ];
};

const result = {
	'\n': 0,
	'\r\n': 0,
	'\r': 0,
	'\n\r': 0 };
var last = null;

const countNewLines = (_chunk, _path, _stream, _replace = output) => {
	for(var i = 0; i < _chunk.length; ++i)
	{
		if(last !== null)
		{
			if(last === 10)
			{
				if(_chunk[i] === 13)
				{
					++result['\n\r'];
				}
				else
				{
					++result['\n'];
				}
			}
			else if(last === 13)
			{
				if(_chunk[i] === 10)
				{
					++result['\r\n'];
				}
				else
				{
					++result['\r'];
				}
			}

			process.stdout.write(_replace);
			last = null;
		}
		else if(_chunk[i] === 10)
		{
			if(_chunk[i + 1] === 13)
			{
				++result['\n\r'];
				++i;
			}
			else if(i === (_chunk.length - 1))
			{
				last = 10;
				continue;
			}
			else
			{
				++result['\n'];
			}

			process.stdout.write(_replace);
		}
		else if(_chunk[i] === 13)
		{
			if(_chunk[i + 1] === 10)
			{
				++result['\r\n'];
				++i;
			}
			else if(i === (_chunk.length - 1))
			{
				last = 13;
				continue;
			}
			else
			{
				++result['\r'];
			}

			process.stdout.write(_replace);
		}
		else if(_replace)
		{
			process.stdout.write(
				String.fromCharCode(
					_chunk[i]));
		}
	}
};

const openStdIn = () => {
	const result = process.stdin;
	result.on('data', (_chunk) => onData(_chunk, '-', null));
	result.once('end', () => onEnd('-', null));
	return result;
};

const openNextFile = (_path = input.shift()) => {
	if(!_path) return finish();
	if(_path === '-') return openStdIn();
	const result = fs.createReadStream(_path, {
		encoding: null,
		autoClose: true,
		emitClose: true });
	result.on('data', (_chunk) => onData(_chunk, _path, result));
	result.once('end', () => onEnd(_path, result));
	return result;
};

const onData = (_chunk, _path, _stream) => {
	return countNewLines(_chunk, _path, _stream, output);
};

const onEnd = (_path, _stream) => {
	if(last !== null)
	{
		++result[String.fromCharCode(last)];
		process.stdout.write(output);
		last = null;
	}

	setImmediate(() => openNextFile());
};

const finish = () => {
	const summary = util.inspect(result, SUMMARY);

	if(output) process.stderr.write(summary);
	else process.stdout.write(summary);

	process.exit();
};

//
const [ input, output ] = parseCommandLine();

if(!process.stdin.isTTY || input.length === 0)
{
	input.length = 0;
	openStdIn();
}
else
{
	openNextFile();
}

//

