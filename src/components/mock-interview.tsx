import { useMemo, useState } from 'react'
import { ArrowRight, Eye, EyeOff, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlaceholderText } from '@/components/placeholder-text'
import { TechAnswer } from '@/components/tech-list'
import { experiences, myself, projects } from '@/data/profile'
import { topics } from '@/data/topics'
import type { TechQ } from '@/data/types'

type Step =
  | { kind: 'personal'; lead?: string; question: string; answer: string }
  | { kind: 'tech'; lead?: string; question: string; q: TechQ; topic: string }

function pick<T>(arr: T[], n: number): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, n)
}

/** How many technical questions to ask per topic, in the order an interviewer would move through them. */
const TECH_PLAN: { id: string; count: number; lead: string }[] = [
  { id: 'javascript', count: 4, lead: "Okay, let's talk a little about JavaScript." },
  { id: 'react', count: 4, lead: "Alright, let's move to React." },
  { id: 'typescript', count: 2, lead: 'Let me ask a couple of things about TypeScript.' },
  { id: 'nextjs', count: 2, lead: "Since you've worked with Next.js, a few questions on that." },
  { id: 'css', count: 2, lead: "Let's switch to CSS for a moment." },
  { id: 'coding', count: 1, lead: "Last one. Let's do a small coding problem." },
]

function buildSteps(): Step[] {
  const exp = experiences[0]
  const proj = projects[0]
  const steps: Step[] = [
    { kind: 'personal', question: 'Tell me about yourself.', answer: myself[0].answer },
    { kind: 'personal', question: 'Can you walk me through your experience?', answer: myself[1].answer },
  ]
  if (exp) {
    steps.push({
      kind: 'personal',
      question: 'Can you tell me about your current role?',
      answer: exp.questions[0].answer,
    })
  }
  if (proj) {
    steps.push(
      {
        kind: 'personal',
        question: `I see you worked on ${proj.name}. Can you tell me about it?`,
        answer: proj.questions[0].answer,
      },
      { kind: 'personal', question: 'What technologies did you use?', answer: proj.questions[1].answer },
      {
        kind: 'personal',
        question: 'Why did you choose React for that project?',
        answer:
          'I chose React because it lets me split the screen into reusable components and update the UI easily when data changes. [Add the real reason you picked it for this project.]',
      },
      {
        kind: 'personal',
        question: 'What was the main challenge you faced while building it?',
        answer: proj.questions[2].answer,
      },
    )
  }
  for (const plan of TECH_PLAN) {
    const topic = topics[plan.id]
    if (!topic) continue
    pick(topic.questions, plan.count).forEach((q, i) =>
      steps.push({ kind: 'tech', lead: i === 0 ? plan.lead : undefined, question: q.question, q, topic: topic.title }),
    )
  }
  return steps
}

export function MockInterview() {
  const [steps, setSteps] = useState<Step[]>(() => buildSteps())
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const done = index >= steps.length
  const step = steps[index]
  const progress = useMemo(() => Math.round((Math.min(index, steps.length) / steps.length) * 100), [index, steps.length])

  const restart = () => {
    setSteps(buildSteps())
    setIndex(0)
    setRevealed(false)
  }
  const next = () => {
    setIndex((i) => i + 1)
    setRevealed(false)
  }

  if (done) {
    return (
      <Card className="space-y-3 p-6 text-center">
        <h3 className="text-lg font-semibold">That's the end of the interview.</h3>
        <p className="text-sm text-muted-foreground">
          Run it again for a fresh set of technical questions. Try answering out loud before you reveal the answer.
        </p>
        <Button onClick={restart} className="mx-auto">
          <RotateCcw className="size-4" /> Start again
        </Button>
      </Card>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-[var(--sec)] transition-all" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {index + 1} / {steps.length}
        </span>
        <Button variant="ghost" size="sm" onClick={restart}>
          <RotateCcw className="size-3.5" /> Restart
        </Button>
      </div>

      <Card className="q-card space-y-3 p-5">
        <div className="flex items-center gap-2">
          <Badge>Interviewer</Badge>
          {step.kind === 'tech' && <Badge className="bg-muted text-muted-foreground">{step.topic}</Badge>}
        </div>
        {step.lead && <p className="text-muted-foreground">{step.lead}</p>}
        <p className="text-lg font-medium leading-snug">{step.question}</p>

        <div className="flex flex-wrap gap-2 pt-1">
          <Button variant="outline" onClick={() => setRevealed((r) => !r)}>
            {revealed ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            {revealed ? 'Hide answer' : 'Show sample answer'}
          </Button>
          <Button onClick={next}>
            {index === steps.length - 1 ? 'Finish' : 'Next question'} <ArrowRight className="size-4" />
          </Button>
        </div>
      </Card>

      {revealed && (
        <Card className="q-card p-5">
          {step.kind === 'personal' ? (
            <p className="leading-relaxed">
              <PlaceholderText text={step.answer} />
            </p>
          ) : (
            <TechAnswer q={step.q} />
          )}
        </Card>
      )}
    </div>
  )
}
