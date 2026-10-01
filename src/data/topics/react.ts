import type { Topic } from '../types'

export const react: Topic = {
  id: 'react',
  title: 'React',
  blurb: 'Components, hooks, rendering, state management, performance and modern React 18/19 features.',
  questions: [
    {
      id: 'react-1',
      question: 'What is React and why would you use it?',
      short: `React is a JavaScript library I use to build user interfaces with reusable components. It makes it easier to break a large UI into smaller pieces and keep the screen in sync with the data. I describe what the UI should look like for a given state, and React figures out what to update in the DOM. The big ecosystem and community are also a plus.`,
      simple: `React lets you build a page out of small reusable blocks. You change the data, and React updates the screen for you.`,
      followUp: ['How is React different from a framework like Angular?', 'What problems did React solve compared to jQuery-style code?'],
    },
    {
      id: 'react-2',
      question: 'What is the virtual DOM and how does reconciliation work?',
      short: `The virtual DOM is a lightweight JavaScript copy of the UI, basically a tree of objects. When state changes, React builds a new tree and compares it with the previous one. That comparison is called reconciliation. React then applies only the real differences to the browser DOM, so I do not have to hand-write DOM updates. It uses a few heuristics, like comparing elements of different types as a full replacement, and using keys to match list items.`,
      simple: `React keeps a cheap draft of the page in memory. When something changes, it compares the new draft with the old one and only touches the real page where things differ.`,
      followUp: ['Is the virtual DOM always faster than direct DOM updates?', 'What is React Fiber?'],
    },
    {
      id: 'react-3',
      question: 'Why do we need keys in lists, and why is using the index a problem?',
      short: `Keys help React identify which item in a list is which between renders. With stable keys, React can reorder, add or remove items without recreating everything. If I use the array index as a key and the list can be reordered or filtered, React matches the wrong items, so state inside inputs or child components can jump to the wrong row. I use a stable unique id from the data instead. Index is fine only for static lists that never change.`,
      simple: `A key is a name tag for each list item. If the tags change when the order changes, React gets confused about who is who.`,
      example: {
        lang: 'tsx',
        code: `{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
))}`,
      },
      followUp: ['What happens if two siblings have the same key?', 'Can you use keys outside lists?'],
    },
    {
      id: 'react-4',
      question: 'What is the difference between props and state?',
      short: `Props are the inputs a component receives from its parent, and the component should treat them as read-only. State is data the component owns and can change over time, and changing it triggers a re-render. So props flow down from parent to child, while state lives inside a component. If a child needs to change something, the parent passes down a callback as a prop.`,
      simple: `Props are things handed to you from outside, and you cannot change them. State is your own memory, and you can update it.`,
      followUp: ['Can a child modify props?', 'What is one-way data flow?'],
    },
    {
      id: 'react-5',
      question: 'What are controlled and uncontrolled components?',
      short: `In a controlled component, React state is the source of truth for the input value. I set value from state and update it in onChange, so I can validate or format on every keystroke. In an uncontrolled one, the DOM keeps the value and I read it when needed, usually with a ref or from FormData on submit. I default to controlled for most forms, but uncontrolled is simpler and faster for big forms or file inputs.`,
      simple: `Controlled means React holds the input's value. Uncontrolled means the browser holds it and you just ask for it when you need it.`,
      example: {
        lang: 'tsx',
        code: `const [name, setName] = useState('')
<input value={name} onChange={e => setName(e.target.value)} />

// uncontrolled
const ref = useRef<HTMLInputElement>(null)
<input defaultValue="Tazim" ref={ref} />`,
      },
      followUp: ['Why does React warn when you switch from uncontrolled to controlled?', 'How do you handle file inputs?'],
    },
    {
      id: 'react-6',
      question: 'How does useState work, and what is state batching?',
      short: `useState gives me a value and a setter. Calling the setter schedules a re-render with the new value. State updates are asynchronous from my point of view, so reading the variable right after setting it still gives the old value. Since React 18, updates are batched automatically, even inside promises, timeouts and event handlers, so several setState calls in one tick cause only one render. When the new value depends on the old one, I pass a function, like setCount(c => c + 1).`,
      simple: `useState stores a value. When you set it, React re-renders later, not instantly. It also groups several updates into one render to save work.`,
      example: {
        lang: 'tsx',
        code: `setCount(count + 1)
setCount(count + 1) // still +1 total

setCount(c => c + 1)
setCount(c => c + 1) // +2 total`,
      },
      followUp: ['What is lazy initial state?', 'How would you force a synchronous update?'],
    },
    {
      id: 'react-7',
      question: 'How does useEffect work, and what are the dependency array and cleanup for?',
      short: `useEffect runs code after the component renders, which I use for side effects like fetching, subscriptions, timers or touching the DOM. The dependency array tells React when to re-run it: empty array means once after mount, values in the array mean whenever those change, and no array means after every render. The function I return is the cleanup. It runs before the next effect and on unmount, so I use it to remove listeners, clear timers or abort requests. Missing deps are a common source of stale-value bugs.`,
      simple: `useEffect runs your code after the screen updates. The array says when to run it again, and the returned function cleans up after the old run.`,
      example: {
        lang: 'tsx',
        code: `useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)
}, [tick])`,
      },
      followUp: ['What causes an infinite loop in useEffect?', 'When should you not use useEffect?'],
    },
    {
      id: 'react-8',
      question: 'What is useRef used for?',
      short: `useRef gives me a mutable object whose .current value survives re-renders, and changing it does not trigger a re-render. I use it mainly for two things: getting a reference to a DOM element, like focusing an input, and storing values that I need to keep between renders but that should not affect the UI, like a timer id or the previous value.`,
      simple: `A ref is a box that keeps a value between renders. Changing what's in the box does not redraw the screen.`,
      example: {
        lang: 'tsx',
        code: `const inputRef = useRef<HTMLInputElement>(null)
useEffect(() => { inputRef.current?.focus() }, [])
return <input ref={inputRef} />`,
      },
      followUp: ['Difference between useRef and useState?', 'What is forwardRef?'],
    },
    {
      id: 'react-9',
      question: 'What does useMemo do and when should you use it?',
      short: `useMemo caches the result of a calculation between renders, and only recalculates when its dependencies change. I use it when the calculation is genuinely expensive, like filtering and sorting a big list, or when I need a stable object or array reference to pass to a memoized child or a hook dependency. I do not wrap everything in it, because memoization has its own cost and makes code harder to read. I measure first.`,
      simple: `useMemo remembers the result of a heavy calculation so React does not redo it every render unless the inputs change.`,
      example: {
        lang: 'tsx',
        code: `const visible = useMemo(
  () => items.filter(i => i.name.includes(query)),
  [items, query]
)`,
      },
      followUp: ['Is useMemo a guarantee the value is cached?', 'What is the React Compiler and how does it relate?'],
    },
    {
      id: 'react-10',
      question: 'What does useCallback do and how is it different from useMemo?',
      short: `useCallback returns the same function reference between renders unless its dependencies change. useMemo caches a value, useCallback caches a function; useCallback(fn, deps) is basically useMemo(() => fn, deps). It is useful when I pass a callback to a child wrapped in React.memo, or when the function is a dependency of useEffect. Without memo on the child, useCallback usually gives no benefit.`,
      simple: `Every render creates a new copy of your functions. useCallback keeps the same copy so children and effects do not think it changed.`,
      followUp: ['Why is useCallback useless without React.memo?', 'How do stale closures relate to it?'],
    },
    {
      id: 'react-11',
      question: 'What is React.memo and when does it help?',
      short: `React.memo wraps a component so it skips re-rendering if its props are shallowly equal to the last render. It helps when a component is expensive to render and its parent re-renders often with the same props. It only works if the props are stable, so passing a new object, array or inline function each time defeats it. That is where useMemo and useCallback come in. I use it after profiling, not by default.`,
      simple: `React.memo says: if the props are the same as last time, do not redraw this component.`,
      followUp: ['What is shallow comparison?', 'Can you give a custom comparison function?'],
    },
    {
      id: 'react-12',
      question: 'How does useContext work?',
      short: `Context lets me share a value with a whole subtree without passing props through every level. I create a context, wrap part of the tree in a Provider with a value, and any component below can read it with useContext. The catch is that every consumer re-renders when the provider value changes, so I keep context for things that change rarely, like theme, auth user or locale, and I memoize the value object.`,
      simple: `Context is like a shared backpack for a part of your app. Any component inside can grab what it needs without it being passed hand to hand.`,
      example: {
        lang: 'tsx',
        code: `const ThemeContext = createContext('light')

<ThemeContext.Provider value="dark">
  <Page />
</ThemeContext.Provider>

const theme = useContext(ThemeContext)`,
      },
      followUp: ['Why can context cause performance problems?', 'How would you split a big context?'],
    },
    {
      id: 'react-13',
      question: 'When would you use useReducer instead of useState?',
      short: `I reach for useReducer when state has several related fields or the next state depends on complex logic. Instead of many setState calls scattered around, I dispatch actions like add_item or toggle, and the reducer function decides the new state in one place. It is easier to test and reason about. For a simple toggle or input value, useState is enough.`,
      simple: `useReducer keeps all the state-changing rules in one function. You just send it a message like "add item" and it works out the new state.`,
      example: {
        lang: 'tsx',
        code: `function reducer(state, action) {
  switch (action.type) {
    case 'inc': return { count: state.count + 1 }
    default: return state
  }
}
const [state, dispatch] = useReducer(reducer, { count: 0 })
dispatch({ type: 'inc' })`,
      },
      followUp: ['Can you combine useReducer with context?', 'Why must a reducer be pure?'],
    },
    {
      id: 'react-14',
      question: 'What are custom hooks and why write them?',
      short: `A custom hook is just a function whose name starts with use and that calls other hooks inside. I write them to reuse stateful logic between components, like useFetch, useDebounce or useLocalStorage, without changing the component hierarchy. Each component that calls the hook gets its own separate state. It keeps components clean because they describe the UI while the hook handles the logic.`,
      simple: `A custom hook is a function that bundles some hook logic so you can reuse it in many components.`,
      example: {
        lang: 'tsx',
        code: `function useDebounce<T>(value: T, delay = 300) {
  const [v, setV] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return v
}`,
      },
      followUp: ['Do two components using the same hook share state?', 'How do you test a custom hook?'],
    },
    {
      id: 'react-15',
      question: 'What are the rules of hooks and why do they exist?',
      short: `There are two rules. Only call hooks at the top level of a component or custom hook, never inside loops, conditions or nested functions. And only call them from React function components or other hooks. React tracks hooks by the order they are called on each render, so if that order changes, state gets matched to the wrong hook. The eslint-plugin-react-hooks catches these mistakes, and I keep it on.`,
      simple: `React remembers hooks by the order they run. If you skip one sometimes, the order breaks and everything gets mixed up.`,
      followUp: ['How do you conditionally run an effect then?', 'What does the exhaustive-deps lint rule do?'],
    },
    {
      id: 'react-16',
      question: 'What does lifting state up mean?',
      short: `When two sibling components need the same data, I move that state up to their closest common parent and pass it down as props, along with callbacks to change it. That gives a single source of truth, so the components cannot get out of sync. If it gets awkward because it goes up too many levels, I consider context or a state library.`,
      simple: `If two components need the same data, keep it in their parent and give it to both.`,
      followUp: ['When is lifting state a bad idea?', 'How is it different from using global state?'],
    },
    {
      id: 'react-17',
      question: 'What is prop drilling and how do you avoid it?',
      short: `Prop drilling is passing props through many layers of components that do not use them, just so a deep child can get them. It makes code noisy and harder to change. I avoid it with composition, like passing the child element as children or a slot prop, with context for truly shared values, or with a state library. I do not jump straight to context, since a small amount of drilling is fine and explicit.`,
      simple: `It's when you hand data down through many components that don't need it, only so the one at the bottom can use it.`,
      followUp: ['How can composition solve prop drilling?', 'What is wrong with putting everything into context?'],
    },
    {
      id: 'react-18',
      question: 'Context API vs Redux vs Zustand: how do you choose?',
      short: `Context is built in and fine for low-frequency values like theme or the current user, but all consumers re-render on change and it has no devtools or middleware. Redux Toolkit gives me a strict, predictable store with devtools, middleware and good patterns, which suits large teams and complex shared state. Zustand is a tiny store with almost no boilerplate, and components subscribe only to the slices they select. For server data I would use React Query or similar instead, and keep client state small. I pick the lightest thing that fits the problem.`,
      simple: `Context is fine for small, rarely changing things. Redux is a heavy but organized toolbox. Zustand is a light, simple store in between.`,
      followUp: ['Why is server state different from client state?', 'What are selectors and why do they matter?'],
    },
    {
      id: 'react-19',
      question: 'How do React.lazy and Suspense work for code splitting?',
      short: `React.lazy takes a function that does a dynamic import and returns a component, so its code is only downloaded when it is first rendered. Suspense wraps it and shows a fallback, like a spinner, while the chunk is loading. I mostly use it at the route level, so users do not download pages they never visit. The component has to be a default export for lazy.`,
      simple: `lazy loads a component only when it is needed, and Suspense shows a loading message while it arrives.`,
      example: {
        lang: 'tsx',
        code: `const Settings = lazy(() => import('./Settings'))

<Suspense fallback={<Spinner />}>
  <Settings />
</Suspense>`,
      },
      followUp: ['What happens if the chunk fails to load?', 'Can Suspense be used for data fetching?'],
    },
    {
      id: 'react-20',
      question: 'What are error boundaries?',
      short: `An error boundary is a component that catches JavaScript errors thrown while rendering its children, logs them and shows a fallback UI instead of crashing the whole app. Today they still have to be class components using componentDidCatch or getDerivedStateFromError, and most people use the react-error-boundary library. They do not catch errors in event handlers, async code or the server, so I handle those with try/catch. I place them around major sections or routes.`,
      simple: `An error boundary is a safety net. If a component breaks, only that part shows an error message and the rest of the app keeps working.`,
      followUp: ['Why can you not catch event handler errors with them?', 'Where would you place them in an app?'],
    },
    {
      id: 'react-21',
      question: 'What are portals and when do you use them?',
      short: `A portal lets a component render its children into a different DOM node outside the parent hierarchy, using createPortal. I use it for modals, tooltips and dropdowns, so they are not clipped by overflow hidden or messed up by z-index and stacking contexts of the parent. React-wise the child still behaves as part of the tree, so context works and events bubble up through the React parent.`,
      simple: `A portal draws a component somewhere else in the page, like at the top level for a modal, but it still belongs to its React parent.`,
      example: {
        lang: 'tsx',
        code: `return createPortal(<Modal />, document.body)`,
      },
      followUp: ['Do events bubble through portals?', 'What accessibility things matter for a modal?'],
    },
    {
      id: 'react-22',
      question: 'What does StrictMode do?',
      short: `StrictMode is a development-only wrapper that helps me find bugs early. It renders components twice to catch impure rendering, and in React 18 it also mounts, unmounts and re-mounts each component once to check that effects clean up properly. That is why an effect can seem to run twice in dev. It does nothing in production, so I do not treat the double run as a bug but as a hint that my cleanup is missing.`,
      simple: `StrictMode is a dev-only checker that runs things twice on purpose to show hidden bugs.`,
      followUp: ['Why does my effect run twice in development?', 'Why must render functions be pure?'],
    },
    {
      id: 'react-23',
      question: 'What causes a component to re-render?',
      short: `A component re-renders when its own state changes, when its parent re-renders, or when a context it consumes changes. Props changing is not the real trigger, since a parent re-render re-renders children even with identical props, unless they are wrapped in React.memo. Knowing this helps me fix slowness: I move state closer to where it is used, split components, or use memo, rather than guessing. Re-rendering is not bad by itself, only when it is slow.`,
      simple: `A component redraws when its state changes, when its parent redraws, or when a context it uses changes.`,
      followUp: ['How do you find unnecessary re-renders?', 'Does a re-render always touch the DOM?'],
    },
    {
      id: 'react-24',
      question: 'Why should you not mutate state directly?',
      short: `React decides whether to re-render by comparing the old and new state with Object.is. If I mutate an object or array in place, the reference stays the same, so React thinks nothing changed and skips the update, or memoized children miss the change. Mutation also breaks things like time travel debugging and makes bugs hard to trace. I create a new copy instead, with spread, map, filter, or Immer when the state is deeply nested.`,
      simple: `If you change the same object in place, React sees the same object and thinks nothing happened. Give it a fresh copy.`,
      example: {
        lang: 'tsx',
        code: `// wrong
user.name = 'Sam'
setUser(user)

// right
setUser({ ...user, name: 'Sam' })`,
      },
      followUp: ['How does Immer help?', 'How do you update an item in an array of objects?'],
    },
    {
      id: 'react-25',
      question: 'How do you handle forms in React?',
      short: `For simple forms I use controlled inputs with useState and handle onSubmit with preventDefault. When forms grow, with lots of fields, validation and error messages, I use React Hook Form, which uses uncontrolled inputs under the hood and avoids re-rendering on every key. I pair it with a schema validator like Zod. I also care about accessibility, so labels, proper input types and visible error messages. React 19 also adds form actions and useActionState.`,
      simple: `Small forms: keep each input in state. Big forms: use a library like React Hook Form so you write less code and it stays fast.`,
      followUp: ['Why is React Hook Form faster?', 'How do you do validation on the client and the server?'],
    },
    {
      id: 'react-26',
      question: 'How do you fetch data in a React component?',
      short: `The basic way is useEffect with fetch, storing data, loading and error in state, and aborting the request in the cleanup so I do not set state after unmount or get race conditions. In real projects I prefer TanStack Query or SWR because they handle caching, retries, deduping, refetching and loading states for me. In frameworks like Next.js, I fetch on the server in a server component instead, so the data arrives with the HTML.`,
      simple: `You can call fetch inside useEffect and save the result in state. A library like React Query does the hard parts for you.`,
      example: {
        lang: 'tsx',
        code: `useEffect(() => {
  const ctrl = new AbortController()
  fetch('/api/users', { signal: ctrl.signal })
    .then(r => r.json())
    .then(setUsers)
    .catch(() => {})
  return () => ctrl.abort()
}, [])`,
      },
      followUp: ['What is a race condition in fetching?', 'Why use React Query instead of useEffect?'],
    },
    {
      id: 'react-27',
      question: 'What are transitions in React 18 (useTransition and useDeferredValue)?',
      short: `Transitions let me mark a state update as not urgent, so React keeps the UI responsive for urgent things like typing. With useTransition, I wrap the slow update in startTransition and get an isPending flag. With useDeferredValue, I get a lagging copy of a value that updates after urgent work finishes. A typical case is a search box that filters a huge list: the input stays snappy while the list updates a moment later.`,
      simple: `You tell React which updates can wait, so typing and clicking stay smooth while heavy updates happen in the background.`,
      example: {
        lang: 'tsx',
        code: `const [isPending, startTransition] = useTransition()
onChange={e => {
  setText(e.target.value)            // urgent
  startTransition(() => setQuery(e.target.value)) // can wait
}}`,
      },
      followUp: ['What is concurrent rendering?', 'Difference between debounce and useDeferredValue?'],
    },
    {
      id: 'react-28',
      question: 'What is the use() hook in React 19?',
      short: `use is a React 19 API that reads a resource during render, either a promise or a context. With a promise, it suspends the component until the promise resolves, so Suspense shows the fallback, and errors go to the nearest error boundary. Unlike other hooks, I can call it inside conditions and loops. The promise should be created outside the render, like in a server component or a cache, because creating a new one on every render causes loops.`,
      simple: `use() lets a component wait for a promise right in the render, and Suspense handles the loading part.`,
      example: {
        lang: 'tsx',
        code: `function Comments({ promise }) {
  const comments = use(promise)
  return comments.map(c => <p key={c.id}>{c.text}</p>)
}`,
      },
      followUp: ['How is use different from useContext?', 'Where should the promise come from?'],
    },
    {
      id: 'react-29',
      question: 'What are React Server Components, in simple terms?',
      short: `Server Components render on the server only, and their code is never sent to the browser. That means they can read from a database or file system directly, and they reduce the JavaScript bundle. Client Components, marked with use client, are the interactive ones with state, effects and event handlers. In Next.js App Router, components are server components by default. I keep the interactive parts small and push them to the leaves of the tree.`,
      simple: `Some components run only on the server and send finished UI to the browser. Only the interactive ones ship JavaScript.`,
      followUp: ['What is the difference between SSR and Server Components?', 'Can a Server Component use useState?'],
    },
    {
      id: 'react-30',
      question: 'How do you test React components?',
      short: `I use Jest or Vitest as the runner with React Testing Library. I test components the way a user uses them: render, find elements by role or label, click and type with user-event, and assert on what is visible, instead of testing internal state. I mock network calls with something like MSW. For critical flows I add end-to-end tests with Playwright or Cypress. Custom hooks I can test with renderHook.`,
      simple: `Render the component, interact like a user would, and check what shows up on screen.`,
      example: {
        lang: 'tsx',
        code: `render(<Counter />)
await userEvent.click(screen.getByRole('button', { name: /add/i }))
expect(screen.getByText('Count: 1')).toBeInTheDocument()`,
      },
      followUp: ['Why prefer getByRole over test ids?', 'What should you not test?'],
    },
    {
      id: 'react-31',
      question: 'Composition vs inheritance in React?',
      short: `React recommends composition. Instead of building class hierarchies, I build components that take other components or elements as props or children, like a Card with a header slot and a body. It is more flexible and avoids tight coupling. I have not needed inheritance for components, and for shared logic I use custom hooks.`,
      simple: `Build big things by putting small components inside each other, not by extending classes.`,
      example: {
        lang: 'tsx',
        code: `<Card header={<Title />}>
  <Content />
</Card>`,
      },
      followUp: ['What is the children prop?', 'What is the render props pattern?'],
    },
    {
      id: 'react-32',
      question: 'What is a Higher-Order Component?',
      short: `A HOC is a function that takes a component and returns a new component with extra behavior, like withAuth or connect from old Redux. It was the main way to share logic before hooks. I rarely write new ones now because custom hooks are simpler and avoid wrapper nesting and prop name collisions. I still see them in older codebases and some libraries.`,
      simple: `A HOC is a function that wraps a component and gives back a smarter version of it.`,
      example: {
        lang: 'tsx',
        code: `function withAuth(Component) {
  return function Wrapped(props) {
    const { user } = useAuth()
    return user ? <Component {...props} /> : <Login />
  }
}`,
      },
      followUp: ['HOC vs custom hook?', 'What are render props?'],
    },
    {
      id: 'react-33',
      question: 'How do you optimize performance of long lists?',
      short: `For very long lists, the best fix is virtualization, with libraries like react-window or TanStack Virtual, which render only the rows visible on screen. Beyond that, I use stable keys, memoize the row component with React.memo, keep row props stable, and paginate or use infinite scroll if the data is large. I also avoid heavy work inside the row render. I check with the React Profiler before optimizing.`,
      simple: `Do not draw thousands of rows at once. Draw only the ones you can see, and swap them as the user scrolls.`,
      followUp: ['What are the downsides of virtualization?', 'How does the Profiler help?'],
    },
    {
      id: 'react-34',
      question: 'What is the stale closure problem in hooks?',
      short: `Each render creates its own functions that capture the state and props from that render. If an effect or timer is created once with an empty deps array, its callback keeps seeing the old values forever, so for example a setInterval keeps logging count as 0. I fix it by adding the right dependencies, using the functional form of setState, or keeping the latest value in a ref. The exhaustive-deps lint rule warns about these.`,
      simple: `A function remembers the values from the render it was born in. If it lives too long, it keeps using old values.`,
      example: {
        lang: 'tsx',
        code: `useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000)
  return () => clearInterval(id)
}, [])`,
      },
      followUp: ['How can useRef help here?', 'What does the exhaustive-deps rule check?'],
    },
    {
      id: 'react-35',
      question: 'What is the difference between a class component and a function component?',
      short: `Class components use this.state, lifecycle methods like componentDidMount and render. Function components are plain functions that use hooks for state and effects. Since React 16.8, I write function components, because they have less boilerplate, no this binding confusion and hooks make logic easy to share. Classes still work and error boundaries still need one. I know the lifecycle mapping, like componentDidMount being useEffect with an empty array.`,
      simple: `Classes were the old way with special methods. Functions with hooks are the modern, shorter way.`,
      followUp: ['How do you map lifecycle methods to hooks?', 'Why are error boundaries still classes?'],
    },
    {
      id: 'react-36',
      question: 'What is the difference between useEffect and useLayoutEffect?',
      short: `useEffect runs after React has painted the screen, so it does not block the browser. useLayoutEffect runs synchronously after the DOM updates but before the paint. I use it only when I need to measure the DOM, like an element's size or position, and change something before the user sees a flicker, for example positioning a tooltip. It blocks painting, so I use useEffect by default.`,
      simple: `useEffect runs after the screen shows. useLayoutEffect runs just before, so you can fix the layout without a flash.`,
      followUp: ['Why does useLayoutEffect warn on the server?', 'What is useEffectEvent?'],
    },
  ],
}
