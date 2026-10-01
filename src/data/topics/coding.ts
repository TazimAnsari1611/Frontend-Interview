import type { Topic } from '../types'

export const coding: Topic = {
  id: 'coding',
  title: 'Coding',
  blurb: 'Common frontend coding-round tasks with small working solutions and the complexity follow-ups.',
  questions: [
    {
      id: 'code-1',
      question: 'Reverse a string.',
      short: `The quickest way is split into characters, reverse the array, and join back. That is O(n) time. If they want it without built-ins, I loop from the end and build a new string. I would mention that split('') breaks emojis, so for unicode I can use the spread operator, which splits by code point.`,
      simple: `Turn the string into a list of letters, flip the list, and glue it back together.`,
      example: {
        lang: 'js',
        code: `function reverse(str) {
  return [...str].reverse().join('')
}

// manual version
function reverseLoop(str) {
  let out = ''
  for (let i = str.length - 1; i >= 0; i--) out += str[i]
  return out
}

reverse('hello') // 'olleh'`,
      },
      followUp: ['What is the time and space complexity?', 'What goes wrong with emojis?'],
    },
    {
      id: 'code-2',
      question: 'Check if a string is a palindrome.',
      short: `I clean the string first, lowercase it and remove anything that is not a letter or number. Then I use two pointers, one at the start and one at the end, moving inward and comparing. If any pair differs, it is not a palindrome. This is O(n) time and O(1) extra space, apart from the cleaning step.`,
      simple: `Compare the first and last letters, then the second and second last, and so on. If all match, it is a palindrome.`,
      example: {
        lang: 'js',
        code: `function isPalindrome(str) {
  const s = str.toLowerCase().replace(/[^a-z0-9]/g, '')
  let l = 0
  let r = s.length - 1
  while (l < r) {
    if (s[l] !== s[r]) return false
    l++
    r--
  }
  return true
}

isPalindrome('A man, a plan, a canal: Panama') // true`,
      },
      followUp: ['How would you avoid creating the cleaned copy?', 'What about an empty string?'],
    },
    {
      id: 'code-3',
      question: 'Write FizzBuzz.',
      short: `Loop from 1 to n. If the number is divisible by 15, print FizzBuzz. Else if divisible by 3, Fizz. Else if by 5, Buzz. Otherwise the number. The key is checking the 15 case first, or building the string from both parts so I do not miss it.`,
      simple: `Count up. Say Fizz for multiples of 3, Buzz for multiples of 5, and both for multiples of both.`,
      example: {
        lang: 'js',
        code: `function fizzBuzz(n) {
  const out = []
  for (let i = 1; i <= n; i++) {
    let s = ''
    if (i % 3 === 0) s += 'Fizz'
    if (i % 5 === 0) s += 'Buzz'
    out.push(s || i)
  }
  return out
}

fizzBuzz(15) // [1,2,'Fizz',4,'Buzz',...,'FizzBuzz']`,
      },
      followUp: ['How would you make the rules configurable?'],
    },
    {
      id: 'code-4',
      question: 'Flatten a nested array.',
      short: `Easiest is arr.flat(Infinity). If I have to write it myself, I use recursion: loop over items, and if an item is an array, flatten it and spread the result, otherwise push it. An iterative version with a stack avoids deep recursion limits. Time is O(n) over all elements.`,
      simple: `Go through each item. If it is a list, open it up and keep going. If not, keep it.`,
      example: {
        lang: 'js',
        code: `function flatten(arr) {
  const out = []
  for (const item of arr) {
    if (Array.isArray(item)) out.push(...flatten(item))
    else out.push(item)
  }
  return out
}

flatten([1, [2, [3, [4]], 5]]) // [1,2,3,4,5]`,
      },
      followUp: ['How would you flatten only to a given depth?', 'How do you avoid stack overflow on very deep arrays?'],
    },
    {
      id: 'code-5',
      question: 'Remove duplicates from an array.',
      short: `For primitives, I put the array in a Set and spread it back, which is O(n) and keeps the first-seen order. If the items are objects, I pick a key, like id, and use a Set or Map of seen keys while filtering. I avoid indexOf inside filter because that is O(n squared).`,
      simple: `A Set only keeps one copy of each value, so I put everything in a Set and turn it back to an array.`,
      example: {
        lang: 'js',
        code: `const unique = arr => [...new Set(arr)]

function uniqueBy(arr, key) {
  const seen = new Set()
  return arr.filter(item => {
    const k = item[key]
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

unique([1, 2, 2, 3, 1]) // [1,2,3]`,
      },
      followUp: ['Does Set treat NaN as equal to NaN?', 'What is the complexity of the filter plus indexOf approach?'],
    },
    {
      id: 'code-6',
      question: 'Implement debounce.',
      short: `Debounce returns a new function that delays calling the original until no new calls came in for a given delay. I keep a timer in a closure. Each call clears the previous timer and sets a new one. I use a normal function, not an arrow, for the wrapper so I can keep this, and pass the args through. Often they ask me to add a cancel method too.`,
      simple: `Every time the function is called, restart a countdown. Only when the countdown finishes does the real function run.`,
      example: {
        lang: 'js',
        code: `function debounce(fn, delay) {
  let timer
  function debounced(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
  debounced.cancel = () => clearTimeout(timer)
  return debounced
}

const onSearch = debounce(q => console.log(q), 300)`,
      },
      followUp: ['How would you add a leading edge option?', 'Where would you use it in React?'],
    },
    {
      id: 'code-7',
      question: 'Implement throttle.',
      short: `Throttle makes sure the function runs at most once in every interval. I store the time of the last run. When called, if enough time passed, I run it and update the time. Otherwise I skip it. A better version also schedules a trailing call so the last event is not lost, but the simple version is usually enough to explain.`,
      simple: `Let the function run, then ignore calls until some time has passed.`,
      example: {
        lang: 'js',
        code: `function throttle(fn, limit) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= limit) {
      last = now
      fn.apply(this, args)
    }
  }
}

window.addEventListener('scroll', throttle(() => console.log('scroll'), 200))`,
      },
      followUp: ['How would you add a trailing call?', 'Debounce or throttle for a resize handler?'],
    },
    {
      id: 'code-8',
      question: 'Write a deep clone function.',
      short: `structuredClone is the modern answer and handles dates, maps, sets and circular references. If I need to write it, I do recursion. Primitives return as is. Arrays and objects get copied key by key. I handle Date and I use a WeakMap to remember what I already cloned, so circular references do not loop forever. I would mention JSON.parse(JSON.stringify()) loses functions, undefined, dates and breaks on cycles.`,
      simple: `Make a brand new copy of every nested object, not just the top level, so changing the copy never changes the original.`,
      example: {
        lang: 'js',
        code: `function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value
  if (value instanceof Date) return new Date(value)
  if (seen.has(value)) return seen.get(value)
  const copy = Array.isArray(value) ? [] : {}
  seen.set(value, copy)
  for (const key of Object.keys(value)) {
    copy[key] = deepClone(value[key], seen)
  }
  return copy
}

const a = { x: 1, y: { z: [1, 2] } }
const b = deepClone(a)
b.y.z.push(3) // a.y.z is still [1,2]`,
      },
      followUp: ['What does structuredClone not support?', 'Why do we need the WeakMap?'],
    },
    {
      id: 'code-9',
      question: 'Write a polyfill for Promise.all.',
      short: `Promise.all takes an iterable and returns one promise. It resolves with an array of results in the original order, or rejects as soon as one rejects. I create a new Promise, keep a results array and a counter. For each item I wrap it with Promise.resolve, since it could be a plain value, and on success store the result at its index and increase the counter. When the counter equals the length, I resolve. An empty input resolves right away with an empty array.`,
      simple: `Start everything together, collect answers in the right slots, and finish when all are done. If one fails, fail immediately.`,
      example: {
        lang: 'js',
        code: `function promiseAll(items) {
  return new Promise((resolve, reject) => {
    const list = Array.from(items)
    const results = new Array(list.length)
    let done = 0
    if (list.length === 0) return resolve(results)
    list.forEach((item, i) => {
      Promise.resolve(item).then(value => {
        results[i] = value
        done++
        if (done === list.length) resolve(results)
      }, reject)
    })
  })
}

promiseAll([1, Promise.resolve(2)]).then(console.log) // [1, 2]`,
      },
      followUp: ['How does Promise.allSettled differ?', 'Why store by index and not push?'],
    },
    {
      id: 'code-10',
      question: 'Write a polyfill for Function.prototype.bind.',
      short: `bind returns a new function with this fixed, and optionally some arguments preset. I add a method on Function.prototype that saves the original function, the context and the preset args. It returns a function that calls the original with apply, passing the saved context and the preset args plus any new ones. A full version also handles being called with new, but I would mention that and keep the basic version.`,
      simple: `Make a new function that always runs the old function with the this value I chose.`,
      example: {
        lang: 'js',
        code: `Function.prototype.myBind = function (context, ...preset) {
  const fn = this
  return function (...args) {
    return fn.apply(context, [...preset, ...args])
  }
}

function greet(greeting, punct) {
  return greeting + ', ' + this.name + punct
}
const hi = greet.myBind({ name: 'Sam' }, 'Hi')
hi('!') // 'Hi, Sam!'`,
      },
      followUp: ['How would you support the new operator?', 'What is the difference between call, apply and bind?'],
    },
    {
      id: 'code-11',
      question: 'Implement curry.',
      short: `Currying turns f(a, b, c) into f(a)(b)(c). My approach uses the function's length, which is how many parameters it expects. I return a function that collects arguments. If I have collected enough, I call the original. If not, I return another function that keeps collecting. It also should allow f(a, b)(c), so each step accepts any number of args.`,
      simple: `Keep returning a function that waits for more arguments until we have all that the original needs, then run it.`,
      example: {
        lang: 'js',
        code: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args)
    return (...more) => curried.apply(this, [...args, ...more])
  }
}

const add = curry((a, b, c) => a + b + c)
add(1)(2)(3) // 6
add(1, 2)(3) // 6`,
      },
      followUp: ['What breaks with default or rest parameters?', 'Where is currying useful in real code?'],
    },
    {
      id: 'code-12',
      question: 'Implement memoize.',
      short: `Memoize wraps a function and caches results by arguments. I make a Map in a closure. On each call I build a key from the arguments, if the key is in the cache I return it, otherwise I call the function and store the result. JSON.stringify works as a simple key for primitives. I would mention that for object arguments a WeakMap is safer, and that this only suits pure functions.`,
      simple: `Remember the answer for each input. If asked again with the same input, return the saved answer.`,
      example: {
        lang: 'js',
        code: `function memoize(fn) {
  const cache = new Map()
  return function (...args) {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

const slowSquare = memoize(n => n * n)
slowSquare(4) // computed
slowSquare(4) // from cache`,
      },
      followUp: ['What are the problems with JSON.stringify as a key?', 'How would you limit the cache size?'],
    },
    {
      id: 'code-13',
      question: 'Build an event emitter.',
      short: `I keep an object that maps event names to arrays of handlers. on adds a handler, off removes it, emit calls every handler for that event with the arguments. I add once as well, which wraps the handler so it removes itself after the first call. on returns an unsubscribe function, which is handy in React. This is the pub-sub pattern.`,
      simple: `Keep a list of listeners for each event name. When the event fires, call everyone on the list.`,
      example: {
        lang: 'js',
        code: `class Emitter {
  constructor() {
    this.events = {}
  }
  on(name, fn) {
    (this.events[name] ||= []).push(fn)
    return () => this.off(name, fn)
  }
  off(name, fn) {
    this.events[name] = (this.events[name] || []).filter(f => f !== fn)
  }
  once(name, fn) {
    const wrapper = (...args) => {
      this.off(name, wrapper)
      fn(...args)
    }
    this.on(name, wrapper)
  }
  emit(name, ...args) {
    ;[...(this.events[name] || [])].forEach(fn => fn(...args))
  }
}

const e = new Emitter()
e.on('hi', n => console.log('hi', n))
e.emit('hi', 'Sam')`,
      },
      followUp: ['Why copy the array in emit?', 'How can this cause memory leaks?'],
    },
    {
      id: 'code-14',
      question: 'Group an array of objects by a key (groupBy).',
      short: `I use reduce with an object as the accumulator. For each item I compute the group key, create the array if it does not exist, and push the item. It is a single pass, O(n). Newer environments have Object.groupBy, but I would still know how to write it. I would use a Map if keys are not strings.`,
      simple: `Make buckets. Put each item into the bucket that matches its key.`,
      example: {
        lang: 'js',
        code: `function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const key = typeof keyFn === 'function' ? keyFn(item) : item[keyFn]
    ;(acc[key] ||= []).push(item)
    return acc
  }, {})
}

groupBy([{ t: 'a', n: 1 }, { t: 'b', n: 2 }, { t: 'a', n: 3 }], 't')
// { a: [{...}, {...}], b: [{...}] }`,
      },
      followUp: ['How would you do it with Map?', 'How would you count items per group instead?'],
    },
    {
      id: 'code-15',
      question: 'Two sum: find two numbers that add up to a target.',
      short: `The brute force checks every pair, which is O(n squared). Better, I go through the array once and keep a Map of value to index. For each number I compute the needed complement, target minus number. If the Map already has the complement, I return both indexes. Otherwise I store the current number. That is O(n) time and O(n) space.`,
      simple: `For each number, ask whether the number that completes the sum was already seen. A Map makes that lookup instant.`,
      example: {
        lang: 'js',
        code: `function twoSum(nums, target) {
  const seen = new Map()
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i]
    if (seen.has(need)) return [seen.get(need), i]
    seen.set(nums[i], i)
  }
  return []
}

twoSum([2, 7, 11, 15], 9) // [0, 1]`,
      },
      followUp: ['What if the array is sorted?', 'How do you handle duplicates like [3, 3] with target 6?'],
    },
    {
      id: 'code-16',
      question: 'Check if two strings are anagrams.',
      short: `Two strings are anagrams if they have the same letters with the same counts. First I clean them and compare lengths. Then I count letters of the first string in a Map, and subtract while walking the second. If a count goes below zero, or a letter is missing, it is not an anagram. That is O(n). The shorter way is sorting both and comparing, which is O(n log n).`,
      simple: `Count each letter in both words. If the counts match, they are anagrams.`,
      example: {
        lang: 'js',
        code: `function isAnagram(a, b) {
  const clean = s => s.toLowerCase().replace(/[^a-z0-9]/g, '')
  a = clean(a)
  b = clean(b)
  if (a.length !== b.length) return false
  const count = {}
  for (const ch of a) count[ch] = (count[ch] || 0) + 1
  for (const ch of b) {
    if (!count[ch]) return false
    count[ch]--
  }
  return true
}

isAnagram('listen', 'silent') // true`,
      },
      followUp: ['Compare the sorting approach and the counting approach.', 'How would you group a list of words into anagram groups?'],
    },
    {
      id: 'code-17',
      question: 'Count the frequency of each character in a string.',
      short: `I loop through the string once and use an object or a Map as a counter. For each character I add one to its count, starting at zero if missing. That is O(n) time and O(k) space where k is the number of distinct characters. I would use a Map if I want to keep the insertion order for sure or handle any type of key.`,
      simple: `Keep a tally. Each time you see a letter, add one to its count.`,
      example: {
        lang: 'js',
        code: `function charCount(str) {
  const counts = {}
  for (const ch of str) {
    counts[ch] = (counts[ch] || 0) + 1
  }
  return counts
}

charCount('hello') // { h: 1, e: 1, l: 2, o: 1 }`,
      },
      followUp: ['How do you find the most frequent character?', 'Should it be case sensitive?'],
    },
    {
      id: 'code-18',
      question: 'Chunk an array into pieces of a given size.',
      short: `I loop with a step equal to the size, and at each step I slice from i to i plus size and push that piece. slice handles the last smaller chunk safely. It is O(n). I would guard against a size of zero or less, since that would loop forever.`,
      simple: `Cut the list into groups of the same size. The last group can be smaller.`,
      example: {
        lang: 'js',
        code: `function chunk(arr, size) {
  if (size < 1) throw new Error('size must be at least 1')
  const out = []
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size))
  }
  return out
}

chunk([1, 2, 3, 4, 5], 2) // [[1,2],[3,4],[5]]`,
      },
      followUp: ['What if size is 0?', 'How would you do it with reduce?'],
    },
    {
      id: 'code-19',
      question: 'Implement binary search.',
      short: `Binary search works on a sorted array. I keep a low and high index, look at the middle, and compare it to the target. If equal, I return the index. If the middle is smaller than the target, I search the right half, otherwise the left. I stop when low passes high and return -1. It is O(log n) time. I compute the middle as low plus floor of half the gap, to avoid overflow in other languages.`,
      simple: `Look at the middle. If the target is bigger, throw away the left half. If smaller, throw away the right half. Repeat.`,
      example: {
        lang: 'js',
        code: `function binarySearch(arr, target) {
  let low = 0
  let high = arr.length - 1
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2)
    if (arr[mid] === target) return mid
    if (arr[mid] < target) low = mid + 1
    else high = mid - 1
  }
  return -1
}

binarySearch([1, 3, 5, 7, 9], 7) // 3`,
      },
      followUp: ['Write the recursive version.', 'What if the array has duplicates and I want the first match?'],
    },
    {
      id: 'code-20',
      question: 'Write a useDebounce hook.',
      short: `useDebounce takes a value and a delay and returns the debounced value. I keep a state for the debounced value. In a useEffect that depends on value and delay, I set a timeout to update the state after the delay. The cleanup function clears the timeout, so if the value changes again before the delay, the old timer is cancelled. Then in a component I use the debounced value to trigger a search.`,
      simple: `Return the value only after it stopped changing for a moment.`,
      example: {
        lang: 'tsx',
        code: `import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}

// usage
// const q = useDebounce(input, 400)
// useEffect(() => { search(q) }, [q])`,
      },
      followUp: ['Why does the cleanup matter?', 'How is this different from a debounced callback?'],
    },
    {
      id: 'code-21',
      question: 'Write a useFetch hook.',
      short: `The hook takes a url and returns data, loading and error. I use useEffect keyed on the url. Inside, I create an AbortController, start the fetch with its signal, and check res.ok because fetch does not throw on 404 or 500. I set data or error accordingly. In the cleanup I abort the request, so a stale response never overwrites newer state and there is no update after unmount. I ignore AbortError.`,
      simple: `A reusable function that loads data from a URL and tells me if it is loading, done, or failed.`,
      example: {
        lang: 'tsx',
        code: `import { useEffect, useState } from 'react'

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('Request failed: ' + res.status)
        return res.json()
      })
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(err)
        setLoading(false)
      })
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}`,
      },
      followUp: ['What race condition does the abort prevent?', 'Why would you use React Query instead?'],
    },
    {
      id: 'code-22',
      question: 'Build a counter component.',
      short: `A counter needs one piece of state, the count. I use useState and three buttons: increment, decrement and reset. I use the functional form of the setter, setCount(c => c + 1), so updates are always based on the latest value. If they ask for extras, I add a min and max, or a step input.`,
      simple: `Store a number. Buttons change the number and the screen updates.`,
      example: {
        lang: 'tsx',
        code: `import { useState } from 'react'

export function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = useState(initial)
  return (
    <div>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(initial)}>Reset</button>
    </div>
  )
}`,
      },
      followUp: ['Why use the functional setter?', 'How would you add min and max limits?'],
    },
    {
      id: 'code-23',
      question: 'Build a todo list (add, toggle, delete).',
      short: `State is an array of todos, each with id, text and done, plus an input string. Add creates a new item and returns a new array, never mutating. Toggle maps over the array and flips done for the matching id. Delete filters it out. I use stable ids, not the index, as the key. I ignore empty input and trim the text. For extras I would add filters and localStorage.`,
      simple: `Keep a list. Add pushes a new item, toggle flips one item, delete removes one. Always make a new list instead of changing the old one.`,
      example: {
        lang: 'tsx',
        code: `import { useState } from 'react'

type Todo = { id: number; text: string; done: boolean }

export function Todos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('')

  const add = () => {
    const t = text.trim()
    if (!t) return
    setTodos(list => [...list, { id: Date.now(), text: t, done: false }])
    setText('')
  }
  const toggle = (id: number) =>
    setTodos(list => list.map(x => (x.id === id ? { ...x, done: !x.done } : x)))
  const remove = (id: number) => setTodos(list => list.filter(x => x.id !== id))

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} />
      <button onClick={add}>Add</button>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
            <button onClick={() => remove(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}`,
      },
      followUp: ['Why not use the index as the key?', 'How would you persist the todos?'],
    },
    {
      id: 'code-24',
      question: 'Build an accordion component.',
      short: `I keep the index of the open item in state, or null when everything is closed. Clicking a header sets it to that index, or to null if it is already open. That gives single-open behavior. For allowing multiple open, I would use a Set of open ids instead. For accessibility, headers are real buttons with aria-expanded and aria-controls, and the panel is hidden when closed.`,
      simple: `Remember which section is open. Click a title to open it, click again to close it.`,
      example: {
        lang: 'tsx',
        code: `import { useState } from 'react'

type Item = { title: string; content: string }

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      {items.map((item, i) => (
        <div key={i}>
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            {item.title}
          </button>
          {open === i && <p>{item.content}</p>}
        </div>
      ))}
    </div>
  )
}`,
      },
      followUp: ['How do you allow multiple open sections?', 'How would you animate the height?'],
    },
    {
      id: 'code-25',
      question: 'Build a modal component.',
      short: `The modal takes open, onClose and children. If not open, it returns null. I render it through a portal into document.body so z-index and overflow of parents do not affect it. It closes on the Escape key and when clicking the backdrop, but a click inside the box should not close it, so I stop propagation. For accessibility I add role dialog and aria-modal, move focus into it, and return focus on close. I also remove the keydown listener in the effect cleanup.`,
      simple: `A box that floats over the page. It closes with Escape or by clicking outside, and it should be reachable with a keyboard.`,
      example: {
        lang: 'tsx',
        code: `import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type Props = { open: boolean; onClose: () => void; children: ReactNode }

export function Modal({ open, onClose, children }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return createPortal(
    <div className="backdrop" onClick={onClose}>
      <div role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  )
}`,
      },
      followUp: ['How do you trap focus inside the modal?', 'Why use a portal?'],
    },
    {
      id: 'code-26',
      question: 'Build a star rating component.',
      short: `I take a max number of stars, default 5, and keep two pieces of state: the selected rating and the hovered value. Each star is a button. A star is filled if its number is less than or equal to the hover value, or the rating when not hovering. Clicking sets the rating. Mouse leave clears the hover. For accessibility the buttons get aria-labels like 3 stars.`,
      simple: `Show five stars. Hovering lights them up to that star, and clicking saves the choice.`,
      example: {
        lang: 'tsx',
        code: `import { useState } from 'react'

export function StarRating({ max = 5, onChange }: { max?: number; onChange?: (n: number) => void }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const active = hover || rating

  return (
    <div onMouseLeave={() => setHover(0)}>
      {Array.from({ length: max }, (_, i) => i + 1).map(n => (
        <button
          key={n}
          aria-label={n + ' stars'}
          onMouseEnter={() => setHover(n)}
          onClick={() => {
            setRating(n)
            onChange?.(n)
          }}
        >
          {n <= active ? '★' : '☆'}
        </button>
      ))}
    </div>
  )
}`,
      },
      followUp: ['How would you support half stars?', 'How would you make it a controlled component?'],
    },
  ],
}
