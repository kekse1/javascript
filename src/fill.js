#!/usr/bin/env node

//
// Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
// https://kekse.biz/ https://github.com/kekse1/javascript/
// v0.0.2
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

for(var i = 3; i < process.argv.length; ++i)
{
	if(isNaN(process.argv[i]))
	{
		fill += process.argv[i];
	}
	else
	{
		fill += String.fromCharCode(Math.floor(Math.abs(Number(process.argv[i]))) % 256);
	}
}

if(!fill)
{
	console.error('Missing parameter(s) (fill pad string(s) or integer(s))');
	process.exit(3);
}

var data = new Uint8Array(fill.length);
for(var i = 0; i < fill.length; ++i) data[i] = fill.charCodeAt(i);

var diff; for(var i = 0; i < length; i += data.length)
{
	if((diff = (length - data.length)) < data.length)
	{
		data = data.slice(0, diff);
	}

	process.stdout.write(data);
}

