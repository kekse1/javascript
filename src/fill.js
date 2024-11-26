#!/usr/bin/env node

//
// Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
// https://kekse.biz/ https://github.com/kekse1/javascript/
// v0.1.0
//
// *REALLY* tiny script.. I needed it because "there's no
// `/dev/byte`" or so, to be used via the `dd` utility...
//
// It's a tiny bit `awk`ward.. but hey, I really needed it. x)~
//
// So, argue with your wished target length and as many
// parameters you wish: either strings or integers, which
// we'll use here with `String.fromCodePoint()`.
//
// More than one parameter causes concatenation.
//
// UPDATE (v0.1.0): Bytes are encoded with '\' prefix now
// (with decimal base number, range 0-255); and you can
// escape the slash via '\\'. Even if I wonder why this
// was so tricky this time.. I used to make this better.
//

var length = process.argv[2];

if(isNaN(length))
{
	console.error('Invalid first parameter (target length)');
	process.exit(1);
}

if((length = Number(length)) < 1)
{
	console.error('Invalid first parameter (needs to be greater than zero)');
	process.exit(2);
}

var fill = '';
var byte = null, nan;

for(var i = 3; i < process.argv.length; ++i)
{
	for(var j = 0; j < process.argv[i].length; ++j)
	{
		if(byte !== null)
		{
			nan = isNaN(process.argv[i][j]);

			if(nan || byte.length === 3)
			{
				if(byte.length > 0)
				{
					fill += String.fromCharCode(Number(byte) % 256);
				}
				else if(process.argv[i][j] !== '\\')
				{
					fill += '\\';
				}

				if(nan)
				{
					fill += process.argv[i][j];
				}

				byte = null;
			}
			else
			{
				byte += process.argv[i][j];
			}
		}
		else if(process.argv[i][j] === '\\')
		{
			byte = '';
		}
		else
		{
			fill += process.argv[i][j];
		}
	}
}

if(byte !== null)
{
	if(byte.length > 0)
	{
		fill += String.fromCharCode(Number(byte) % 256);
	}
	else
	{
		fill += '\\';
	}
}

if(!fill)
{
	console.error('Missing parameter(s) (fill pad string(s) or integer(s))');
	process.exit(3);
}

for(var i = 0; i < length; ++i)
{
	process.stdout.write(fill[i % fill.length]);
}

