import type { Topic } from '../types'

export const typescript: Topic = {
  id: 'typescript',
  title: 'TypeScript',
  blurb: 'Types vs interfaces, generics, narrowing, utility types, and typing React code, the way I would explain them in an interview.',
  questions: [
    {
      id: 'ts-1',
      question: 'Why use TypeScript over plain JavaScript?',
      short:
        'TypeScript catches a whole class of bugs at compile time, like wrong argument types or a typo in a property name, before the code ever runs. The editor autocomplete and refactoring also get much better. On a team, types act as living documentation. The tradeoff is some extra setup and writing types, but on any project that lives longer than a few weeks I think it pays off.',
      simple:
        'It checks your code before you run it, so you find mistakes early. It then compiles away to normal JavaScript.',
      example: {
        lang: 'ts',
        code: `function area(w: number, h: number) {
  return w * h
}
area(5, '10') // error at compile time`,
      },
      followUp: ['Does TypeScript check types at runtime?', 'What is the cost of adopting it?'],
    },
    {
      id: 'ts-2',
      question: 'type vs interface: what is the difference?',
      short:
        'For describing object shapes they are almost the same. Interfaces can be extended and merged, meaning declaring the same interface twice combines them, which is useful for augmenting libraries. Type aliases can name anything, unions, tuples, primitives, mapped types. So my rule is: interface for object shapes and public APIs, type when I need a union or something more advanced.',
      simple:
        'Interface describes the shape of an object and can be merged. Type can name any kind of type, including unions.',
      example: {
        lang: 'ts',
        code: `interface User { id: number; name: string }
interface Admin extends User { role: 'admin' }

type Id = string | number
type Point = [number, number]
type AdminUser = User & { role: 'admin' }`,
      },
      followUp: ['What is declaration merging?', 'Which one gives better error messages?'],
    },
    {
      id: 'ts-3',
      question: 'any vs unknown vs never?',
      short:
        'any turns off type checking, so anything goes, and I try to avoid it. unknown is the safe version: it can hold anything, but I must narrow it with a check before using it. never is the type of something that can never happen, like a function that always throws, or the leftover branch after I handled all cases in a union.',
      simple:
        'any: no rules. unknown: anything is allowed in, but you must check before using it. never: this cannot happen.',
      example: {
        lang: 'ts',
        code: `let a: any = 'x'
a.foo.bar        // no error, runtime crash

let u: unknown = 'x'
if (typeof u === 'string') u.toUpperCase()

function fail(msg: string): never { throw new Error(msg) }`,
      },
      followUp: ['Where do you use unknown in real code?', 'How does never help with exhaustive checks?'],
    },
    {
      id: 'ts-4',
      question: 'What are generics and why are they useful?',
      short:
        'Generics let me write one function, type, or component that works with many types while keeping type safety. I write a type parameter like T, and TypeScript fills it in from usage. Instead of using any and losing information, the output type stays linked to the input type. I use them for things like API response wrappers and reusable hooks.',
      simple:
        'A type placeholder. You say T now, and it is decided later when someone uses it.',
      example: {
        lang: 'ts',
        code: `function first<T>(arr: T[]): T | undefined {
  return arr[0]
}
first([1, 2])    // number | undefined
first(['a'])     // string | undefined

interface ApiResponse<T> { data: T; error?: string }`,
      },
      followUp: ['What are generic constraints?', 'Can you give a default for a type parameter?'],
    },
    {
      id: 'ts-5',
      question: 'Generic constraints: what does extends do in <T extends ...>?',
      short:
        'It limits what T can be. If I write T extends { id: number }, then T can be any type, as long as it has an id number, and inside the function I can safely use item.id. Without the constraint, TypeScript would not let me touch id, because T could be anything.',
      simple:
        'You say, T can be anything, but at least it must have this shape.',
      example: {
        lang: 'ts',
        code: `function byId<T extends { id: number }>(items: T[], id: number) {
  return items.find(i => i.id === id)
}

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}`,
      },
      followUp: ['What does keyof do?'],
    },
    {
      id: 'ts-6',
      question: 'Union and intersection types?',
      short:
        'A union, A | B, means the value is one of the types, so I can only use what is common unless I narrow it. An intersection, A & B, means the value has everything from both, so it is a combination. I use unions a lot for states like loading, success, error, and intersections to merge object types.',
      simple:
        'Union is either-or. Intersection is both together.',
      example: {
        lang: 'ts',
        code: `type Status = 'idle' | 'loading' | 'error'
type A = { a: number }
type B = { b: string }
type AB = A & B   // { a: number; b: string }`,
      },
      followUp: ['What is a discriminated union?'],
    },
    {
      id: 'ts-7',
      question: 'What is type narrowing and what are the common ways to do it?',
      short:
        'Narrowing is when TypeScript refines a broad type to a more specific one inside a block, based on a check. The common ways are typeof, instanceof, the in operator, equality checks, truthiness, and discriminated unions with a literal field. I can also write my own type guard function that returns value is Type.',
      simple:
        'You check something, and inside that if block TypeScript knows more about the type.',
      example: {
        lang: 'ts',
        code: `function len(x: string | string[]) {
  if (typeof x === 'string') return x.length
  return x.length
}

function isUser(v: unknown): v is { name: string } {
  return typeof v === 'object' && v !== null && 'name' in v
}`,
      },
      followUp: ['What is a type predicate?', 'What is an assertion function?'],
    },
    {
      id: 'ts-8',
      question: 'What are discriminated unions?',
      short:
        'It is a union where every member has a shared literal property, like type or status, that tells them apart. When I check that property, TypeScript narrows to the exact member. I use it to model things like request state, so loading has no data and success always has data, which makes impossible states impossible.',
      simple:
        'Each option has a label field. Check the label, and TypeScript knows exactly which option you have.',
      example: {
        lang: 'ts',
        code: `type State =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; error: string }

function render(s: State) {
  if (s.status === 'success') return s.data.length
}`,
      },
      followUp: ['How do you make a switch exhaustive?'],
    },
    {
      id: 'ts-9',
      question: 'Which utility types do you use often?',
      short:
        'The ones I use the most are Partial to make all fields optional, Required for the opposite, Pick and Omit to select or remove fields, Record for key-value maps, and ReturnType and Parameters to derive types from functions. Readonly and NonNullable come up too. They save me from rewriting almost-the-same types.',
      simple:
        'Built-in helpers that make a new type out of an existing one, so you do not copy and paste.',
      example: {
        lang: 'ts',
        code: `interface User { id: number; name: string; email: string }
type Draft   = Partial<User>
type Preview = Pick<User, 'id' | 'name'>
type NoEmail = Omit<User, 'email'>
type Roles   = Record<'admin' | 'user', boolean>
type Result  = ReturnType<typeof fetchUser>`,
      },
      followUp: ['How would you implement Partial yourself?', 'What does Awaited do?'],
    },
    {
      id: 'ts-10',
      question: 'What are mapped types and conditional types?',
      short:
        'A mapped type builds a new type by looping over the keys of another one, like { [K in keyof T]: ... }. Partial and Readonly are made this way. A conditional type picks a type based on a condition, T extends U ? X : Y. Together with infer I can pull out things like the type inside an array or promise. I use them rarely, mostly in shared utility code.',
      simple:
        'Mapped: loop over keys and transform each. Conditional: an if statement, but for types.',
      example: {
        lang: 'ts',
        code: `type MyPartial<T> = { [K in keyof T]?: T[K] }
type IsString<T> = T extends string ? true : false
type Elem<T> = T extends (infer U)[] ? U : T
type X = Elem<number[]> // number`,
      },
      followUp: ['What does infer do?'],
    },
    {
      id: 'ts-11',
      question: 'Enums vs union of string literals?',
      short:
        'Enums generate real JavaScript code at runtime, and numeric enums have some quirks, like reverse mapping. A union of string literals produces no runtime code and is simpler. These days I prefer the union, or an as const object when I also need the values at runtime. I use enums mainly when a codebase already follows that convention.',
      simple:
        'Enums create an actual object in your JS. A union of strings is just a type and disappears after compiling.',
      example: {
        lang: 'ts',
        code: `enum Role { Admin = 'ADMIN', User = 'USER' }

type RoleLit = 'ADMIN' | 'USER'

const ROLES = { Admin: 'ADMIN', User: 'USER' } as const
type RoleVal = (typeof ROLES)[keyof typeof ROLES]`,
      },
      followUp: ['What is a const enum?'],
    },
    {
      id: 'ts-12',
      question: 'What does readonly do, and how is it different from const?',
      short:
        'const stops me from reassigning a variable. readonly is for properties and arrays, and it stops me from changing them through that type. So it is about the thing inside, not the variable itself. It only exists at compile time, nothing stops mutation at runtime. I use Readonly<T> or readonly arrays on props and state to avoid accidental mutation.',
      simple:
        'const locks the variable. readonly locks the property. Both are about not changing things, but at different places.',
      example: {
        lang: 'ts',
        code: `interface P { readonly id: number }
const p: P = { id: 1 }
p.id = 2 // error

const list: readonly number[] = [1, 2]
list.push(3) // error`,
      },
      followUp: ['Is readonly deep?'],
    },
    {
      id: 'ts-13',
      question: 'What does as const do?',
      short:
        'as const tells TypeScript to treat a value as the narrowest, read-only version of itself. Strings become literal types instead of plain string, arrays become readonly tuples, and object properties become readonly. I use it for config objects and lists of options, so I can derive a union type from them without writing the values twice.',
      simple:
        'It freezes the type to exactly what you wrote, not the wide version.',
      example: {
        lang: 'ts',
        code: `const sizes = ['sm', 'md', 'lg'] as const
type Size = (typeof sizes)[number] // 'sm' | 'md' | 'lg'

const cfg = { mode: 'dark' } as const
// cfg.mode is 'dark', not string`,
      },
      followUp: ['as const vs Object.freeze?'],
    },
    {
      id: 'ts-14',
      question: 'What is the satisfies operator?',
      short:
        'satisfies checks that a value matches a type, without changing the type of the value itself. With a normal annotation, I lose the specific information, everything becomes the wide type. With satisfies I still get errors for wrong shapes or typos, and I keep the exact inferred types, so autocomplete stays precise.',
      simple:
        'It says: check this matches the type, but do not widen what I wrote.',
      example: {
        lang: 'ts',
        code: `type Colors = Record<string, string | number[]>
const c = {
  red: [255, 0, 0],
  green: '#0f0',
} satisfies Colors

c.red.map(n => n)       // still an array
c.green.toUpperCase()   // still a string`,
      },
      followUp: ['How is it different from a type annotation or as?'],
    },
    {
      id: 'ts-15',
      question: 'Type assertions (as) vs type guards?',
      short:
        'as just tells the compiler to trust me, there is no runtime check, so if I am wrong it breaks later. A type guard actually checks at runtime and narrows the type safely. I use as only when I know something TypeScript cannot, like a DOM element I just queried, and for unknown data from an API I prefer guards or a validation library like zod.',
      simple:
        'as says: believe me. A type guard says: let me prove it.',
      example: {
        lang: 'ts',
        code: `const el = document.getElementById('x') as HTMLInputElement
el.value

const input = document.getElementById('x')
if (input instanceof HTMLInputElement) input.value`,
      },
      followUp: ['What is the non-null assertion operator?', 'How do you validate API data at runtime?'],
    },
    {
      id: 'ts-16',
      question: 'What are declaration files (.d.ts)?',
      short:
        'A .d.ts file only contains type information, no real code. It tells TypeScript what a JavaScript library looks like, so I get types and autocomplete. Many packages ship their own, and for others I install from DefinitelyTyped, like @types/react. I also write my own to declare global variables, or for modules without types.',
      simple:
        'A file that describes the types of some JS code, so TypeScript understands it.',
      example: {
        lang: 'ts',
        code: `// globals.d.ts
declare module '*.svg' {
  const src: string
  export default src
}
interface Window { analytics: { track(e: string): void } }`,
      },
      followUp: ['What is the tsconfig include/types option for?'],
    },
    {
      id: 'ts-17',
      question: 'How do you type React props, state and events?',
      short:
        'For props I write an interface or type and annotate the destructured parameter. I do not use React.FC much anymore. For state, useState usually infers the type, but I add a generic when the initial value is null or an empty array, like useState<User | null>(null). For events I use React types like React.ChangeEvent<HTMLInputElement>. Children go as React.ReactNode.',
      simple:
        'Define a props type, pass generics to hooks when needed, and use React event types for handlers.',
      example: {
        lang: 'tsx',
        code: `interface ButtonProps {
  label: string
  onClick?: () => void
  children?: React.ReactNode
}
function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}

const [user, setUser] = useState<User | null>(null)
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => e.target.value`,
      },
      followUp: ['How do you type useRef and useReducer?', 'How do you type a generic component?'],
    },
    {
      id: 'ts-18',
      question: 'Which tsconfig options matter most, and what does strict do?',
      short:
        'I always turn on strict. It enables a group of checks, the big ones being strictNullChecks, so null and undefined are not allowed everywhere, noImplicitAny, and strictFunctionTypes. I also like noUncheckedIndexedAccess for safer array access. Other important options are target, module, moduleResolution, jsx, and paths for import aliases.',
      simple:
        'strict makes TypeScript pick up many more mistakes. It is annoying at first but saves time later.',
      example: {
        lang: 'json',
        code: `{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "target": "ES2022",
    "jsx": "react-jsx",
    "paths": { "@/*": ["./src/*"] }
  }
}`,
      },
      followUp: ['How would you migrate a JS project to TS gradually?'],
    },
  ],
}
