import type { Topic } from '../types'

export const nextjs: Topic = {
  id: 'nextjs',
  title: 'Next.js',
  blurb: 'App Router, rendering modes, server components, caching, routing, server actions and deployment.',
  questions: [
    {
      id: 'next-1',
      question: 'What is the difference between the App Router and the Pages Router?',
      short: `The Pages Router is the older system where every file in pages/ is a route and you fetch data with getServerSideProps or getStaticProps. The App Router lives in the app/ folder and is built on React Server Components. Components are server components by default, I can fetch data right inside them with async/await, and I get nested layouts, loading and error files, streaming and server actions. I use the App Router for new projects. Pages Router is still supported, so I only touch it on older codebases, and you can even run both in the same app while migrating.`,
      simple: `Pages Router is the old way, App Router is the new way. The new one runs components on the server by default and gives you layouts, loading screens and simpler data fetching.`,
      example: {
        lang: 'text',
        code: `pages/blog/[slug].tsx   -> Pages Router
app/blog/[slug]/page.tsx -> App Router`,
      },
      followUp: ['Can you use both routers in one project?', 'How would you migrate a Pages app to the App Router?'],
    },
    {
      id: 'next-2',
      question: 'Explain SSR, SSG, ISR and CSR. When do you use each?',
      short: `CSR means the browser downloads JS and renders everything, so I use it for dashboards behind login where SEO does not matter. SSR renders on the server for every request, which I use for personalised or always-fresh pages. SSG renders at build time and serves static HTML from a CDN, great for blogs and docs. ISR is SSG with a timer or on-demand trigger, so a page gets regenerated in the background after a set time. I pick based on how often the data changes and whether it is user specific.`,
      simple: `CSR builds the page in the browser. SSR builds it on each request. SSG builds it once at deploy time. ISR is SSG that refreshes itself every so often.`,
      example: {
        lang: 'tsx',
        code: `// App Router: static with ISR every 60s
export const revalidate = 60

// Force SSR on every request
export const dynamic = 'force-dynamic'`,
      },
      followUp: ['How does Next.js decide a route is static or dynamic?', 'What happens to SEO with CSR?'],
    },
    {
      id: 'next-3',
      question: 'What are server components and client components?',
      short: `In the App Router every component is a server component unless I say otherwise. Server components run only on the server, so they can read the database, use secrets and send zero JavaScript to the browser for that component. Client components run in the browser too, and I need them for state, effects, event handlers and browser APIs. My habit is to keep pages as server components and push the interactive bits down into small client components, so the bundle stays light.`,
      simple: `Server components run on the server and send ready HTML. Client components run in the browser and handle clicks and state. Use client ones only where you need interactivity.`,
      followUp: ['Can a client component import a server component?', 'What can you not do in a server component?'],
    },
    {
      id: 'next-4',
      question: 'What does the "use client" directive do and where do you place it?',
      short: `"use client" at the top of a file marks a boundary. That file and everything it imports become part of the client bundle. I do not need it in every client file, only at the entry point of the client subtree. I add it when I need useState, useEffect, onClick or browser APIs like window. I try to keep it as low in the tree as possible, so something like a LikeButton is a client component but the surrounding page stays on the server.`,
      simple: `It tells Next.js that this file runs in the browser. Put it at the top of files that use state, effects or click handlers.`,
      example: {
        lang: 'tsx',
        code: `'use client'
import { useState } from 'react'

export default function Counter() {
  const [n, setN] = useState(0)
  return <button onClick={() => setN(n + 1)}>{n}</button>
}`,
      },
      followUp: ['Can you pass a server component as children to a client component?', 'Are client components still rendered on the server?'],
    },
    {
      id: 'next-5',
      question: 'How does data fetching work in the App Router?',
      short: `I make the server component async and just await fetch or my database call directly in it. No getServerSideProps needed. Multiple independent requests I fire with Promise.all so they do not waterfall. For client-side stuff like live search or polling, I use a client component with React Query or SWR. Mutations go through server actions or route handlers. Because it all runs on the server, I can keep secrets and DB access out of the browser.`,
      simple: `Make the component async and await your data inside it. It runs on the server, so you can talk to a database directly.`,
      example: {
        lang: 'tsx',
        code: `export default async function Page() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()
  return <PostList posts={posts} />
}`,
      },
      followUp: ['How do you avoid request waterfalls?', 'When would you still fetch on the client?'],
    },
    {
      id: 'next-6',
      question: 'How does caching and revalidation work in Next.js?',
      short: `It changed between versions, so I say which one. In Next 14, fetch was cached by default and I used next: { revalidate: 60 } or cache: 'no-store' to control it. In Next 15, fetch and GET route handlers are not cached by default, so I opt in. For time-based refresh I use revalidate, and for on-demand refresh I call revalidatePath or revalidateTag after a mutation. There is also the full route cache and the client router cache, and I keep both in mind when data looks stale.`,
      simple: `Next can remember fetch results so pages are fast. You tell it how long to remember, or clear the memory yourself after you change data.`,
      example: {
        lang: 'ts',
        code: `// time based
fetch(url, { next: { revalidate: 60, tags: ['posts'] } })

// on demand, inside a server action
import { revalidateTag } from 'next/cache'
revalidateTag('posts')`,
      },
      followUp: ['What changed about caching defaults in Next 15?', 'Difference between revalidatePath and revalidateTag?'],
    },
    {
      id: 'next-7',
      question: 'What are layout.tsx, loading.tsx, error.tsx and not-found.tsx?',
      short: `They are special files in the app folder. layout.tsx wraps pages and stays mounted when I navigate between them, so it is good for navbars and shells. loading.tsx is the instant fallback shown while the page streams in, and it works through Suspense. error.tsx catches errors in that segment, it has to be a client component and gets a reset function. not-found.tsx shows when I call notFound() or the route does not exist. Each one applies to its folder and everything nested below.`,
      simple: `layout is the shared frame, loading is the spinner, error is the crash screen, and not-found is the 404 page for that part of the app.`,
      example: {
        lang: 'tsx',
        code: `'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <button onClick={reset}>Something broke. Try again</button>
}`,
      },
      followUp: ['Why does error.tsx need to be a client component?', 'What is the difference between layout and template?'],
    },
    {
      id: 'next-8',
      question: 'How do routing, dynamic routes and catch-all routes work?',
      short: `Routing is folder based. A folder with a page.tsx becomes a URL. Square brackets make it dynamic, so app/products/[id]/page.tsx matches /products/42 and I read id from params. [...slug] is catch-all and [[...slug]] is optional catch-all. In Next 15, params and searchParams are promises, so I await them. For static generation of dynamic routes I add generateStaticParams to tell Next which ids to prebuild.`,
      simple: `Folders are URLs. Put a name in square brackets and it becomes a variable part of the URL.`,
      example: {
        lang: 'tsx',
        code: `// app/products/[id]/page.tsx
export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <h1>Product {id}</h1>
}`,
      },
      followUp: ['What is generateStaticParams?', 'How do you read query strings in a server component?'],
    },
    {
      id: 'next-9',
      question: 'What are route groups, parallel routes and intercepting routes?',
      short: `Route groups are folders in parentheses like (marketing). They do not show up in the URL, so I use them to organise code or to give different sections different layouts. Parallel routes use @slot folders and let me render multiple pages in the same layout at once, like a dashboard with panels. Intercepting routes let me show another route inside the current layout, the classic example is opening a photo in a modal while the direct URL still opens the full page. I use groups a lot, the other two only for modals and dashboards.`,
      simple: `Route groups let you organise folders without changing the URL. Parallel and intercepting routes are for things like modals and dashboards with several panels.`,
      followUp: ['How would you build a modal that has its own URL?', 'Can two route groups have different root layouts?'],
    },
    {
      id: 'next-10',
      question: 'What is middleware in Next.js and what do you use it for?',
      short: `Middleware is a file called middleware.ts at the project root that runs before a request reaches the route. I use it for things that should happen on every request or a matcher set of paths, like checking an auth cookie and redirecting to login, setting locale, A/B testing or adding headers. It runs on the edge runtime by default, so I cannot use heavy Node APIs in it. I keep it light, and I do not put real authorisation there alone, I still check on the server in the data layer.`,
      simple: `Middleware is code that runs before a page loads. It can redirect, rewrite or add headers, for example sending logged-out users to the login page.`,
      example: {
        lang: 'ts',
        code: `import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  if (!req.cookies.get('token')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*'] }`,
      },
      followUp: ['Why not rely only on middleware for security?', 'What runtime does middleware use?'],
    },
    {
      id: 'next-11',
      question: 'What are route handlers?',
      short: `Route handlers are the App Router replacement for API routes. I create a route.ts file in a folder and export functions named after HTTP methods like GET and POST. They use the standard Request and Response objects. I use them for webhooks, public APIs, or when something outside my app needs an endpoint. For my own forms and mutations I usually prefer server actions. You cannot have a page.tsx and route.ts at the same segment.`,
      simple: `A route.ts file lets you write a backend endpoint inside your Next app. Export GET, POST and so on.`,
      example: {
        lang: 'ts',
        code: `// app/api/users/route.ts
export async function GET() {
  return Response.json([{ id: 1, name: 'Asha' }])
}

export async function POST(req: Request) {
  const body = await req.json()
  return Response.json(body, { status: 201 })
}`,
      },
      followUp: ['When route handler vs server action?', 'Are GET route handlers cached?'],
    },
    {
      id: 'next-12',
      question: 'What are server actions?',
      short: `Server actions are async functions marked with "use server" that run on the server but I can call from a form or a client component. The form's action prop takes the function, so it even works before JavaScript loads. I use them for mutations like creating a post, then call revalidatePath so the UI updates. They are public HTTP endpoints under the hood, so I always validate input and check auth inside them, same as any API.`,
      simple: `A server action is a function that runs on the server when you submit a form. You skip writing a separate API for simple mutations.`,
      example: {
        lang: 'tsx',
        code: `'use server'
import { revalidatePath } from 'next/cache'

export async function addTodo(formData: FormData) {
  const title = String(formData.get('title'))
  await db.todo.create({ data: { title } })
  revalidatePath('/todos')
}

// <form action={addTodo}><input name="title" /></form>`,
      },
      followUp: ['Are server actions secure by default?', 'How do you show pending state with a server action?'],
    },
    {
      id: 'next-13',
      question: 'Why use next/image and what does it give you?',
      short: `next/image gives me automatic resizing, modern formats like WebP or AVIF, lazy loading by default, and it reserves space so there is no layout shift. I need to pass width and height, or use fill with a sized parent. For the hero image I add the priority prop so it loads early and helps LCP. Remote images need their domain whitelisted in remotePatterns in next.config. It saves me from hand optimising images.`,
      simple: `It is a smarter img tag. It makes images smaller, loads them lazily and stops the page from jumping around.`,
      example: {
        lang: 'tsx',
        code: `import Image from 'next/image'

<Image src="/hero.jpg" alt="Team" width={1200} height={600} priority />`,
      },
      followUp: ['How do you stop layout shift with images?', 'How do you allow remote images?'],
    },
    {
      id: 'next-14',
      question: 'How does next/link work and what is prefetching?',
      short: `Link is used for client-side navigation, so clicking does not reload the whole page. When a Link enters the viewport in production, Next prefetches that route in the background, so the click feels instant. For dynamic routes it prefetches up to the nearest loading boundary. I can turn it off with prefetch={false} for heavy or rarely used links. For programmatic navigation inside client components I use useRouter from next/navigation.`,
      simple: `Link moves between pages without a full reload, and it quietly loads the next page ahead of time so it opens fast.`,
      example: {
        lang: 'tsx',
        code: `import Link from 'next/link'

<Link href="/blog/my-post" prefetch={false}>Read more</Link>`,
      },
      followUp: ['When do you use useRouter vs Link?', 'Does prefetch run in development?'],
    },
    {
      id: 'next-15',
      question: 'How does next/font work?',
      short: `next/font downloads the font at build time and self-hosts it with my other static assets, so there are no requests to Google at runtime. It also applies size-adjust, which cuts layout shift when the font swaps in. I import something like Inter from next/font/google, call it with subsets, and add the className or CSS variable to the body. For local fonts I use next/font/local. It is a quick win for both privacy and performance.`,
      simple: `It loads fonts from your own server at build time, so text does not jump or flash when the font arrives.`,
      example: {
        lang: 'tsx',
        code: `import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], display: 'swap' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={inter.className}>{children}</body></html>
}`,
      },
      followUp: ['What is the benefit of self-hosting fonts?', 'How do you use a variable font with Tailwind?'],
    },
    {
      id: 'next-16',
      question: 'How do you handle metadata and SEO in the App Router?',
      short: `I export a metadata object from a layout or page for static things, or generateMetadata for dynamic ones where I fetch by the route param. That covers title, description, openGraph, twitter cards and canonical URLs. Next also supports special files like sitemap.ts, robots.ts and opengraph-image. Since pages render on the server, crawlers get full HTML. I also use a title template in the root layout so each page adds its own name.`,
      simple: `Export a metadata object from the page and Next puts the right title and description tags in the head. For dynamic pages, use generateMetadata.`,
      example: {
        lang: 'tsx',
        code: `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  return { title: post.title, description: post.excerpt }
}`,
      },
      followUp: ['How do you generate a sitemap?', 'Does fetching in generateMetadata duplicate the request?'],
    },
    {
      id: 'next-17',
      question: 'How do environment variables work in Next.js?',
      short: `I put them in .env.local, and by default they are only available on the server. If a variable must be readable in the browser, it needs the NEXT_PUBLIC_ prefix, and then its value is inlined into the JS bundle at build time. So I never put secrets under NEXT_PUBLIC. Because of the build-time inlining, changing a public variable means rebuilding. I keep .env.local out of git and set the real values in the hosting dashboard.`,
      simple: `Normal variables stay on the server. Only the ones starting with NEXT_PUBLIC_ go to the browser, so never put secrets there.`,
      example: {
        lang: 'bash',
        code: `DATABASE_URL=postgres://...        # server only
NEXT_PUBLIC_API_URL=https://api.x.com  # visible in browser`,
      },
      followUp: ['Why does a NEXT_PUBLIC change need a rebuild?', 'What is the order of .env file loading?'],
    },
    {
      id: 'next-18',
      question: 'How do streaming and Suspense work in Next.js?',
      short: `Instead of waiting for the slowest query before sending anything, Next can stream HTML in chunks. I wrap a slow server component in Suspense with a fallback, and the rest of the page shows right away while that part streams in later. loading.tsx is basically an automatic Suspense boundary around the page. It improves perceived speed and TTFB. I split slow data like recommendations or reviews into their own Suspense boundaries so they do not block the main content.`,
      simple: `The page sends the fast parts first and fills in the slow parts when they are ready, instead of making the user wait for everything.`,
      example: {
        lang: 'tsx',
        code: `import { Suspense } from 'react'

<Suspense fallback={<p>Loading reviews...</p>}>
  <Reviews productId={id} />
</Suspense>`,
      },
      followUp: ['How is loading.tsx related to Suspense?', 'Does streaming help SEO?'],
    },
    {
      id: 'next-19',
      question: 'What is a hydration error and how do you fix it?',
      short: `A hydration error happens when the HTML rendered on the server does not match what React renders first on the client. Typical causes are using Date.now or Math.random during render, reading window or localStorage in render, invalid HTML nesting like a div inside a p, or browser extensions changing the DOM. I fix it by moving browser-only logic into useEffect, or loading the component with dynamic and ssr: false. For harmless differences like timestamps I can use suppressHydrationWarning on that element.`,
      simple: `The server's HTML and the browser's first render disagree. Usually because something random or browser-only is used while rendering.`,
      example: {
        lang: 'tsx',
        code: `'use client'
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return null
return <p>{new Date().toLocaleTimeString()}</p>`,
      },
      followUp: ['Can invalid HTML nesting cause it?', 'What does dynamic with ssr false do?'],
    },
    {
      id: 'next-20',
      question: 'How do you deploy a Next.js app?',
      short: `The easiest is Vercel, I connect the repo, set env variables and every push gets a deploy with preview URLs. For self-hosting I run next build and next start on a Node server, usually in Docker with output: 'standalone' to keep the image small, behind Nginx or a load balancer. Fully static sites can use output: 'export' and go to any static host, but then I lose server features like middleware and server actions. I also set up caching and CDN in front for assets.`,
      simple: `Push to Vercel and it deploys itself, or build the app and run it on your own Node server, often in Docker.`,
      example: {
        lang: 'js',
        code: `// next.config.js
module.exports = { output: 'standalone' }`,
      },
      followUp: ['What do you lose with output: export?', 'How do you handle env vars across environments?'],
    },
    {
      id: 'next-21',
      question: 'How do you improve performance in a Next.js app?',
      short: `First I keep as much as possible in server components so less JS reaches the browser. Then I use next/image and next/font, lazy load heavy client components with next/dynamic, and split slow data into Suspense boundaries. I cache or statically render what I can, and use ISR for semi-static pages. I check the bundle with the bundle analyzer and watch Core Web Vitals in Lighthouse or Vercel analytics. Third-party scripts go through next/script with a lazy strategy.`,
      simple: `Send less JavaScript, optimise images and fonts, cache pages, and load slow things later.`,
      followUp: ['How do you find what is making the bundle big?', 'How would you improve LCP specifically?'],
    },
    {
      id: 'next-22',
      question: 'How do you handle authentication in Next.js?',
      short: `I usually use a library like Auth.js (NextAuth) or Clerk instead of building it from scratch. Sessions are stored in an httpOnly cookie, either a signed JWT or a database session. Middleware does a quick check and redirects unauthenticated users, but the real check happens in server components, server actions and route handlers, close to the data. If I roll my own, I hash passwords with bcrypt or argon2, sign the session, and set secure, httpOnly and sameSite on the cookie.`,
      simple: `Log the user in, store a safe cookie, and check that cookie on the server before showing private data.`,
      followUp: ['JWT vs database sessions, which one and why?', 'Where do you check authorisation, middleware or the data layer?'],
    },
    {
      id: 'next-23',
      question: 'What is the difference between static and dynamic rendering in the App Router?',
      short: `A route is rendered statically at build time if it does not use anything request-specific. It becomes dynamic when I use cookies(), headers(), searchParams, or set no-store or force-dynamic. Static pages go to the CDN and are very fast, dynamic ones are rendered per request. In the build output Next marks routes with a circle for static and a lambda for dynamic. I try to keep as much static as I can and make only the personalised parts dynamic, and Partial Prerendering is moving toward mixing both on one page.`,
      simple: `Static pages are made once and reused. Dynamic pages are made fresh for every visitor. Reading cookies or headers makes a page dynamic.`,
      followUp: ['What is Partial Prerendering?', 'How can you tell which routes are dynamic?'],
    },
    {
      id: 'next-24',
      question: 'How do you do client-side navigation hooks like useRouter, usePathname and useSearchParams?',
      short: `They all come from next/navigation and only work in client components. useRouter gives me push, replace and refresh for programmatic navigation. usePathname returns the current path, handy for highlighting the active nav link. useSearchParams reads the query string, and I wrap the component using it in Suspense, otherwise the build can bail out of static rendering. Do not mix it up with next/router, that one is for the Pages Router.`,
      simple: `These hooks let a client component move between pages and read the current URL and query string.`,
      example: {
        lang: 'tsx',
        code: `'use client'
import { usePathname, useRouter } from 'next/navigation'

const pathname = usePathname()
const router = useRouter()
router.push('/dashboard')`,
      },
      followUp: ['Why wrap useSearchParams in Suspense?', 'next/router vs next/navigation?'],
    },
    {
      id: 'next-25',
      question: 'How do you handle forms and loading states with server actions?',
      short: `I pass the action to the form and use useActionState to get the returned errors or message, and useFormStatus inside a child button to show a pending state. I validate on the server with Zod and return field errors instead of throwing. After success I call revalidatePath or redirect. For instant feedback I sometimes add useOptimistic, so the UI updates right away and rolls back if the action fails. I keep client-side validation too, but the server check is the one that counts.`,
      simple: `Submit the form to a server action, show a disabled button while it runs, and send back error messages if validation fails.`,
      example: {
        lang: 'tsx',
        code: `'use client'
import { useFormStatus } from 'react-dom'

function Submit() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>
}`,
      },
      followUp: ['How do you return validation errors from a server action?', 'What is useOptimistic for?'],
    },
    {
      id: 'next-26',
      question: 'What is the difference between next/dynamic and React.lazy, and when do you use it?',
      short: `next/dynamic is Next's wrapper around dynamic import with Suspense built in. I use it to code-split heavy client components, like a chart library or rich text editor, so they load only when needed. It also has an ssr: false option for components that depend on window and break on the server. React.lazy does the splitting part but has no SSR switch, so in Next I just reach for next/dynamic. In server components I can also use it, but ssr: false must live in a client component.`,
      simple: `It loads a heavy component only when it is needed, and lets you skip server rendering for things that only work in the browser.`,
      example: {
        lang: 'tsx',
        code: `import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
})`,
      },
      followUp: ['Why can ssr false not be used in a server component?', 'How else can you reduce bundle size?'],
    },
  ],
}
