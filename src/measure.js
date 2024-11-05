// 
// Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
// https://kekse.biz/ https://github.com/kekse1/javascript/
<<<<<<< HEAD
// v0.2.0
=======
// v0.1.1
>>>>>>> 01ae181cdd9b4bbd3cbe33b1b9d13e853ea34c16
// 
// Two functions to measure the throughput of your data, in
// bytes per second (for milliseconds remove the multiplication
// with 1000); and the ETA ('Estimated Time Of Arrival'), in
// milliseconds (multiply with 1000 for seconds).
// 

//
const measure = {};

measure.throughput = (_time, _size) => {
	if(typeof _size === 'bigint') _size = Number(_size);
	if(typeof _time === 'bigint') _time = Number(_time / 1000000n);
	if(_size <= 0 || _time <= 0) return 0;
	return Math.max(0, (_size / _time * 1000)); };

measure.estimated = (_time, _size, _rest) => {
	if(typeof _size === 'bigint') _size = Number(_size);
	if(typeof _time === 'bigint') _time = Number(_time / 1000000n);
	if(typeof _rest === 'bigint') _rest = Number(_rest);
	if(_size <= 0 || _time <= 0 || _rest <= 0) return 0;
	return Math.max(0, (_rest / (_size / _time))); };

//
export default measure;

