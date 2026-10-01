import type { Topic } from '../types'

export const css: Topic = {
  id: 'css',
  title: 'CSS',
  blurb: 'Box model, specificity, flexbox, grid, positioning, responsive design and more.',
  questions: [
    {
      id: 'css-1',
      question: 'Explain the CSS box model.',
      short:
        "Every element is a box made of content, padding, border and margin, from inside to outside. Width and height by default apply to the content only, so padding and border get added on top. That is why I almost always set box-sizing: border-box, so the width I give includes padding and border and the math stays sane.",
      simple:
        "Each element is a box: content in the middle, then padding, border, and margin outside. border-box makes the width include padding and border.",
      example: { lang: 'css', code: `*, *::before, *::after {\n  box-sizing: border-box;\n}` },
      followUp: ['content-box vs border-box?', 'Does margin count in an element\'s width?'],
    },
    {
      id: 'css-2',
      question: 'How does CSS specificity work?',
      short:
        "When rules conflict, the browser picks the more specific selector. I think of it as a score: inline styles beat ids, ids beat classes, attributes and pseudo-classes, and those beat element selectors. If the specificity is equal, the later rule wins. !important overrides all of it, but I avoid it. I keep selectors flat, mostly single classes, so I never get into specificity wars.",
      simple:
        "More specific selector wins: inline, then id, then class, then tag. Same score means the last one wins.",
      example: { lang: 'css', code: `p { color: red; }        /* 0,0,1 */\n.note { color: blue; }   /* 0,1,0 wins */\n#intro { color: green; } /* 1,0,0 wins over both */` },
      followUp: ['How can you lower specificity with :where()?', 'Does the universal selector add specificity?'],
    },
    {
      id: 'css-3',
      question: 'What are the different values of position and how do they work?',
      short:
        "Static is the default, normal flow. Relative keeps the element in flow but lets me offset it, and it becomes the anchor for absolute children. Absolute takes it out of the flow and positions it relative to the nearest positioned ancestor. Fixed positions it relative to the viewport, so it stays on scroll. Sticky is a mix: it acts relative until a scroll threshold, then sticks like fixed within its parent.",
      simple:
        "Relative: nudge from its own spot. Absolute: place inside the nearest positioned parent. Fixed: pinned to the screen. Sticky: scrolls then sticks.",
      followUp: ['Why does sticky sometimes not work?', 'What if no ancestor is positioned for absolute?'],
    },
    {
      id: 'css-4',
      question: 'How does z-index work and what is a stacking context?',
      short:
        "z-index controls which element is on top, but only on positioned elements, or flex and grid items. The catch is stacking contexts. A new one is created by things like position with z-index, opacity below 1, transform, filter, and isolation: isolate. Inside a context, children are compared only with each other, so a child with z-index 9999 can still sit under an element in another context. When z-index misbehaves, I look for a parent creating a context.",
      simple:
        "z-index decides who is in front. But each stacking context is its own little group, so a huge number inside one group cannot beat another group.",
      followUp: ['What properties create a stacking context?', 'How would you debug a modal appearing behind a header?'],
    },
    {
      id: 'css-5',
      question: 'Flexbox: how does it work and what are the key properties?',
      short:
        "Flexbox lays items out in one dimension, a row or a column. On the container I use display: flex, flex-direction, justify-content for the main axis, align-items for the cross axis, gap, and flex-wrap. On items, flex-grow, flex-shrink and flex-basis, usually via the flex shorthand, control how they share space. I use it for navbars, toolbars, cards in a row and centering.",
      simple:
        "Flex arranges children in a line. justify-content spreads along the line, align-items works across it, and flex: 1 makes an item take leftover space.",
      example: { lang: 'css', code: `.bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}` },
      followUp: ['What does flex: 1 mean?', 'Difference between justify-content and align-items?', 'Why do flex items overflow with long text (min-width: 0)?'],
    },
    {
      id: 'css-6',
      question: 'What is CSS Grid and when do you use it over flexbox?',
      short:
        "Grid is two-dimensional, so it handles rows and columns together. I define columns with grid-template-columns, use fr units, gap, and repeat with auto-fit and minmax for responsive card grids without media queries. My rule is flexbox for one-dimensional content-driven layouts, grid when I am laying out the whole page or a layout where rows and columns must line up.",
      simple:
        "Flex is a single row or column. Grid is rows and columns at once. Use grid for page layouts and galleries.",
      example: { lang: 'css', code: `.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 16px;\n}` },
      followUp: ['auto-fit vs auto-fill?', 'What are grid-template-areas?'],
    },
    {
      id: 'css-7',
      question: 'How do you center a div horizontally and vertically?',
      short:
        "The easiest way today is on the parent: display: grid with place-items: center, or display: flex with justify-content and align-items both center. Parent needs a height. Older way is position absolute with top and left 50% and transform translate(-50%, -50%). For horizontal only, margin: 0 auto on a block with a set width works.",
      simple:
        "Make the parent grid or flex and center the child. That is the shortest way.",
      example: { lang: 'css', code: `.parent {\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n}` },
      followUp: ['How to center text vertically in a single line?'],
    },
    {
      id: 'css-8',
      question: 'How do you build responsive layouts?',
      short:
        "I start mobile first. I add the viewport meta tag, use fluid widths with percentages, flex and grid, relative units like rem, and then media queries at the points where the design actually breaks, not for specific devices. I also use clamp() for fluid font sizes, max-width on images, and container queries when a component should respond to its container instead of the screen.",
      simple:
        "Write for small screens first, let layout flow, and add media queries when it starts to look bad on bigger screens.",
      example: { lang: 'css', code: `.box { padding: 1rem; }\n@media (min-width: 768px) {\n  .box { padding: 2rem; }\n}` },
      followUp: ['min-width vs max-width media queries?', 'What are container queries?'],
    },
    {
      id: 'css-9',
      question: 'Explain CSS units: px, em, rem, %, vw, vh.',
      short:
        "px is a fixed unit. rem is relative to the root font size, so I use it for font sizes and spacing to respect user settings. em is relative to the element's own font size, or the parent's for font-size itself, so it compounds when nested. Percent is relative to the parent, vw and vh are relative to the viewport. On mobile I use dvh instead of vh since the browser bars change the height.",
      simple:
        "px is fixed. rem scales with the page's base font. em scales with the current element. % is of the parent. vw/vh are of the screen.",
      followUp: ['Why use rem over px for fonts?', 'What is dvh?'],
    },
    {
      id: 'css-10',
      question: 'What is the difference between pseudo-classes and pseudo-elements?',
      short:
        "A pseudo-class selects an element in a certain state, like :hover, :focus, :first-child, :nth-child or :disabled, with a single colon. A pseudo-element styles a part of an element or adds generated content, like ::before, ::after, ::placeholder and ::first-line, with double colons. For ::before and ::after I must set the content property or they do not show.",
      simple:
        "Pseudo-class: element in some state. Pseudo-element: a piece of the element or extra content added by CSS.",
      example: { lang: 'css', code: `a:hover { color: red; }\n.tag::before { content: '#'; }` },
      followUp: ['What does :is() or :has() do?'],
    },
    {
      id: 'css-11',
      question: 'What are CSS variables (custom properties) and why use them?',
      short:
        "They are values I define with a double dash, like --brand: #3b82f6, and read with var(--brand). Unlike Sass variables they live in the browser, so they cascade, can be overridden per element, and can be changed from JavaScript at runtime. I use them for design tokens and for theming, like switching light and dark by swapping the values on a data attribute.",
      simple:
        "Reusable values in CSS you can change at runtime. Great for themes.",
      example: { lang: 'css', code: `:root { --brand: #3b82f6; }\n[data-theme='dark'] { --bg: #111; }\n.btn { background: var(--brand, blue); }` },
      followUp: ['How do you change a CSS variable from JS?', 'CSS variables vs Sass variables?'],
    },
    {
      id: 'css-12',
      question: 'Transitions vs animations, and how do you keep animations smooth?',
      short:
        "A transition goes from one state to another when something changes, like on hover, and needs a trigger. A keyframes animation can run on its own, loop and have many steps. For smoothness I animate only transform and opacity because they run on the compositor and avoid layout and paint. Animating width, top or margin causes reflow and gets janky. I also respect prefers-reduced-motion.",
      simple:
        "Transition: A to B on a trigger. Animation: multi-step, can run by itself. Stick to transform and opacity so it stays smooth.",
      example: { lang: 'css', code: `.card { transition: transform .2s ease; }\n.card:hover { transform: translateY(-4px); }\n\n@keyframes spin { to { transform: rotate(360deg); } }` },
      followUp: ['What is will-change?', 'Which properties trigger layout?'],
    },
    {
      id: 'css-13',
      question: 'What is a Block Formatting Context (BFC)?',
      short:
        "A BFC is an isolated layout region where block boxes are laid out independently from the outside. It contains floats, so a parent wraps its floated children, and it stops margin collapsing between the container and its children. I can create one with overflow other than visible, display: flow-root, flex or grid, or position absolute. These days I use display: flow-root as the clean way to clear floats.",
      simple:
        "A BFC is a self-contained box where layout inside does not leak out. It fixes collapsed parents with floats.",
      followUp: ['How does margin collapsing work?', 'What is the clearfix?'],
    },
    {
      id: 'css-14',
      question: 'What is margin collapsing?',
      short:
        "When vertical margins of adjacent block elements touch, they merge into one, and the larger one wins, instead of adding up. It also happens between a parent and its first or last child if nothing separates them, like padding or border. It does not happen with horizontal margins, in flex or grid items, or inside a BFC. If it surprises me I add padding, or make the parent a flow-root.",
      simple:
        "Two touching top and bottom margins become one, the bigger of the two, not the sum.",
      followUp: ['How do you prevent it?'],
    },
    {
      id: 'css-15',
      question: 'How do float and clear work, and do you still use them?',
      short:
        "Float pulls an element to the left or right so text wraps around it, and it takes the element out of normal flow, so the parent can collapse in height. clear stops an element from sitting next to floats. Before flex and grid people built whole layouts with floats. Now I only use float for wrapping text around an image, and use flex or grid for layout.",
      simple:
        "Float pushes an element to a side and text wraps around. Clear says do not sit beside floats.",
      followUp: ['What is the clearfix hack?'],
    },
    {
      id: 'css-16',
      question: 'What is the difference between display none, visibility hidden and opacity 0?',
      short:
        "display: none removes the element completely, no space, and screen readers skip it. visibility: hidden hides it but keeps the space, and it is also skipped by assistive tech. opacity: 0 makes it transparent but it still takes space, can be clicked and focused, and still is read by screen readers. Only opacity can be transitioned smoothly, so I use it for fades together with pointer-events if needed.",
      simple:
        "none: gone. hidden: invisible but space stays. opacity 0: invisible, space stays and still clickable.",
      followUp: ['Which one would you use for an accessible visually hidden label?'],
    },
    {
      id: 'css-17',
      question: 'How do CSS selectors combinators work, and what is the cascade?',
      short:
        "Combinators are descendant with a space, child with >, adjacent sibling with +, and general sibling with ~. The cascade is how the browser decides between conflicting rules: first by origin and importance, then specificity, then source order. Newer cascade layers with @layer let me control priority explicitly, so third party styles can be put below mine without specificity tricks.",
      simple:
        "Combinators pick elements by their relationship. The cascade is the rule order for picking a winner: importance, specificity, then order.",
      example: { lang: 'css', code: `ul > li { }   /* direct children */\nh2 + p { }    /* p right after h2 */` },
      followUp: ['What is inheritance and which properties inherit?'],
    },
    {
      id: 'css-18',
      question: 'What is the difference between em and rem, and what about inheritance?',
      short:
        "rem always points to the root html font size, so it is predictable. em depends on the closest parent font size when used for font-size, so nested em values multiply. Related: some properties inherit by default, like color and font-family, and others like margin, border and padding do not. I can force it with inherit, or reset with initial and unset.",
      simple:
        "rem is always based on the root. em is based on the parent, so it can pile up. Text properties usually inherit, box properties do not.",
      followUp: ['What does unset do?'],
    },
    {
      id: 'css-19',
      question: 'Mobile first vs desktop first, and how do you pick breakpoints?',
      short:
        "Mobile first means the base CSS is for small screens and I add min-width media queries to enhance for larger ones. It ends up with less overriding code and helps performance on phones. For breakpoints, I do not target devices. I resize the browser and add one where the content looks broken or too stretched. Usually a few, like 640, 768, 1024 and 1280.",
      simple:
        "Write small-screen CSS first, then add min-width queries as the screen grows. Choose breakpoints where the design breaks.",
      followUp: ['What are container queries and when are they better?'],
    },
    {
      id: 'css-20',
      question: 'How do you handle text overflow, like truncating with ellipsis?',
      short:
        "For a single line I use overflow hidden, white-space nowrap and text-overflow ellipsis, and the element needs a constrained width. For multiple lines I use line-clamp, with display -webkit-box, -webkit-line-clamp and -webkit-box-orient vertical, which is widely supported now. In flex containers I also need min-width: 0 on the item or it will not shrink.",
      simple:
        "Hide overflow, stop wrapping, add ellipsis for one line. Use line-clamp for several lines.",
      example: { lang: 'css', code: `.one-line {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}` },
      followUp: ['Why does a flex child not truncate?'],
    },
    {
      id: 'css-21',
      question: 'What are CSS preprocessors and how does Sass differ from plain CSS today?',
      short:
        "Sass and Less add features like variables, nesting, mixins and functions, and compile to CSS. These days plain CSS has caught up a lot, with custom properties, native nesting, calc, and color-mix, so I need preprocessors less. I still find Sass handy for mixins, loops and partials in bigger codebases, but for many projects I go with plain CSS, CSS modules or utility classes like Tailwind.",
      simple:
        "Sass is CSS with extra features that compiles to normal CSS. Modern CSS now covers a lot of that natively.",
      followUp: ['What are CSS Modules?', 'Tailwind vs writing custom CSS?'],
    },
    {
      id: 'css-22',
      question: 'How do you structure and scale CSS in a big project?',
      short:
        "I keep a consistent naming approach, like BEM, or use CSS Modules or utility classes so styles are scoped and do not leak. Design tokens go in CSS variables for colors, spacing and typography. I keep specificity low, avoid deep nesting and !important, and put shared pieces in reusable components. Also a CSS reset or normalize at the start, and linting with stylelint to keep things consistent.",
      simple:
        "Scope styles, name them consistently, keep specificity low, and store colors and spacing as variables.",
      example: { lang: 'css', code: `.card { }\n.card__title { }\n.card--featured { }` },
      followUp: ['What is BEM?', 'How do you avoid unused CSS?'],
    },
  ],
}
