/**
 * Created by githop on 1/11/16.
 */

/**
 * Created by githop on 1/10/16.
 */

//generators are functions that can be paused and resumed. <-- the short answer
//

//They are used, among other things, for blocking on async function calls and can be used to implement iterables.

// 1. what a generator looks like
//	a function with a " * " prepended the function name AND
//  0 or more yield statements in the body.

//a lame, yet valid generator.
function *myFirstGenerator() {
	yield;
}


//a slightly more interesting generator

function *secondGen() {
	yield 'Hello';
	yield 'world!';
}

//let [h, w] = secondGen();

//console.log(h + ' ' + w);

//a lot just happened there, lets take a step back and highlight some things.
//first, since generators implement iterables, they can be used with any construct that handles iterables:
//such as for..of loops, and (as we just saw.), destructuring and spread operator

//for..of
//for (let i of secondGen()) {
//	console.log(i);
//}

//spread operator
//console.log([...secondGen()].join(' '));


//lets take a closer look at the generator itself.
//behind the scenes, when you execute a generator function, the function does not execute
//like regular functions. Instead, a generator object is returned, which you can use the control the flow of
//the generator function.

//lets take a look a the actual generator object. it has two properties, value and done.

//initialize a generator
//let runFunc = myFirstGenerator();

//calling next() is how you start a newly initialized generator.
// next will return the generator object, complete with two properties
//let genObj = runFunc.next();

//console.log(genObj);
//calling next again, will resume advance our generator either to the next yield statement, or return.
//console.log(runFunc.next());

//upon completion, done is set to true.

//lets see another look at the control flow..

function *thirdGen() {
	console.log('Started!!');
	yield;
	console.log('resumed!');
	yield;
	return 'finished!';
}

//let run = thirdGen();

//-> 'Started!"
//run.next();
//run.next();
//console.log(run.next());
//calls to next() will return value undefined after generator exits.
//console.log(run.next());
//console.log(run.next());

/*
 We've seen enough thus far to dive a little deeper into three common applications of generators:
 1. Data producers, aka iterators
 2. Data consumers, aka observables
 3. coroutines, (both data producers and consumers), aka cooperatively multitasked tasks
 */


//Data producers, implementing an interable.

function *evenNumbers() {
	let start = 0;
	while (true) {
		start += 2;
		yield start;
	}
}

//let evens = evenNumbers();
//
////kick it off;
//
//for (let i of [1,2,3,4,5]) {
//	console.log(evens.next());
//}

function *take(n, iter) {
	for (let x of iter) {
		if (n <= 0) return;
		n--;
		yield x;
	}
}

//for (let p of take(10, evenNumbers())) {
//	console.log(p);
//}

function *mapGen(iter, mapFn) {
	for (let x of iter) {
		yield mapFn(x);
	}
}

const odds = [...take(10, mapGen(evenNumbers(), (n) => n - 1))];

console.log(odds);