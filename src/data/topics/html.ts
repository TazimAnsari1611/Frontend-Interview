import type { Topic } from '../types'

export const html: Topic = {
  id: 'html',
  title: 'HTML',
  blurb: 'Semantics, accessibility, forms, SEO, script loading and browser storage.',
  questions: [
    {
      id: 'html-1',
      question: 'What is semantic HTML and why does it matter?',
      short:
        "Semantic HTML means using tags for what the content actually is, like header, nav, main, article, button, instead of div for everything. I do it because browsers, screen readers and search engines understand the page structure from those tags. It also gives me free behavior, like a button being focusable and clickable with the keyboard. And honestly the code is just easier to read for the next dev.",
      simple:
        "Use the tag that describes the content. A navigation menu goes in nav, a clickable action goes in button. Machines and people using assistive tech then understand your page.",
      example: {
        lang: 'html',
        code: `<header>
  <nav>...</nav>
</header>
<main>
  <article>
    <h1>Title</h1>
    <p>Content</p>
  </article>
</main>
<footer>...</footer>`,
      },
      followUp: [
        'What is wrong with using a div with an onClick as a button?',
        'Difference between section and article?',
      ],
    },
    {
      id: 'html-2',
      question: 'Difference between block, inline and inline-block elements?',
      short:
        "Block elements like div and p start on a new line and take the full width, and I can set width, height, margin and padding on them. Inline elements like span and a sit within the text flow, and width and height don't apply, and vertical margin doesn't push things around. Inline-block is the mix: it flows inline but I can set width and height on it. I reach for it when I want things side by side with a size.",
      simple:
        "Block takes a whole row. Inline sits in the line of text like a word. Inline-block sits in the line like a word but you can give it a size.",
      followUp: ['How would you make a span behave like a block?', 'What is the whitespace gap between inline-block elements?'],
    },
    {
      id: 'html-3',
      question: 'What is the difference between div and span, and when do you use each?',
      short:
        "Both are generic containers with no meaning. A div is block level so I use it for grouping chunks of layout, and a span is inline so I use it to wrap a bit of text, for example to style one word. But I only reach for them when there is no semantic tag that fits, because a section, nav or button says more.",
      simple:
        "Div is a generic box that takes a full row. Span is a generic wrapper inside a line of text. Neither has any meaning on its own.",
      followUp: ['When is a div actually the right choice?'],
    },
    {
      id: 'html-4',
      question: 'How do you make a page accessible? What are ARIA attributes and when do you use them?',
      short:
        "First I use proper semantic tags, labels for inputs, alt text on images, good heading order and enough color contrast, and I make sure everything works with the keyboard with a visible focus. ARIA is for filling gaps when native HTML cannot express something, like aria-expanded on a custom dropdown or aria-live for updates. My rule is: native element first, ARIA only if needed, because bad ARIA is worse than none.",
      simple:
        "Make the page usable for people who use a keyboard or screen reader. Use the right tags, add labels and alt text. ARIA is extra hints for custom widgets that plain HTML cannot describe.",
      example: {
        lang: 'html',
        code: `<button aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" hidden>...</ul>`,
      },
      followUp: ['What does the first rule of ARIA say?', 'How do you test accessibility?', 'What is aria-label vs aria-labelledby?'],
    },
    {
      id: 'html-5',
      question: 'What is the alt attribute on images and what should you write in it?',
      short:
        "Alt is the text alternative for an image. Screen readers read it, and it shows if the image fails to load, and search engines use it too. I write what the image conveys in context, short and natural, without starting with 'image of'. If the image is purely decorative I leave alt empty, alt=\"\", so screen readers skip it.",
      simple:
        "Alt is a text description of the picture for people who cannot see it. Decorative pictures get an empty alt so they are skipped.",
      followUp: ['What happens if you leave the alt attribute out completely?'],
    },
    {
      id: 'html-6',
      question: 'async vs defer on script tags?',
      short:
        "A normal script blocks HTML parsing while it downloads and runs. With async, the script downloads in parallel and runs as soon as it is ready, which can interrupt parsing and the order is not guaranteed. With defer, it downloads in parallel but runs only after the HTML is parsed, in order. I use defer for my app scripts and async for independent stuff like analytics.",
      simple:
        "Async: download alongside, run immediately when ready, any order. Defer: download alongside, run after the page is parsed, in order.",
      example: {
        lang: 'html',
        code: `<script src="app.js" defer></script>
<script src="analytics.js" async></script>`,
      },
      followUp: ['Where do module scripts fit in?', 'Why not just put scripts at the bottom of body?'],
    },
    {
      id: 'html-7',
      question: 'localStorage vs sessionStorage vs cookies?',
      short:
        "localStorage keeps data with no expiry until it is cleared, and it is shared across tabs for the same origin. sessionStorage is the same API but lives only for that tab and is gone when the tab closes. Cookies are tiny, about 4KB, and get sent to the server on every request, and they can be HttpOnly and Secure, so I use them for auth tokens. For storing a theme or UI preference I use localStorage.",
      simple:
        "localStorage stays forever in the browser. sessionStorage disappears when you close the tab. Cookies are small and travel to the server with each request.",
      followUp: ['Is it safe to store a JWT in localStorage?', 'What are HttpOnly and SameSite on cookies?'],
    },
    {
      id: 'html-8',
      question: 'Which meta tags matter in the head of a page?',
      short:
        "The charset meta, usually UTF-8, so text renders properly. The viewport meta, width=device-width, initial-scale=1, which is needed for responsive design on mobile. Then title and meta description for SEO, and Open Graph tags for how links preview when shared. I also add a canonical link when the same content can be reached from multiple URLs.",
      simple:
        "Charset for correct text, viewport for mobile layout, title and description for search results, Open Graph for link previews.",
      example: {
        lang: 'html',
        code: `<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Page title</title>
<meta name="description" content="Short summary" />`,
      },
      followUp: ['What happens on mobile without the viewport tag?'],
    },
    {
      id: 'html-9',
      question: 'How do you do SEO from the HTML side?',
      short:
        "I use one h1 and a proper heading hierarchy, semantic tags, a unique title and meta description per page, descriptive link text, and alt on images. I add structured data like JSON-LD where it helps, a canonical link, and make sure the content is in the HTML the crawler sees. For SPAs that means SSR or pre-rendering, because relying only on client rendering is riskier.",
      simple:
        "Clear headings, good title and description, meaningful links and alt text, and content that is visible in the HTML itself.",
      followUp: ['How does SEO work for a client-side rendered React app?'],
    },
    {
      id: 'html-10',
      question: 'Explain the main form elements and attributes you use, and how validation works.',
      short:
        "I use form with inputs of the right type, like email, number, tel or date, because mobile shows the right keyboard and the browser validates for free. Every input gets a label tied with for and id. Then attributes like required, pattern, min, max, minlength and autocomplete. Browser validation is good for quick feedback, but I always validate again on the server because the client can be bypassed.",
      simple:
        "Pick the right input type, attach a label, add rules like required or pattern. The browser checks it for you, but the server must check again.",
      example: {
        lang: 'html',
        code: `<form>
  <label for="email">Email</label>
  <input id="email" type="email" required autocomplete="email" />
  <button type="submit">Save</button>
</form>`,
      },
      followUp: ['What does novalidate do?', 'How do you style invalid inputs?'],
    },
    {
      id: 'html-11',
      question: 'Why do inputs need labels and how do you connect them?',
      short:
        "A label tells users and screen readers what the input is for. It also makes the label text clickable, which focuses the input, and that is a bigger tap target on mobile. I connect them either with for matching the input id, or by wrapping the input inside the label. A placeholder is not a replacement, since it disappears when you type.",
      simple:
        "The label names the field. Clicking it focuses the input. Link them with for and id.",
      followUp: ['Is placeholder enough as a label?'],
    },
    {
      id: 'html-12',
      question: 'What is the difference between GET and POST in forms?',
      short:
        "GET puts the data in the URL query string, so it is visible, bookmarkable and cached, and I use it for searches and filters. POST sends the data in the request body, so I use it when the action changes something on the server or the data is sensitive or large. Neither is secure by itself, you still need HTTPS.",
      simple:
        "GET is for fetching and puts data in the URL. POST is for sending or changing data and puts it in the body.",
      followUp: ['What is idempotency?'],
    },
    {
      id: 'html-13',
      question: 'What is the difference between id and class, and what are data attributes?',
      short:
        "An id must be unique on the page, and I use it for anchors, label linking and the odd JS hook. A class can be on many elements, and I use it for styling. Data attributes, like data-user-id, let me attach custom values to an element, which I can read in JS through the dataset property or use in CSS selectors.",
      simple:
        "Id is unique, class is reusable, data-* attributes store your own extra info on an element.",
      example: { lang: 'html', code: `<li data-id="42">Item</li>\n// el.dataset.id === '42'` },
      followUp: ['Can two elements share an id and what happens?'],
    },
    {
      id: 'html-14',
      question: 'How do you make images responsive and load them efficiently in HTML?',
      short:
        "I use srcset and sizes so the browser picks the right file for the screen width, and the picture element when I need different formats like WebP or AVIF or art direction. I set width and height to avoid layout shift, and loading=\"lazy\" for images below the fold. The hero image I keep eager so it does not hurt LCP.",
      simple:
        "Give the browser multiple image sizes and let it choose. Lazy-load the ones off screen. Set width and height so the page does not jump.",
      example: {
        lang: 'html',
        code: `<img src="a-800.jpg"
  srcset="a-400.jpg 400w, a-800.jpg 800w"
  sizes="(max-width: 600px) 100vw, 800px"
  width="800" height="450" loading="lazy" alt="..." />`,
      },
      followUp: ['What is the picture element for?'],
    },
    {
      id: 'html-15',
      question: 'What is the difference between HTML and HTML5, and what did HTML5 add?',
      short:
        "HTML5 is just the modern version of the standard. It added semantic tags like header, nav, section, article and footer, native audio and video, canvas and SVG, new input types and form validation, and APIs like localStorage, geolocation, drag and drop, and web workers. It also made the doctype simple, just <!DOCTYPE html>.",
      simple:
        "HTML5 is the newer HTML with semantic tags, video and audio, better forms and browser APIs.",
      followUp: ['Why do we need the doctype?'],
    },
    {
      id: 'html-16',
      question: 'What happens when the browser loads an HTML page (critical rendering path)?',
      short:
        "The browser downloads the HTML and parses it into the DOM. When it finds CSS it builds the CSSOM, and scripts without defer or async pause parsing. DOM and CSSOM combine into the render tree, then it does layout and paint. So CSS in the head blocks rendering, and sync scripts block parsing, which is why I keep CSS small and use defer on scripts.",
      simple:
        "HTML becomes the DOM, CSS becomes the CSSOM, they merge, the browser works out sizes and positions, then draws pixels.",
      followUp: ['Why is CSS render blocking?', 'What is the difference between reflow and repaint?'],
    },
    {
      id: 'html-17',
      question: 'Difference between link rel preload, prefetch and preconnect?',
      short:
        "Preload tells the browser to fetch something needed for the current page right now, like a font or hero image, with high priority. Prefetch is a low priority hint for something the user might need on the next page. Preconnect just opens the connection early, DNS, TCP and TLS, to another origin I know I will call. I use them sparingly because overusing them hurts more than it helps.",
      simple:
        "Preload: need it now. Prefetch: maybe need it later. Preconnect: warm up the connection to a server.",
      example: {
        lang: 'html',
        code: `<link rel="preload" href="/font.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preconnect" href="https://api.example.com" />`,
      },
      followUp: ['Why does preloading fonts need crossorigin?'],
    },
    {
      id: 'html-18',
      question: 'What is the difference between the a tag and button, and when to use each?',
      short:
        "An anchor goes somewhere, it changes the URL or jumps to a section, so I use it for navigation. A button does an action on the page like submitting, opening a modal or toggling something. Getting this right matters for accessibility, since screen readers announce them differently and buttons work with Space and Enter by default. And for external links with target=_blank I add rel=\"noopener noreferrer\".",
      simple:
        "Link for going to another place, button for doing something on this page.",
      followUp: ['Why add rel noopener to target blank links?'],
    },
  ],
}
