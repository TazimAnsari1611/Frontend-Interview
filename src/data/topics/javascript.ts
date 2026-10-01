import type { Topic } from '../types'

export const javascript: Topic = {
  id: 'javascript',
  title: 'JavaScript',
  blurb: 'Closures, scope, this, the event loop, promises, and the other JS questions that come up in almost every frontend round, plus a few basics on REST APIs, status codes, CORS and fetch.',
  questions: [
    {
      id: 'js-1',
      question: 'What is a closure?',
      short:
        'A closure is when a function remembers the variables from the place where it was created, even after that outer function has finished running. I use it a lot for things like private state, counters, and event handlers that need some data. The inner function keeps a live reference to those variables, not a copy.',
      simple:
        'A function carries a backpack with the variables it could see when it was born. Even if you call it somewhere else later, the backpack is still there.',
      example: {
        lang: 'js',
        code: `function makeCounter() {
  let count = 0
  return () => ++count
}
const next = makeCounter()
next() // 1
next() // 2`,
      },
      followUp: ['Can closures cause memory leaks?', 'What is the classic var-in-a-loop closure problem?'],
    },
    {
      id: 'js-2',
      question: 'Explain scope and the scope chain.',
      short:
        'Scope decides where a variable is visible. We have global, function, and block scope. When JS looks for a variable, it checks the current scope first, then goes outward one level at a time until it reaches global. That lookup path is the scope chain. And it is lexical, so it is decided by where I write the code, not where I call it.',
      simple:
        'If a variable is not found in the current room, JS checks the room outside, then the next one, until it hits the outermost one. If it is nowhere, you get a ReferenceError.',
      example: {
        lang: 'js',
        code: `const a = 1
function outer() {
  const b = 2
  function inner() {
    const c = 3
    return a + b + c // finds a and b by walking up
  }
  return inner()
}`,
      },
      followUp: ['What is lexical scope?', 'What is the difference between function and block scope?'],
    },
    {
      id: 'js-3',
      question: 'What is hoisting?',
      short:
        'Hoisting means declarations are processed before the code runs, so they seem to move to the top of their scope. Function declarations are fully hoisted, so I can call them before they appear. var is hoisted and set to undefined. let and const are hoisted too but stay in the temporal dead zone until the line runs, so touching them early throws an error.',
      simple:
        'JS reads the whole file first and notes down all the names. That is why you can call a function before the line where you wrote it.',
      example: {
        lang: 'js',
        code: `console.log(a) // undefined
var a = 5

console.log(b) // ReferenceError (TDZ)
let b = 5

hello() // works
function hello() {}`,
      },
      followUp: ['What is the temporal dead zone?', 'Are function expressions hoisted?'],
    },
    {
      id: 'js-4',
      question: 'How does the this keyword work?',
      short:
        'this depends on how a function is called, not where it is written. In a method call it is the object before the dot. In a plain function call it is undefined in strict mode, or the global object otherwise. With new it is the new object, and call, apply, bind set it manually. Arrow functions are the exception, they take this from the surrounding scope.',
      simple:
        'Look at how the function is called. Who is on the left of the dot? That is this. Arrow functions ignore all that and just use the this of the place they were written.',
      example: {
        lang: 'js',
        code: `const user = {
  name: 'Sam',
  hi() { return this.name },
  hiArrow: () => this.name,
}
user.hi()       // 'Sam'
const f = user.hi
f()             // undefined (lost this)`,
      },
      followUp: ['Why do we lose this when passing a method as a callback?', 'How do arrow functions handle this?'],
    },
    {
      id: 'js-5',
      question: 'Explain prototypes and prototypal inheritance.',
      short:
        'Every object has an internal link to another object called its prototype. When I read a property and it is not on the object, JS follows that link up the chain until it finds it or reaches null. That is how methods are shared. Classes in JS are mostly nicer syntax on top of this same mechanism.',
      simple:
        'If an object does not have something, it asks its parent object, then the parent of that parent. That chain of asking is the prototype chain.',
      example: {
        lang: 'js',
        code: `const animal = { eats: true }
const dog = Object.create(animal)
dog.barks = true
dog.eats // true, found on the prototype

[].__proto__ === Array.prototype // true`,
      },
      followUp: ['Difference between __proto__ and prototype?', 'How do ES6 classes relate to prototypes?'],
    },
    {
      id: 'js-6',
      question: 'Explain the event loop.',
      short:
        'JS runs on one thread with a call stack. Async work like timers or network calls is handed to the browser, and when it finishes the callback goes into a queue. The event loop keeps checking, and when the call stack is empty it pushes the next task. Microtasks, like promise callbacks, always run before the next macrotask like setTimeout.',
      simple:
        'JS does one thing at a time. Slow things wait in a line outside. When JS is free, the loop picks the next one from the line. Promise callbacks get a VIP line that goes first.',
      example: {
        lang: 'js',
        code: `console.log('1')
setTimeout(() => console.log('2'), 0)
Promise.resolve().then(() => console.log('3'))
console.log('4')
// 1, 4, 3, 2`,
      },
      followUp: ['Microtask vs macrotask?', 'What happens if I block the call stack with a long loop?'],
    },
    {
      id: 'js-7',
      question: 'What is a Promise and what are its states?',
      short:
        'A Promise is an object that represents a value that will be available later. It starts as pending, then becomes fulfilled with a value or rejected with an error, and after that it never changes. I chain then and catch to handle results, and each then returns a new promise, which is why chaining works.',
      simple:
        'It is like a receipt for an order. Right now it is pending. Later it either succeeds with your item or fails with a reason.',
      example: {
        lang: 'js',
        code: `fetch('/api/user')
  .then(res => res.json())
  .then(user => console.log(user))
  .catch(err => console.error(err))
  .finally(() => console.log('done'))`,
      },
      followUp: ['What happens if I forget to catch a rejection?', 'How do you convert a callback API into a promise?'],
    },
    {
      id: 'js-8',
      question: 'How do async/await work, and how do you handle errors?',
      short:
        'async/await is syntax on top of promises. An async function always returns a promise, and await pauses that function until the promise settles, without blocking the main thread. For errors I wrap awaits in try/catch, or I attach a catch on the call. One thing I watch for is awaiting things one by one when they could run in parallel.',
      simple:
        'It lets me write async code that reads top to bottom like normal code. await says wait here for the result, but the rest of the page keeps working.',
      example: {
        lang: 'js',
        code: `async function load() {
  try {
    const [a, b] = await Promise.all([getA(), getB()])
    return a + b
  } catch (e) {
    console.error(e)
  }
}`,
      },
      followUp: ['Sequential vs parallel awaits?', 'Can you use await at the top level?'],
    },
    {
      id: 'js-9',
      question: 'Promise.all vs allSettled vs race vs any?',
      short:
        'Promise.all waits for all and rejects as soon as one fails. allSettled waits for all and gives me the status of each, so nothing throws. race settles with the first one to finish, success or failure. any resolves with the first success and only rejects if all fail. I pick based on whether one failure should break everything.',
      simple:
        'all: everyone must pass. allSettled: tell me how each one went. race: first one done wins. any: first success wins.',
      example: {
        lang: 'js',
        code: `await Promise.all([p1, p2])        // fails fast
await Promise.allSettled([p1, p2]) // [{status, value|reason}]
await Promise.race([p1, timeout])  // first settled
await Promise.any([p1, p2])        // first fulfilled`,
      },
      followUp: ['How would you implement a timeout for a fetch?'],
    },
    {
      id: 'js-10',
      question: 'call, apply and bind: what is the difference?',
      short:
        'All three let me set this for a function. call invokes it right away with arguments passed one by one. apply invokes it right away with arguments in an array. bind does not call it, it returns a new function with this permanently fixed, and I can pre-fill some arguments too.',
      simple:
        'call and apply run the function now, bind gives you a new function to run later. call takes a list, apply takes an array.',
      example: {
        lang: 'js',
        code: `function greet(greeting, punct) {
  return greeting + ' ' + this.name + punct
}
const u = { name: 'Sam' }
greet.call(u, 'Hi', '!')
greet.apply(u, ['Hi', '!'])
const g = greet.bind(u, 'Hi')
g('!')`,
      },
      followUp: ['Can you rebind a function that is already bound?', 'Write a polyfill for bind.'],
    },
    {
      id: 'js-11',
      question: 'var vs let vs const?',
      short:
        'var is function scoped, hoisted as undefined, and can be redeclared. let and const are block scoped and live in the temporal dead zone until declared. const cannot be reassigned, but the object it points to can still be changed. I use const by default, let when I need to reassign, and I basically never use var.',
      simple:
        'var is the old leaky one. let is for values that change. const is for values you do not reassign.',
      example: {
        lang: 'js',
        code: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i)) // 3 3 3
for (let j = 0; j < 3; j++) setTimeout(() => console.log(j)) // 0 1 2

const obj = { a: 1 }
obj.a = 2   // fine
obj = {}    // TypeError`,
      },
      followUp: ['Does const make an object immutable?', 'Why does let fix the loop problem?'],
    },
    {
      id: 'js-12',
      question: '== vs ===?',
      short:
        '=== compares value and type with no conversion. == converts types first, which gives odd results like 0 == "" being true. I almost always use ===, so I never have to remember the coercion rules. The one place I sometimes use == is x == null, which checks for both null and undefined in one go.',
      simple:
        '=== asks: same value and same type? == asks: same value after I convert them? The second one surprises people.',
      example: {
        lang: 'js',
        code: `0 == ''        // true
0 === ''       // false
null == undefined  // true
null === undefined // false
NaN === NaN    // false`,
      },
      followUp: ['How do you correctly check for NaN?', 'What is Object.is?'],
    },
    {
      id: 'js-13',
      question: 'What are map, filter and reduce?',
      short:
        'They are array methods that return new results without changing the original. map transforms each item and gives an array of the same length. filter keeps only the items that pass a test. reduce boils the array down to a single value, like a sum or an object. I chain them often for data shaping.',
      simple:
        'map changes every item. filter removes some items. reduce squashes everything into one thing.',
      example: {
        lang: 'js',
        code: `const nums = [1, 2, 3, 4]
nums.map(n => n * 2)            // [2,4,6,8]
nums.filter(n => n % 2 === 0)   // [2,4]
nums.reduce((sum, n) => sum + n, 0) // 10`,
      },
      followUp: ['Why should you pass an initial value to reduce?', 'map vs forEach?'],
    },
    {
      id: 'js-14',
      question: 'What is debouncing and how do you write it?',
      short:
        'Debounce delays a function until the user has stopped triggering it for some time. I use it on search inputs so I call the API after the user pauses typing instead of on every keystroke. The idea is simple: every call clears the previous timer and starts a new one.',
      simple:
        'Wait until the user stops, then run once. Like an elevator that waits for people to stop pressing the button before closing the door.',
      example: {
        lang: 'js',
        code: `function debounce(fn, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
const onSearch = debounce(q => fetchResults(q), 300)`,
      },
      followUp: ['How would you use debounce in React?', 'Can you add a leading option?'],
    },
    {
      id: 'js-15',
      question: 'What is throttling and how is it different from debounce?',
      short:
        'Throttle makes sure a function runs at most once in a given time window, no matter how often it is triggered. I use it for scroll, resize, or mousemove handlers. Debounce waits until the events stop, throttle runs regularly while they continue. So debounce for search input, throttle for scroll tracking.',
      simple:
        'Debounce: run after the noise stops. Throttle: run once every X milliseconds while the noise continues.',
      example: {
        lang: 'js',
        code: `function throttle(fn, limit) {
  let waiting = false
  return (...args) => {
    if (waiting) return
    fn(...args)
    waiting = true
    setTimeout(() => (waiting = false), limit)
  }
}`,
      },
      followUp: ['When would you pick requestAnimationFrame instead?'],
    },
    {
      id: 'js-16',
      question: 'Shallow copy vs deep copy?',
      short:
        'A shallow copy copies only the top level, so nested objects are still shared with the original. Spread and Object.assign are shallow. A deep copy duplicates everything nested. For that I use structuredClone, which is built in now. JSON.parse(JSON.stringify()) is the old trick, but it drops functions, undefined, and breaks Dates.',
      simple:
        'Shallow copy copies the box but the things inside are still the same things. Deep copy copies the things inside too.',
      example: {
        lang: 'js',
        code: `const a = { x: 1, nested: { y: 2 } }
const shallow = { ...a }
shallow.nested.y = 99
a.nested.y // 99, shared

const deep = structuredClone(a)
deep.nested.y = 5 // a is safe`,
      },
      followUp: ['What cannot structuredClone copy?', 'Why does immutability matter in React?'],
    },
    {
      id: 'js-17',
      question: 'What are event bubbling and capturing?',
      short:
        'When an event fires on an element, it goes through three phases. First it travels down from the window to the target, that is capturing. Then it hits the target. Then it travels back up through the parents, that is bubbling. Handlers run in the bubbling phase by default, and I can use stopPropagation to stop it from going further.',
      simple:
        'Click a button inside a div: the click is also felt by the div, and the body, going upward. That upward travel is bubbling.',
      example: {
        lang: 'js',
        code: `parent.addEventListener('click', () => console.log('parent'))
child.addEventListener('click', () => console.log('child'))
// click child: child, parent

parent.addEventListener('click', fn, true) // capture phase`,
      },
      followUp: ['stopPropagation vs preventDefault?', 'Do all events bubble?'],
    },
    {
      id: 'js-18',
      question: 'What is event delegation?',
      short:
        'Instead of adding a listener on every child, I add one on the parent and use event bubbling to catch clicks from the children. I check event.target to see which child was clicked. It is better for performance, and it also works for items added later, since I do not need to attach new listeners.',
      simple:
        'One listener on the list instead of one on every item. The click bubbles up, and the parent figures out who was clicked.',
      example: {
        lang: 'js',
        code: `list.addEventListener('click', e => {
  const item = e.target.closest('li')
  if (!item || !list.contains(item)) return
  console.log(item.dataset.id)
})`,
      },
      followUp: ['What is the downside of delegation?', 'Why use closest instead of target?'],
    },
    {
      id: 'js-19',
      question: 'How do ES modules work?',
      short:
        'ES modules let me split code into files with import and export. Each file has its own scope, so nothing leaks into global. Imports are static, so bundlers can analyze them and remove unused code, that is tree shaking. They are live bindings and loaded once, then cached. I can also use dynamic import() to load code lazily.',
      simple:
        'Each file keeps its own stuff private and only shares what it exports. Other files import only what they need.',
      example: {
        lang: 'js',
        code: `// math.js
export const add = (a, b) => a + b
export default function mul(a, b) { return a * b }

// app.js
import mul, { add } from './math.js'
const chart = await import('./chart.js') // lazy`,
      },
      followUp: ['ESM vs CommonJS?', 'Named vs default exports, which do you prefer?'],
    },
    {
      id: 'js-20',
      question: 'Explain destructuring and the spread/rest operators.',
      short:
        'Destructuring pulls values out of arrays or objects into variables in one line, and I can set defaults and rename too. The three dots do two jobs. Spread expands an array or object into pieces, which I use for copying and merging. Rest does the opposite, it collects the leftovers into one array or object, like in function params.',
      simple:
        'Destructuring unpacks. Spread opens a box and pours the items out. Rest gathers the leftover items into a box.',
      example: {
        lang: 'js',
        code: `const { name, age = 18, ...others } = user
const [first, , third] = arr
const merged = { ...a, ...b }
const copy = [...arr, 4]
function sum(...nums) { return nums.reduce((a, b) => a + b, 0) }`,
      },
      followUp: ['Is spread a deep copy?', 'How do you rename while destructuring?'],
    },
    {
      id: 'js-21',
      question: 'What is currying?',
      short:
        'Currying turns a function that takes many arguments into a chain of functions that each take one. So add(1, 2, 3) becomes add(1)(2)(3). It is useful when I want to pre-fill some arguments and reuse the result, like making a tax calculator from a generic one. It is built on closures.',
      simple:
        'Instead of giving all inputs at once, you give them one at a time, and the function remembers the earlier ones.',
      example: {
        lang: 'js',
        code: `const add = a => b => c => a + b + c
add(1)(2)(3) // 6

const addTax = rate => price => price * (1 + rate)
const gst = addTax(0.18)
gst(100) // 118`,
      },
      followUp: ['Currying vs partial application?', 'Write a generic curry function.'],
    },
    {
      id: 'js-22',
      question: 'What is memoization?',
      short:
        'Memoization is caching the result of a function based on its arguments, so if I call it again with the same input I return the stored answer instead of recomputing. It only makes sense for pure functions that are expensive. In React, useMemo and React.memo come from the same idea.',
      simple:
        'Remember the answer so you do not have to do the same hard math twice.',
      example: {
        lang: 'js',
        code: `function memoize(fn) {
  const cache = new Map()
  return arg => {
    if (cache.has(arg)) return cache.get(arg)
    const result = fn(arg)
    cache.set(arg, result)
    return result
  }
}`,
      },
      followUp: ['What are the downsides of memoizing?', 'How would you handle multiple arguments?'],
    },
    {
      id: 'js-23',
      question: 'What are generators and iterators?',
      short:
        'An iterator is any object with a next() method that returns value and done. A generator is a function marked with function* that can pause at yield and resume later, so it produces values lazily one at a time. I find them handy for infinite sequences, custom iteration, and they are what async/await was originally built on.',
      simple:
        'A normal function runs to the end. A generator can stop in the middle, hand you a value, and continue when you ask again.',
      example: {
        lang: 'js',
        code: `function* ids() {
  let i = 1
  while (true) yield i++
}
const g = ids()
g.next().value // 1
g.next().value // 2`,
      },
      followUp: ['What is Symbol.iterator?', 'Where have you actually used generators?'],
    },
    {
      id: 'js-24',
      question: 'What are WeakMap and WeakSet?',
      short:
        'They hold their keys weakly. The keys must be objects, and if nothing else references a key, the garbage collector can remove it and its entry. Because of that they cannot be iterated and have no size. I use a WeakMap to attach private data or cache to objects, like DOM nodes, without causing memory leaks.',
      simple:
        'A normal Map keeps the object alive forever. A WeakMap lets it go once nobody else uses it.',
      example: {
        lang: 'js',
        code: `const meta = new WeakMap()
let el = document.getElementById('box')
meta.set(el, { clicks: 0 })
el = null // entry can now be garbage collected`,
      },
      followUp: ['Why can you not loop over a WeakMap?', 'Map vs Object?'],
    },
    {
      id: 'js-25',
      question: 'How does garbage collection work in JavaScript?',
      short:
        'JS manages memory automatically. The engine uses mark and sweep. It starts from roots like global variables and the current stack, marks everything reachable, and frees whatever is not reachable. I do not control it directly, but I can cause leaks by keeping references, like forgotten timers, listeners, or global variables.',
      simple:
        'If nothing can reach an object anymore, JS throws it away. Leaks happen when we accidentally keep a path to something we no longer need.',
      example: {
        text: 'Common leaks: setInterval never cleared, event listeners never removed, closures holding big objects, detached DOM nodes still referenced in an array.',
      },
      followUp: ['How do you find a memory leak in Chrome DevTools?', 'What is reference counting and why is it not used?'],
    },
    {
      id: 'js-26',
      question: 'localStorage vs sessionStorage vs cookies?',
      short:
        'localStorage persists until cleared and is shared across tabs of the same origin. sessionStorage lasts only for that tab. Both give about 5MB, are synchronous, and are never sent to the server. Cookies are small, around 4KB, and are sent with every request, which is why they are used for sessions. For auth tokens I prefer httpOnly cookies, since JS storage is open to XSS.',
      simple:
        'localStorage: stays after closing. sessionStorage: gone when the tab closes. Cookies: small and travel to the server on every request.',
      example: {
        lang: 'js',
        code: `localStorage.setItem('theme', 'dark')
JSON.parse(localStorage.getItem('user') || 'null')
document.cookie = 'a=1; max-age=3600; secure; samesite=strict'`,
      },
      followUp: ['What do httpOnly, Secure and SameSite do?', 'Can you store objects in localStorage?'],
    },
    {
      id: 'js-27',
      question: 'What are the primitive types in JS, and primitives vs references?',
      short:
        'The primitives are string, number, boolean, null, undefined, symbol and bigint. Everything else is an object. Primitives are copied by value and are immutable. Objects, arrays and functions are copied by reference, so two variables can point to the same object and a change through one shows in the other.',
      simple:
        'Primitives: you get your own copy. Objects: you get a link to the same thing.',
      example: {
        lang: 'js',
        code: `let a = 1, b = a
b = 2        // a is still 1

const x = { n: 1 }
const y = x
y.n = 2      // x.n is 2 too
typeof null  // 'object' (old bug)`,
      },
      followUp: ['Why is typeof null object?', 'null vs undefined?'],
    },
    {
      id: 'js-28',
      question: 'Arrow functions vs regular functions?',
      short:
        'Arrow functions are shorter, but the real difference is that they have no own this, arguments, or prototype. They take this from where they were defined. So they are great for callbacks and inside class methods. But I do not use them as object methods when I need this, and they cannot be used with new.',
      simple:
        'Arrow functions borrow this from outside. Regular functions get their own this depending on how they are called.',
      example: {
        lang: 'js',
        code: `class Timer {
  seconds = 0
  start() {
    setInterval(() => this.seconds++, 1000) // this is the Timer
  }
}`,
      },
      followUp: ['Can an arrow function be a constructor?', 'Do arrow functions have arguments?'],
    },
    {
      id: 'js-29',
      question: 'What is a higher-order function?',
      short:
        'It is a function that takes another function as an argument, returns a function, or both. map, filter, and setTimeout are examples, and so are debounce and memoize. It works because functions in JS are first-class values, I can pass them around like any other value.',
      simple:
        'A function that works with other functions.',
      example: {
        lang: 'js',
        code: `const withLog = fn => (...args) => {
  console.log('calling', fn.name, args)
  return fn(...args)
}
const loggedAdd = withLog((a, b) => a + b)`,
      },
      followUp: ['What does first-class function mean?'],
    },
    {
      id: 'js-30',
      question: 'What is a pure function and why does it matter?',
      short:
        'A pure function gives the same output for the same input and has no side effects, so it does not modify outside variables, call APIs, or touch the DOM. They are easy to test, easy to reason about, and safe to memoize. React expects components and reducers to be pure for the same reason.',
      simple:
        'Same input, same output, and it does not mess with anything outside itself.',
      example: {
        lang: 'js',
        code: `// pure
const add = (a, b) => a + b

// impure
let total = 0
const addToTotal = n => (total += n)`,
      },
      followUp: ['What is a side effect?', 'Why does Redux need pure reducers?'],
    },
    {
      id: 'js-31',
      question: 'What is the difference between null and undefined?',
      short:
        'undefined means a variable exists but has no value yet, or a property is missing, or a function returned nothing. null is a value I set on purpose to say there is nothing here. They are loosely equal but not strictly equal. I use null when I want to explicitly clear something and let undefined happen naturally.',
      simple:
        'undefined: nobody gave it a value. null: someone intentionally said empty.',
      example: {
        lang: 'js',
        code: `let a          // undefined
const b = null // intentional
a == b         // true
a === b        // false
user?.address?.city ?? 'N/A'`,
      },
      followUp: ['What does the ?? operator do vs ||?', 'What is optional chaining?'],
    },
    {
      id: 'js-32',
      question: 'How do classes work in ES6? Are they real classes?',
      short:
        'Classes are syntax sugar over prototypes. A class gives me a constructor, methods that live on the prototype, extends for inheritance, super to call the parent, static methods, and now private fields with the hash prefix. Under the hood it is still prototypal inheritance, but the syntax is cleaner and easier to read.',
      simple:
        'It looks like classes from other languages, but under the hood it is still the same prototype chain.',
      example: {
        lang: 'js',
        code: `class Animal {
  #secret = 1
  constructor(name) { this.name = name }
  speak() { return this.name + ' makes a sound' }
}
class Dog extends Animal {
  speak() { return super.speak() + ': woof' }
}`,
      },
      followUp: ['What does typeof a class return?', 'Are class methods bound to the instance?'],
    },
    {
      id: 'js-33',
      question: 'What is the difference between setTimeout, setInterval and requestAnimationFrame?',
      short:
        'setTimeout runs a callback once after a delay, setInterval keeps running it repeatedly. The delay is a minimum, not a guarantee, since it waits for the call stack. requestAnimationFrame runs right before the next repaint, around 60 times a second, so I use it for animations because it is smooth and pauses in background tabs.',
      simple:
        'setTimeout: once later. setInterval: again and again. requestAnimationFrame: just before the screen redraws, best for animation.',
      example: {
        lang: 'js',
        code: `const id = setInterval(tick, 1000)
clearInterval(id)

function frame() {
  update()
  requestAnimationFrame(frame)
}
requestAnimationFrame(frame)`,
      },
      followUp: ['Why is setTimeout 0 not instant?'],
    },
    {
      id: 'js-34',
      question: 'What is the difference between forEach, for...of and for...in?',
      short:
        'forEach is an array method that cannot be stopped with break and does not wait for await inside it. for...of loops over values of any iterable, like arrays, strings, Maps, and works with break and await. for...in loops over enumerable property keys of an object, including inherited ones, so I avoid it on arrays and use Object.keys or entries instead.',
      simple:
        'for...of gives values. for...in gives keys. forEach is just a method with a callback and no break.',
      example: {
        lang: 'js',
        code: `for (const v of [10, 20]) {}      // 10, 20
for (const k in { a: 1, b: 2 }) {}  // 'a', 'b'
for (const [k, v] of Object.entries(obj)) {}`,
      },
      followUp: ['Why does await not work properly inside forEach?'],
    },
    {
      id: 'js-35',
      question: 'What is the difference between a function declaration and a function expression?',
      short:
        'A declaration is function foo() {} and it is hoisted completely, so I can call it before it appears in the file. An expression assigns a function to a variable, like const foo = function() {}, and it follows the hoisting rules of the variable, so calling it early fails. I mostly use arrow function expressions assigned to const.',
      simple:
        'Declarations are available everywhere in their scope from the start. Expressions exist only after the line runs.',
      example: {
        lang: 'js',
        code: `sayHi()        // works
function sayHi() {}

sayBye()       // TypeError / ReferenceError
const sayBye = () => {}`,
      },
      followUp: ['What is an IIFE and why was it used?'],
    },
    {
      id: 'js-36',
      question: 'What is the difference between fetch and XMLHttpRequest, and how do you cancel a fetch?',
      short:
        'fetch is the modern promise-based API and is cleaner than XHR with its callbacks. One gotcha is that fetch only rejects on network errors, so a 404 or 500 still resolves, and I have to check res.ok myself. To cancel a request I use an AbortController and pass its signal, which I do in React effects to avoid stale responses.',
      simple:
        'fetch uses promises and is easier. It does not throw on HTTP errors, so you check res.ok. To cancel, use AbortController.',
      example: {
        lang: 'js',
        code: `const ctrl = new AbortController()
fetch('/api/data', { signal: ctrl.signal })
  .then(res => {
    if (!res.ok) throw new Error(res.status)
    return res.json()
  })
  .catch(e => e.name !== 'AbortError' && console.error(e))
ctrl.abort()`,
      },
      followUp: ['How would you add retries?', 'What is CORS and when does a preflight happen?'],
    },
    {
      id: 'js-37',
      question: `What is REST and what are its main principles?`,
      short: `REST is a way of designing APIs around resources, like users or orders, each with its own URL. You use standard HTTP methods on them: GET to read, POST to create, PUT or PATCH to update, DELETE to remove. The server is stateless, so every request carries everything needed to handle it, like the auth token. Responses are usually JSON, and they can be cached when it makes sense. I think of it as nouns in the URL and verbs in the HTTP method.`,
      simple: `You treat things like users and posts as resources with URLs, and use normal HTTP actions on them. The server does not remember you between requests.`,
      example: { text: `GET /users/42\nPOST /users\nDELETE /users/42/posts/7` },
      followUp: [`What does stateless mean in practice?`, `Is every JSON API over HTTP really RESTful?`],
    },
    {
      id: 'js-38',
      question: `What are the main HTTP methods and what is each used for?`,
      short: `GET reads data and should never change anything. POST creates something new or triggers an action. PUT replaces a whole resource, PATCH changes only some fields, and DELETE removes it. There are also HEAD, which is GET without the body, and OPTIONS, which the browser uses for CORS preflight. In my frontend code I mostly use GET, POST, PATCH and DELETE.`,
      simple: `GET is read, POST is create, PUT is replace, PATCH is partial update, DELETE is remove.`,
      followUp: [`Can a GET request have a body?`, `Why is it bad to change data with GET?`],
    },
    {
      id: 'js-39',
      question: `Which HTTP status codes do you use and what do they mean?`,
      short: `I group them by the first digit. 2xx is success: 200 OK, 201 Created, 204 No Content. 3xx is redirects, like 301 and 304 Not Modified. 4xx means the client did something wrong: 400 bad request, 401 not authenticated, 403 not allowed, 404 not found, 409 conflict, 422 validation failed, 429 too many requests. 5xx means the server broke, like 500 or 503. On the frontend I branch on these, for example 401 sends the user to login and 422 shows field errors.`,
      simple: `2xx worked, 3xx go somewhere else, 4xx you made a mistake, 5xx the server made a mistake.`,
      followUp: [`What is the difference between 401 and 403?`, `When would you return 204?`],
    },
    {
      id: 'js-40',
      question: `What is CORS and how do you fix a CORS error?`,
      short: `CORS is a browser rule. By default a page on one origin can't read responses from another origin, where origin means protocol, domain and port. The server has to opt in by sending Access-Control-Allow-Origin and related headers. For non-simple requests, like JSON POST with an Authorization header, the browser first sends an OPTIONS preflight. The fix is always on the server: allow my origin, methods and headers. In dev I can use a proxy so the browser thinks it is same origin. Disabling it from the frontend isn't possible.`,
      simple: `The browser blocks your site from reading another site's API unless that API says it is okay. The API owner has to allow it.`,
      followUp: [`What is a preflight request?`, `Why do cookies need Access-Control-Allow-Credentials?`, `Does CORS protect the server?`],
    },
    {
      id: 'js-41',
      question: `How do you handle API errors on the frontend?`,
      short: `First, fetch does not throw on 404 or 500, so I check response.ok myself and throw an error with the status and server message. Then I handle by type: 401 triggers logout or a token refresh, 422 maps errors onto form fields, 5xx shows a generic retry message, and a network failure shows an offline message. I keep this in one API wrapper so components don't repeat it. I also use an error boundary for rendering failures and log unexpected errors to something like Sentry.`,
      simple: `Check if the response is ok, read the error message, and show the user something useful depending on the status code. Do it in one central place.`,
      example: {
        code: `async function api(url, opts) {
  const res = await fetch(url, opts)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw Object.assign(new Error(body.message || 'Request failed'), { status: res.status })
  }
  return res.json()
}`,
        lang: 'js',
      },
      followUp: [`Why does fetch not reject on a 500?`, `How do you show validation errors from the server?`],
    },
    {
      id: 'js-42',
      question: `fetch vs axios, which do you use?`,
      short: `fetch is built into the browser, so no extra bundle size. But you have to call response.json() yourself, check response.ok manually, and there is no built-in timeout or interceptors. axios gives you automatic JSON parsing, throws on non-2xx, interceptors for attaching tokens, and easy timeouts. For small projects I use fetch with a small wrapper. For bigger apps with token refresh logic, axios interceptors save time. These days I often pair either with React Query anyway.`,
      simple: `fetch is built in but bare bones. axios is a library with extra conveniences like interceptors and automatic error throwing.`,
      followUp: [`How would you add an auth header to every request with fetch?`],
    },
  ],
}
