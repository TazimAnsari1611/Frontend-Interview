import { Fragment } from 'react'

/** Renders text, highlighting [bracketed placeholders] so unfinished answers stand out. */
export function PlaceholderText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[') && part.endsWith(']') ? (
          <mark key={i} className="rounded bg-amber-200/70 px-1 text-amber-950 dark:bg-amber-400/25 dark:text-amber-100">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
