#!/usr/bin/env node

/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://norbert.com.es/
 * v0.2.0
 *
 * Little toy! ^_^
 *
 * "Maps" some counted values in a coordinate system,
 * so it draws kinda chess board ... in your console/
 * terminal! ;-)
 *
 * please just try it out, or think for yourself what
 * it does.. it's christmas, and I've to be fast now..
 *
 * DEPENDS on my own library, so you've to adapt this
 * script for your own..! And please make comment signs
 * on the bottom function call "example()".
 *
 */

//
const MAX_WIDTH = 32;
const MAX_HEIGHT = 32;

const array = new Uint8Array(256 * 256);
var maxValue = 0;
var maxX = 0;
var maxY = 0;

const map = (_x, _y, _add = 1, _w = MAX_WIDTH, _h = MAX_HEIGHT) => {
	_x %= _w; _y %= _h;
	array[_x + (256 * _y)] += _add;
	const len = array[_x + (256 * _y)].toString().length;
	if(len > maxValue) maxValue = len;
	if(_x > maxX) maxX = _x;
	if(_y > maxY) maxY = _y;
};

var alreadyDrawn = false;

map.draw = () => {
	const max = Math.max(maxX, maxY);

	if(alreadyDrawn)
		process.stdout.write('\r' + String.up(max + 3) + String.clearAfter());
	else	alreadyDrawn = true;

	process.stdout.write(EOL);
	var v;

	for(var y = 0; y <= max; ++y)
	{
		for(var x = 0; x <= max; ++x)
		{
			v = ' ' + array[x + (256 * y)].toString().
				padStart(maxValue, ' ') + ' ';

			// 
			// chess.
			// 
			if(((x + y) % 2) === 0)
			{
				v = v.fg(255, 255, 255, true).
					bg(0, 0, 0, true);
			}
			else
			{
				v = v.fg(0, 0, 0, true).
					bg(255, 255, 255, true);
			}

			process.stdout.write(v);
		}

		process.stdout.write(String.none() + EOL);
	}

	process.stdout.write(EOL);
};

export default map;

//
process.once('exit', () => {
	if(maxValue > 0)
	{
		map.draw();
	}
});

//
const example = () => {
	map(0, 0);
	map(0, 0);
	map(1, 1);
	map(0, 0);
	map(1, 2);
	map(1, 3);
	map(1, 4);
	map(0, 2);
	map(0, 3);
	map(1, 4);
	map(1, 4);
	map(0, 4, 12);
	map(2, 4, 2);
	map(6, 3, 10);
	//map.draw();
};

//
example();

