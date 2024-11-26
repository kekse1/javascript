/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/javascript/
 * v0.2.0
 *
 * String extensions to support C {un,}escaping. Example given
 * `\n` is the newline character.
 *
 * Supports both escaping and unescaping. The latter will
 * produce strings with the encoded values, so `\n` will
 * become a real newline byte, and the first one will
 * encode the string `\n` out of the `\10` byte code.
 *
 * This will implement/extend globally (String.prototype),
 * so you don't need to import it twice (but checks it).
 */

//
if(typeof String.prototype.escape !== 'function')
{
	Reflect.defineProperty(String.prototype, 'escape', { value: function()
	{
		var result = '', byte;

		for(var i = 0; i < this.length; ++i)
		{
			if((byte = this.charCodeAt(i)) < 32) switch(byte)
			{
				case 0: result += '\\0'; break;
				case 7: result += '\\a'; break;
				case 8: result += '\\b'; break;
				case 9: result += '\\t'; break;
				case 10: result += '\\n'; break;
				case 11: result += '\\v'; break;
				case 12: result += '\\f'; break;
				case 13: result += '\\r'; break;
				case 27: result += '\\e'; break;
				default: result += this[i]; break;
			}
			else
			{
				result += this[i];
			}
		}

		return result;
	}});
}

if(typeof String.prototype.unescape !== 'function')
{
	Reflect.defineProperty(String.prototype, 'unescape', { value: function()
	{
		var result = '', byte;

		for(var i = 0; i < this.length; ++i)
		{
			if(this[i] === '\\' && i < (this.length - 1))
			{
				if(this[i + 1] === '\\')
				{
					result += this[++i];
					continue;
				}

				byte = this.charCodeAt(++i);

				switch(byte)
				{
					case 48:
						result += String.fromCharCode(0);
						break;
					case 97:
						result += String.fromCharCode(7);
						break;
					case 98:
						result += String.fromCharCode(8);
						break;
					case 101:
						result += String.fromCharCode(27);
						break;
					case 116:
						result += String.fromCharCode(9);
						break;
					case 110:
						result += String.fromCharCode(10);
						break;
					case 118:
						result += String.fromCharCode(11);
						break;
					case 102:
						result += String.fromCharCode(12);
						break;
					case 114:
						result += String.fromCharCode(13);
						break;
					default:
						result += this[--i];
						break;
				}
			}
			else
			{
				result += this[i];
			}
		}

		return result;
	}});
}

//
