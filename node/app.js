/**
 * Created by githop on 1/10/16.
 */

//generators are functions that can be paused and resumed. <-- the short answer
//

//Intro
//It turns out functions that can be paused and resumed makes opens the door for many useful tasks.
//They are used, among other things, for blocking on async function calls and can be used to implement iterables.
//On the flip side, they can also be used to implement Observers.
//The last really useful thing folks use generators for are cooperative multitasking, aka co-routines.

//The main difference between the above mentioned patterns concerns data flow.

//If you want a generator to produce data,implement an iterator;
//it will give you values when you ask for it (via calling the next() method).

//if you want a generator to consume data, implement an observer,
//you can push values to it (via passing a value to next() as a param, aka next(value));

//if you want a generator to produce AND consume data, a co-routine is the way to go.
//more to come!

//when it comes to Angular...
//There will be angular specific examples tonight, although tonight I am going to try something different.
//This is perhaps the 3rd or 4th time I've been able to give a presentation at a meetup. I usually have slides
//set up in order to guide the presentation. Rather than use static slides, I figure we can actually do some
//live coding together and run through some examples together.

//(live coding has way more potential for failure then slides, but I did say I wanted to try something different...)

//Let's get started!

// 1. what a generator looks like
//	a function with a " * " prepended the function name AND
//  0 or more yield statements in the body.

//a lame, yet valid generator.
function *myFirstGenerator() {
    yield;
}

//we can see the * and yeild statements.
//you can define a generator sans yield statements, although it will immediately set done = true when called.

function *noYield() {

}


//EXAMPLE no yield statement
//console.log('no yield', noYield().next());

//a slightly more interesting generator

function *secondGen() {
    yield 'Hello';
    yield 'world!';
}

//Lets take a look at some of the convenient ways to work with generators, due to them implementing the iteratble interface.

//EXAMPLE destructure output form generator.
//let [hello, world] = secondGen();

//console.log(`${hello} ${world}`);

//a lot just happened there, lets take a step back and highlight some things.
//first, since generators implement iterables, they can be used with any construct that handles iterables:
//such as for..of loops, and (as we just saw.), destructuring and spread operator

//EXAMPLE for..of

//for (let word of secondGen()) {
//	console.log(word);
//}

//EXAMPLE spread operator


//console.log([...secondGen()].join('\n'));

//lets take a closer look at the generator itself.
//behind the scenes, when you call a generator function, the function does not execute
//like regular functions. Instead, a generator object is returned, which you can use the control the flow of
//the generator function.

//lets take a look a the actual generator object. it has two properties, value and done.

//EXAMPLE initialize a generator
//let runFunc = myFirstGenerator();

//after we have a reference to our generator, start the generator by calling the next() method.
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
//run.next(); //advances thirdGen() to the first yield statement on line 109
//run.next(); //advances thirdGen() to line 111;
//console.log(run.next()); //one more time, line 112 ;)

////calls to next() will return value undefined after generator exits.
//console.log(run.next());
//console.log(run.next());

//lets switch context and begin talking about some practical applications for generators, starting with data producers.
//Data producers, implementing an interable.

//Gererators are used to easily implement iterable sequences. When I say 'iterable' I mean
//the ES6 language spec for iterables and iterators.
//It's particularly easy to implement infinite or boundless sequences with generators as iterators.
//Let's make a simple generator that will generate a sequence of all natural numbers!

function *naturalNumbers() {
    let count = 0;
    while (true) {
        yield count++;
    }
}

//let setOfNums = naturalNumbers();
//
//for (var i = 0; i < 5; i++) {
//    console.log(setOfNums.next());
//}

//they keep state as well.

//console.log('ONE MORE!',setOfNums.next());

//Generators can also be passed data, as Observers.

function *alphabet() {
    var first;
    while (true) {
        first = yield first;
    }
}

//when using a generator as observer, you need to call next at least once to advance to the first yield statement
//at this point, the function will be ready to receive its first value.
//let abc = alphabet();
////ready it for input!;
//abc.next();
//console.log(abc.next('a'));
//console.log(abc.next('b'));
//console.log(abc.next('c'));

//we can see a few things about how yield works in the previous example.
//when you call next(), you are basically asking the generator for a value.
//It will give you what ever is yielded.
//This is only half the story. You can also send values back into the generator by calling next()
//When passing values thru next(), the value will be treated as the result of current yield statement.
function *manyYield() {
    let first = yield;
    //send out the fist value, and recieve the next one
    let second = yield first;
    return second;
}

//let g = manyYield();
//g.next();
//console.log('CALL', g.next('first!'));
//console.log('CALL', g.next('second!'));

//lets talk about coroutines!
//They are new to JS, although not new to programming.
//coroutines can be used to implement cooperative tasks that work with eachother.

//It's time our examples became a little more angular friendly as well ;)
//over to NG6-starter!
