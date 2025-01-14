/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/javascripts/
 * v0.1.0
 *
 * This is radix/base conversion, but only for bytecode (so
 * radix/base 256). Here's only the BigInt part, for regular
 * Integers you could change it a bit, or you use the 'power'
 * of Typed Arrays (which I don't like that much..).
 *
 * You could use it for more efficient encoding of numbers,
 * on disk or via network transmission, etc.
 */

//
const DEFAULT_STRING = true;

//
if(typeof BigInt.fromBytes === 'undefined')
	Reflect.defineProperty(BigInt, 'fromBytes', { value: (... _bytes) => {
		if(_bytes.length === 0)
		{
			return 0n;
		}
		
		var array;

		if(_bytes.length === 1)
		{
			if(typeof _bytes[0] === 'number')
			{
				array = Uint8Array.from(_bytes);
			}
			else if(typeof _bytes[0] === 'string')
			{
				array = new Uint8Array(_bytes[0].length);

				for(var i = 0; i < _bytes[0].length; ++i)
				{
					array[i] = _bytes[0].charCodeAt(i);
				}
			}
			else if(Array.isArray(_bytes[0]))
			{
				array = Uint8Array.from(_bytes[0]);
			}
			else
			{
				array = _bytes[0];
			}
		}
		else
		{
			array = Uint8Array.from(_bytes);
		}

		var result = 0n;

		for(var i = array.length - 1, mul = 1n; i >= 0; --i, mul *= 256n)
		{
			result += (mul * BigInt(array[i]));
		}

		return result;
	}});

if(typeof BigInt.prototype.toBytes === 'undefined')
	Reflect.defineProperty(BigInt.prototype, 'toBytes', { value: function(_string = DEFAULT_STRING)
	{
		var result = '';
		var rest = this.valueOf();

		if(this.valueOf() > 0n)
		{
			while(rest >= 256n)
			{
				result = String.fromCharCode(Number(rest % 256n)) + result;
				rest /= 256n;
			}

			if(rest > 0n)
			{
				result = String.fromCharCode(Number(rest)) + result;
			}
		}
		else
		{
			result = String.fromCharCode(0);
		}

		//
		if(_string)
		{
			return result;
		}

		const array = new Uint8Array(result.length);

		for(var i = 0; i < result.length; ++i)
		{
			array[i] = result.charCodeAt(i);
		}

		return array;
	}});
