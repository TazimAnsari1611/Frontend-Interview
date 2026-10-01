import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { TechQ, Topic } from '@/data/types'

function Label({ children }: { children: React.ReactNode }) {
  return <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">{children}</h4>
}

export function TechAnswer({ q }: { q: TechQ }) {
  return (
    <div className="space-y-3">
      <div>
        <Label>Short Interview Answer</Label>
        <p className="leading-relaxed">{q.short}</p>
      </div>
      <div>
        <Label>Simple Explanation</Label>
        <p className="leading-relaxed text-muted-foreground">{q.simple}</p>
      </div>
      {q.example && (
        <div>
          <Label>Example</Label>
          {q.example.text && <p className="mb-2 leading-relaxed text-muted-foreground">{q.example.text}</p>}
          {q.example.code && (
            <pre className="overflow-x-auto rounded-lg bg-[var(--code-bg)] p-3 text-xs leading-relaxed text-[var(--code-fg)]">
              <code>{q.example.code}</code>
            </pre>
          )}
        </div>
      )}
      {q.followUp.length > 0 && (
        <div>
          <Label>Follow-up</Label>
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            {q.followUp.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export function TechList({ topic }: { topic: Topic }) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const t = query.trim().toLowerCase()
    return t ? topic.questions.filter((q) => q.question.toLowerCase().includes(t)) : topic.questions
  }, [topic, query])

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${topic.questions.length} questions`}
          aria-label="Search questions"
          className="h-9 w-full rounded-md border bg-card pl-9 pr-3 text-sm outline-none focus-visible:outline-2 focus-visible:outline-primary"
        />
      </div>
      <Accordion type="multiple" className="space-y-2">
        {filtered.map((q, i) => (
          <AccordionItem key={q.id} value={q.id}>
            <AccordionTrigger>
              <span>
                <span className="mr-2 text-muted-foreground">{i + 1}.</span>
                {q.question}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <TechAnswer q={q} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {filtered.length === 0 && <p className="text-sm text-muted-foreground">No questions match "{query}".</p>}
    </div>
  )
}
