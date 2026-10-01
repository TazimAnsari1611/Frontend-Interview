import type { Topic } from '../types'

export const performance: Topic = {
  id: 'performance',
  title: 'Performance',
  blurb: 'Core Web Vitals, bundle size, caching, rendering cost and how to debug a slow page.',
  questions: [
    {
      id: 'perf-1',
      question: 'What are the Core Web Vitals (LCP, INP, CLS) and how do you improve each?',
      short: `They are Google's three user-focused metrics. LCP is how fast the biggest thing on screen shows up, and I want it under 2.5 seconds. For that I optimize the hero image, preload it, and cut render-blocking CSS and JS. INP measures how quickly the page reacts to clicks and taps, under 200ms is good. I fix it by breaking up long tasks, moving heavy work off the main thread, and keeping React renders small. CLS is layout jumping, under 0.1. I fix it by always setting width and height on images and reserving space for ads or banners.`,
      simple: `LCP is how fast the main content appears. INP is how fast the page answers when you click. CLS is how much things jump around while loading. Faster, snappier and steadier is the goal.`,
      example: {
        text: 'Reserve space for an image so it cannot push content down.',
        lang: 'tsx',
        code: `<img
  src="/hero.webp"
  width={1200}
  height={600}
  fetchPriority="high"
  alt="Product hero"
/>`,
      },
      followUp: [
        'What replaced FID and why?',
        'How do you measure these in real users, not just in the lab?',
      ],
    },
    {
      id: 'perf-2',
      question: 'What is code splitting and how do you do it in React?',
      short: `Code splitting means I do not ship the whole app in one big JS file. I split it so the user only downloads what the current screen needs. The easy win is route-level splitting with React.lazy and dynamic import, wrapped in Suspense. I also split heavy things like a chart library or a rich text editor and load them only when the user opens that feature. Bundlers like Vite or webpack create separate chunks automatically when they see a dynamic import. This cuts the initial load and helps LCP.`,
      simple: `Instead of sending all the code at once, I send small pieces only when they are needed. The first page loads faster.`,
      example: {
        lang: 'tsx',
        code: `import { lazy, Suspense } from 'react'

const Reports = lazy(() => import('./pages/Reports'))

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Reports />
    </Suspense>
  )
}`,
      },
      followUp: [
        'Where do you put Suspense boundaries?',
        'How do you prefetch a chunk before the user clicks?',
      ],
    },
    {
      id: 'perf-3',
      question: 'How do you lazy load images and other content?',
      short: `For images below the fold I add loading="lazy" so the browser fetches them only when they get close to the viewport. I never lazy load the hero or LCP image, that one should load early with high priority. For more control, like fading in or loading a video, I use IntersectionObserver. I also lazy load components, like a modal or a map, only when they are needed. And I always keep width and height set so lazy loading does not cause layout shift.`,
      simple: `Do not load things the user cannot see yet. Load them when the user scrolls near them.`,
      example: {
        lang: 'tsx',
        code: `<img src="/card.webp" loading="lazy" width={400} height={300} alt="Card" />`,
      },
      followUp: [
        'Why should you not lazy load the LCP image?',
        'How does IntersectionObserver work?',
      ],
    },
    {
      id: 'perf-4',
      question: 'How do you optimize images?',
      short: `First I pick the right format. WebP or AVIF are much smaller than JPEG or PNG at similar quality, and SVG for icons and logos. Then I serve the right size using srcset and sizes, so a phone does not download a 2000px image. I compress them, lazy load the ones below the fold, and set width and height to avoid layout shift. Serving through an image CDN that resizes and converts on the fly makes this easy. The biggest win is usually just the hero image, so I start there.`,
      simple: `Use small modern formats, send the size that fits the screen, and load them late if they are not visible.`,
      example: {
        lang: 'tsx',
        code: `<picture>
  <source type="image/avif" srcSet="/hero.avif" />
  <source type="image/webp" srcSet="/hero.webp" />
  <img
    src="/hero.jpg"
    srcSet="/hero-480.jpg 480w, /hero-1200.jpg 1200w"
    sizes="(max-width: 600px) 480px, 1200px"
    width={1200}
    height={600}
    alt="Hero"
  />
</picture>`,
      },
      followUp: ['AVIF vs WebP, what are the tradeoffs?', 'What does sizes do in srcset?'],
    },
    {
      id: 'perf-5',
      question: 'How do you analyze and reduce bundle size?',
      short: `I start by measuring. I run a bundle analyzer, like rollup-plugin-visualizer for Vite or webpack-bundle-analyzer, and look for the biggest blocks. Common culprits are a whole library imported for one function, like all of lodash or moment with its locales. I switch to smaller alternatives such as date-fns or dayjs, use named imports so tree shaking works, and split big features with dynamic imports. I also remove unused dependencies and check for duplicate packages. Then I turn on gzip or brotli on the server and set a size budget in CI so it does not creep back.`,
      simple: `Look at what is big, then remove it, replace it with something smaller, or load it later.`,
      example: {
        lang: 'js',
        code: `// bad: pulls in the whole library
import _ from 'lodash'
_.debounce(fn, 300)

// better: only one function
import debounce from 'lodash/debounce'
debounce(fn, 300)`,
      },
      followUp: ['What is tree shaking and when does it fail?', 'What is a performance budget?'],
    },
    {
      id: 'perf-6',
      question: 'How does caching and a CDN help performance?',
      short: `A CDN serves my static files from a server physically close to the user, so latency drops. Caching means the browser does not download the same file twice. For JS, CSS and images with hashed filenames, I set Cache-Control to a long max-age with immutable, because the filename changes when the content changes. For index.html I use no-cache or a short time so users always get the latest version. For API data I use ETag or stale-while-revalidate, and on the client a library like React Query caches responses in memory.`,
      simple: `A CDN keeps copies of my files close to the user. Caching means the browser reuses files it already has.`,
      example: {
        lang: 'js',
        code: `// static hashed assets
Cache-Control: public, max-age=31536000, immutable

// index.html
Cache-Control: no-cache`,
      },
      followUp: ['How do you bust the cache on a new deploy?', 'What is stale-while-revalidate?'],
    },
    {
      id: 'perf-7',
      question: 'How do you use memoization in React (memo, useMemo, useCallback)?',
      short: `I use React.memo to skip re-rendering a child when its props did not change. useMemo caches an expensive calculation, and useCallback keeps a function reference stable so it does not break memo on the child. But I do not wrap everything. Memoization has its own cost, and most renders are cheap. I first profile with React DevTools Profiler, find the slow component, and then memoize that spot. Also, memo only works if the props are stable, so passing a new object or inline function each time defeats it.`,
      simple: `Remember the last result and reuse it if nothing changed. Only do it where it is actually slow.`,
      example: {
        lang: 'tsx',
        code: `const Row = React.memo(function Row({ item, onSelect }: Props) {
  return <li onClick={() => onSelect(item.id)}>{item.name}</li>
})

function List({ items }: { items: Item[] }) {
  const onSelect = useCallback((id: string) => console.log(id), [])
  const sorted = useMemo(() => [...items].sort((a, b) => a.name.localeCompare(b.name)), [items])
  return <ul>{sorted.map(i => <Row key={i.id} item={i} onSelect={onSelect} />)}</ul>
}`,
      },
      followUp: [
        'When can memo make things slower?',
        'Does the React Compiler change this advice?',
      ],
    },
    {
      id: 'perf-8',
      question: 'What is list virtualization and when do you use it?',
      short: `Virtualization means I only render the rows that are visible in the viewport plus a few extra, instead of all of them. If I have 10,000 rows, the DOM only holds maybe 20. That keeps memory low and scrolling smooth. I use libraries like react-window or TanStack Virtual. The tradeoffs are that rows need a known or measured height, and things like find-in-page and some accessibility behavior get harder. I reach for it when a list goes past a few hundred items and pagination is not an option.`,
      simple: `Only draw the items you can see. As you scroll, reuse the same few elements for new items.`,
      example: {
        lang: 'tsx',
        code: `import { FixedSizeList } from 'react-window'

<FixedSizeList height={400} width="100%" itemCount={10000} itemSize={36}>
  {({ index, style }) => <div style={style}>Row {index}</div>}
</FixedSizeList>`,
      },
      followUp: ['How do you handle rows with dynamic heights?', 'Why not just paginate?'],
    },
    {
      id: 'perf-9',
      question: 'What is the difference between debounce and throttle, and where do you use them?',
      short: `Debounce waits until the user stops doing something for a set time and then runs once. I use it for search input, so I call the API after the user stops typing for 300ms. Throttle runs the function at most once every X ms while the event keeps firing. I use it for scroll, resize and mousemove handlers. Both reduce how often expensive work runs. In React I have to make sure the debounced function is stable between renders, using useRef or useMemo, or it resets on every render.`,
      simple: `Debounce waits for a pause, then runs once. Throttle runs regularly, but not too often.`,
      example: {
        lang: 'js',
        code: `function debounce(fn, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}`,
      },
      followUp: ['How would you implement throttle?', 'What is requestAnimationFrame useful for here?'],
    },
    {
      id: 'perf-10',
      question: 'Explain the critical rendering path.',
      short: `The browser downloads HTML and builds the DOM. While doing that it finds CSS and builds the CSSOM. JavaScript can block parsing, and CSS blocks rendering. Then DOM and CSSOM combine into the render tree, then layout figures out sizes and positions, then paint draws pixels, and compositing puts layers together. To speed this up I inline critical CSS, load non-critical CSS later, add defer or async to scripts, and keep the HTML small. The goal is getting the first meaningful pixels on screen as early as possible.`,
      simple: `It is the steps the browser takes from getting HTML to showing pixels. Fewer blocking files means a faster first paint.`,
      example: {
        lang: 'js',
        code: `<link rel="stylesheet" href="critical.css" />
<script src="app.js" defer></script>`,
      },
      followUp: ['Difference between async and defer?', 'Why does CSS block rendering?'],
    },
    {
      id: 'perf-11',
      question: 'What are reflow and repaint, and how do you avoid layout thrashing?',
      short: `Reflow, also called layout, is when the browser recalculates sizes and positions. Repaint is when it redraws pixels without changing the layout, like a color change. Reflow is more expensive, and it can cascade to children. Layout thrashing happens when I read a layout value like offsetHeight and then write a style in a loop, which forces the browser to recalculate again and again. I batch reads first, then writes. For animations I use transform and opacity, because they run on the compositor and skip layout and paint.`,
      simple: `Reflow means the browser re-measures the page. Repaint means it redraws colors. Avoid forcing them over and over.`,
      example: {
        lang: 'js',
        code: `// bad: read, write, read, write
items.forEach(el => { el.style.width = el.offsetWidth + 10 + 'px' })

// better: read all, then write all
const widths = items.map(el => el.offsetWidth)
items.forEach((el, i) => { el.style.width = widths[i] + 10 + 'px' })`,
      },
      followUp: ['Which CSS properties are safe to animate?', 'What does will-change do?'],
    },
    {
      id: 'perf-12',
      question: 'What is the difference between preload, prefetch and preconnect? Also how do you handle fonts?',
      short: `Preload tells the browser to fetch something needed for the current page right now, like the LCP image or a key font. Prefetch fetches something at low priority for a likely next page. Preconnect opens the connection early to another origin, like a CDN or font host. For fonts, I use WOFF2, self-host them, subset to the characters I need, and preload the main one with crossorigin. I set font-display to swap or optional so text shows immediately instead of staying invisible. I also try to match the fallback font metrics to reduce layout shift.`,
      simple: `Preload is for what I need now. Prefetch is for what I might need next. Preconnect warms up a connection. For fonts, show text fast with a fallback.`,
      example: {
        lang: 'js',
        code: `<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preconnect" href="https://cdn.example.com" />
<link rel="prefetch" href="/next-page.js" />

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;
}`,
      },
      followUp: ['Why does preloading a font need crossorigin?', 'What is the downside of too many preloads?'],
    },
    {
      id: 'perf-13',
      question: 'A page is slow. How would you debug it? Which tools do you use?',
      short: `First I check whether it is slow to load or slow to interact, and whether it is slow for everyone or just on mobile. I run Lighthouse for a quick overview and look at the opportunities. Then I open the DevTools Performance panel and record, to see long tasks, layout work and what blocks the main thread. The Network tab shows big files, slow requests and missing caching. For React I use the Profiler to find components that re-render too much. I fix the biggest problem first, measure again, and I try to confirm with real user data, since lab results can differ.`,
      simple: `Measure first, find the biggest slow thing, fix that, and measure again. Do not guess.`,
      followUp: [
        'What is the difference between lab data and field data?',
        'What would you check first if only mobile users complain?',
        'How do you stop regressions after you fix it?',
      ],
    },
  ],
}
