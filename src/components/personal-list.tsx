import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PlaceholderText } from '@/components/placeholder-text'
import type { PersonalQ } from '@/data/types'

export function PersonalList({ items }: { items: PersonalQ[] }) {
  return (
    <Accordion type="multiple" className="space-y-2">
      {items.map((q) => (
        <AccordionItem key={q.id} value={q.id}>
          <AccordionTrigger>{q.question}</AccordionTrigger>
          <AccordionContent>
            <p className="leading-relaxed">
              <PlaceholderText text={q.answer} />
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
