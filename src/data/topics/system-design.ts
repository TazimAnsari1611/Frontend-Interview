import type { Topic } from '../types'

export const systemDesign: Topic = {
  id: 'system-design',
  title: 'Frontend System Design',
  blurb: 'How to walk through a frontend design question: requirements, components, data flow, performance, edge cases.',
  questions: [
    {
      id: 'sd-1',
      question: 'How do you approach a frontend system design question?',
      short: `I never jump straight to drawing boxes. First I ask questions to get the requirements: who are the users, what devices, what must it do, what can wait. Then I sketch the main components and how they split. Next I talk about data flow: where state lives, what the API looks like, how data gets fetched and cached. After that I cover performance, like lazy loading and virtualization. Last, I walk through edge cases such as errors, empty states, slow networks, accessibility and offline. I say my tradeoffs out loud, because that is what they are really judging.`,
      simple: `Ask questions first. Then components, then data, then speed, then what can go wrong. Explain why for every choice.`,
      example: {
        text: 'My checklist: 1. Requirements  2. Components  3. Data flow and API  4. Performance  5. Edge cases and a11y.',
      },
      followUp: ['What clarifying questions do you ask first?', 'How do you handle it if the interviewer changes the requirements?'],
    },
    {
      id: 'sd-2',
      question: 'Design an infinite scroll feed (like a social media timeline).',
      short: `Requirements first: the feed loads more posts as you scroll, works on mobile, and stays smooth with thousands of posts. Components are a Feed container, a PostCard, and a sentinel element at the bottom. For data flow I use cursor-based pagination, not page numbers, so new posts do not cause duplicates. An IntersectionObserver on the sentinel triggers the next fetch. For performance I virtualize long lists and lazy load images with fixed aspect ratios. Edge cases are a loading skeleton, an error with retry, end of feed, duplicate posts, and restoring scroll position when the user comes back.`,
      simple: `Load a batch of posts. When the user nears the bottom, load the next batch. Remove far-away posts from the page so it stays fast.`,
      example: {
        lang: 'tsx',
        code: `function useInfinite(load: (cursor?: string) => Promise<{ items: Post[]; next?: string }>) {
  const [items, setItems] = useState<Post[]>([])
  const cursor = useRef<string | undefined>()
  const busy = useRef(false)
  const done = useRef(false)

  const more = useCallback(async () => {
    if (busy.current || done.current) return
    busy.current = true
    const res = await load(cursor.current)
    cursor.current = res.next
    if (!res.next) done.current = true
    setItems(prev => [...prev, ...res.items])
    busy.current = false
  }, [load])

  return { items, more }
}`,
      },
      followUp: ['Why cursor pagination instead of offset?', 'How would you handle new posts arriving at the top?', 'How do you restore scroll position?'],
    },
    {
      id: 'sd-3',
      question: 'Design an autocomplete / typeahead search box.',
      short: `Requirements: show suggestions as the user types, keyboard friendly, fast. Components are an Input, a Dropdown list and an Option item. For data flow, I debounce input by around 300ms, skip empty queries, and cancel the previous request with AbortController so old responses cannot overwrite new ones. I cache results per query in a Map. For performance, I limit results to maybe 8 and keep the response small. Edge cases are no results, errors, arrow keys with Enter and Escape, highlighting the match, and accessibility with role combobox and aria-activedescendant.`,
      simple: `Wait for the user to pause typing, ask the server, show a list. Ignore old answers and cache repeats.`,
      example: {
        lang: 'js',
        code: `let controller
async function search(q) {
  controller?.abort()
  controller = new AbortController()
  try {
    const res = await fetch('/api/search?q=' + encodeURIComponent(q), { signal: controller.signal })
    return await res.json()
  } catch (e) {
    if (e.name !== 'AbortError') throw e
  }
}`,
      },
      followUp: ['What race condition can happen here?', 'How would you handle very slow suggestions?'],
    },
    {
      id: 'sd-4',
      question: 'Design a chat UI (like WhatsApp web or Slack).',
      short: `Requirements: send and receive messages in real time, show history, unread counts, typing and delivery status. Components are a conversation list, a message list, a message input and a message bubble. For data flow I use a WebSocket for live messages and REST for loading older history with cursor pagination upward. I keep messages normalized by id per conversation. Sending is optimistic: I show the message right away with a pending state, then mark it sent or failed. For performance I virtualize the message list. Edge cases are reconnecting with backoff, out-of-order messages, auto scroll only if the user is at the bottom, and offline retry.`,
      simple: `Messages arrive over a live connection. I show my own message instantly and fix it if sending fails. Old messages load when I scroll up.`,
      example: {
        lang: 'js',
        code: `function connect(onMessage, attempt = 0) {
  const ws = new WebSocket('wss://example.com/chat')
  ws.onmessage = e => onMessage(JSON.parse(e.data))
  ws.onclose = () => {
    const wait = Math.min(1000 * 2 ** attempt, 30000)
    setTimeout(() => connect(onMessage, attempt + 1), wait)
  }
}`,
      },
      followUp: ['How do you avoid duplicates after a reconnect?', 'How do you scroll to the bottom without annoying the user?'],
    },
    {
      id: 'sd-5',
      question: 'How would you design a design system or component library?',
      short: `Requirements: consistent UI across teams, easy to use, accessible, and easy to update. I start with design tokens for color, spacing and typography, stored as CSS variables. Then primitive components like Button, Input and Modal, built so they are accessible by default, with keyboard support and ARIA. I use composition, like a Modal with Header and Body parts, and not a hundred props. I document in Storybook, test with unit and visual tests, and publish as a versioned package using semantic versioning. Edge cases are theming, dark mode, tree shaking, and a clear process for breaking changes.`,
      simple: `Shared building blocks with the same look and behavior everywhere. Built accessible, documented, and versioned so teams can trust them.`,
      followUp: ['How do you handle breaking changes?', 'Headless components vs styled components, which do you pick?'],
    },
    {
      id: 'sd-6',
      question: 'Design a dashboard with real-time data.',
      short: `Requirements: many widgets like charts and tables, updating live, and it should not freeze the browser. Components are a layout grid, widget wrappers, and chart or table widgets that each own their data. For data flow I pick the transport by need: WebSocket for two-way, Server-Sent Events for one-way streams, or polling if it is simple. I batch incoming updates and render at most once per animation frame, so a hundred messages a second do not mean a hundred renders. For performance I virtualize tables, downsample chart points, and pause updates when the tab is hidden. Edge cases are lost connection, stale data indicators, and per-widget error states.`,
      simple: `Each widget gets its own live data. I group fast updates together so the page does not redraw too often.`,
      example: {
        lang: 'js',
        code: `let buffer = []
let scheduled = false
function onData(msg) {
  buffer.push(msg)
  if (scheduled) return
  scheduled = true
  requestAnimationFrame(() => {
    applyUpdates(buffer)
    buffer = []
    scheduled = false
  })
}`,
      },
      followUp: ['WebSocket vs SSE vs polling?', 'How do you show that data is stale?'],
    },
    {
      id: 'sd-7',
      question: 'How do you choose a state management approach?',
      short: `I split state by type. Server data, like users or products, goes in React Query or SWR because they handle caching, refetching and loading states. UI state like a modal being open stays local with useState. State shared by a few nearby components I lift up or put in context. For truly global client state, such as the cart or a theme, I pick something light like Zustand or Redux Toolkit if the team needs strict structure. URL state, like filters and page, goes in the query string so it is shareable. I avoid putting everything in one global store, since that adds work and re-renders.`,
      simple: `Use the smallest tool that works. Server data, local state, global state and URL state each have a best home.`,
      followUp: ['When is Context a bad choice?', 'Why would you pick Redux Toolkit over Zustand?'],
    },
    {
      id: 'sd-8',
      question: 'How would you structure the folders of a large frontend app?',
      short: `I group by feature, not by file type. So I have features like auth, cart and orders, and each one has its own components, hooks, api calls, types and tests. A shared folder holds truly reusable things, like the UI kit, utils and the API client. Pages or routes stay thin and just compose features. The rule I follow is that a feature can import from shared, but features should not reach into each other's internals. I add path aliases and lint rules to enforce it. This makes it easy to find code and to delete a feature cleanly.`,
      simple: `Keep everything for one feature together in one folder. Put only the truly shared stuff in a common folder.`,
      example: {
        lang: 'js',
        code: `src/
  app/          // routes, providers
  features/
    auth/       // components, hooks, api, types
    cart/
    orders/
  shared/
    ui/         // Button, Modal
    lib/        // api client, utils`,
      },
      followUp: ['How do you stop features from importing each other?', 'When do you move code to shared?'],
    },
    {
      id: 'sd-9',
      question: 'How do you handle errors and logging in a frontend app?',
      short: `I handle errors at several levels. For API calls, I catch errors in one place, a fetch wrapper or interceptor, and map them to friendly messages. In React, I use Error Boundaries around sections, so one broken widget does not blank the whole page. I also listen to window error and unhandledrejection for anything missed. All of this gets sent to a tool like Sentry with the user's browser, route, release version and source maps, but without sensitive data. For users I show clear messages and a retry button. I also separate expected errors, like a 404 or validation, from real bugs.`,
      simple: `Catch errors close to where they happen, show a friendly message, and send the details to a tracking tool so I can fix them.`,
      example: {
        lang: 'tsx',
        code: `class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: Error) { reportToSentry(error) }
  render() {
    return this.state.failed ? <p>Something went wrong.</p> : this.props.children
  }
}`,
      },
      followUp: ['What errors do Error Boundaries not catch?', 'How do you avoid logging personal data?'],
    },
    {
      id: 'sd-10',
      question: 'How do you make a frontend accessible?',
      short: `I start with semantic HTML, like button, nav, main and label, because it gives keyboard and screen reader support for free. Everything must work with a keyboard, with visible focus styles and a logical tab order. For custom widgets like modals and dropdowns, I add the right ARIA roles, manage focus, trap it inside a modal and return it on close. I keep color contrast at least 4.5 to 1, add alt text, and do not rely on color alone. I test with axe or Lighthouse, then by hand with a keyboard and a screen reader. Dynamic updates use aria-live.`,
      simple: `Use the right HTML tags, make sure the keyboard works everywhere, and give screen readers clear labels.`,
      followUp: ['When should you use ARIA and when not?', 'How do you manage focus in a modal?'],
    },
    {
      id: 'sd-11',
      question: 'How would you design the authentication flow on the frontend?',
      short: `Requirements: login, stay logged in, protect routes, log out safely. The best option for tokens is httpOnly, Secure, SameSite cookies set by the server, since JavaScript cannot read them, which helps against XSS. I use a short-lived access token and a refresh token. When an API returns 401, an interceptor calls refresh once, queues other requests meanwhile, and retries them. On the client, a route guard checks the auth state and redirects to login, then back to the page they wanted. Edge cases are multiple tabs, logout syncing across tabs, expired sessions and CSRF protection.`,
      simple: `Keep the token where scripts cannot steal it. When it expires, quietly get a new one. Block private pages for logged-out users.`,
      example: {
        lang: 'js',
        code: `let refreshing
async function api(url, opts) {
  let res = await fetch(url, { ...opts, credentials: 'include' })
  if (res.status === 401) {
    refreshing ??= fetch('/auth/refresh', { method: 'POST', credentials: 'include' })
      .finally(() => { refreshing = null })
    const r = await refreshing
    if (!r.ok) { window.location.href = '/login'; return res }
    res = await fetch(url, { ...opts, credentials: 'include' })
  }
  return res
}`,
      },
      followUp: ['Why not store the token in localStorage?', 'How do you sync logout across tabs?'],
    },
    {
      id: 'sd-12',
      question: 'What are micro frontends and when would you use them?',
      short: `Micro frontends split a big app into smaller apps that different teams build and deploy on their own, then compose into one page. I would use them only when there are many teams stepping on each other, or when parts need different release schedules or tech. The common way is Module Federation, or loading apps by iframe or web components. The costs are real: shared dependencies, consistent design, routing, communication between apps, and a bigger bundle. For a small or medium team I would rather keep a well organized monorepo with clear feature boundaries.`,
      simple: `Break one huge app into smaller apps owned by different teams. It helps big organizations but adds a lot of complexity.`,
      followUp: ['How do micro frontends share state or talk to each other?', 'How do you keep the UI consistent across them?'],
    },
    {
      id: 'sd-13',
      question: 'How do you cache API data and do optimistic updates? What about i18n?',
      short: `For caching I use React Query or SWR. Each request has a key, data is served from cache right away, and refetched in the background when it is stale. I set staleTime per data type, and invalidate keys after a mutation. For optimistic updates, like a like button, I update the cache first, send the request, and roll back on failure with an error message. For i18n I keep translations in JSON files per locale, load only the current language, and use a library like i18next or react-intl. I use Intl for dates, numbers and plurals, and never hardcode strings. I also plan for RTL languages.`,
      simple: `Keep fetched data in memory so the screen feels instant. Update the screen first and undo if the server says no. Keep all text in language files.`,
      example: {
        lang: 'tsx',
        code: `const qc = useQueryClient()
const like = useMutation({
  mutationFn: (id: string) => api.like(id),
  onMutate: async id => {
    await qc.cancelQueries({ queryKey: ['post', id] })
    const prev = qc.getQueryData<Post>(['post', id])
    qc.setQueryData<Post>(['post', id], p => p && { ...p, liked: true, likes: p.likes + 1 })
    return { prev }
  },
  onError: (_e, id, ctx) => qc.setQueryData(['post', id], ctx?.prev),
  onSettled: (_d, _e, id) => qc.invalidateQueries({ queryKey: ['post', id] }),
})`,
      },
      followUp: ['What is the difference between staleTime and gcTime?', 'How do you handle text that gets longer in other languages?'],
    },
  ],
}
