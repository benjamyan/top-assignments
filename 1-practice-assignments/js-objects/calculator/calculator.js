function add (a, b) {
	return a + b;
}

function subtract (a, b) {
	return a - b;
}

function sum (arr) {
	let total = 0;
	if (arr.length > 0) total = arr.reduce((accumulator, currentValue) => accumulator + currentValue);
	return total;
}

function multiply (arr) {
	let total = 0;
	if (arr.length > 0) total = arr.reduce((accumulator, currentValue) => accumulator * currentValue);
	return total;
}

function power(a, b) {
	let total = a;
	for (let i = 0; i < (b - 1); i++) {
		total = total * a;
	}
	return total;
}

function factorial(a) {
	let total = [], final = 1;
	for (let i = 0; i < a; i++) {
		total.push(i + 1)
	}
	if (total.length > 1) {
		final = total.reduce((accumulator, currentValue) => accumulator * currentValue);
	}
	return final;
}

module.exports = {
	add,
	subtract,
	sum,
	multiply,
    power,
	factorial
}