import { useEffect, useState } from 'react'
import { Menu, Mic, Moon, Sun, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { PersonalList } from '@/components/personal-list'
import { TechList } from '@/components/tech-list'
import { MockInterview } from '@/components/mock-interview'
import { experiences, hr, myself, profile, projects, resumeSkills } from '@/data/profile'
import { sections, type Group, type Section } from '@/data/sections'
import { topics } from '@/data/topics'

function readHash() {
  const id = window.location.hash.slice(1)
  return sections.some((s) => s.id === id) ? id : sections[0].id
}

function safeGet(key: string) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function SectionBody({ section }: { section: Section }) {
  switch (section.kind) {
    case 'myself':
      return <PersonalList items={myself} />
    case 'experience':
      return (
        <div className="space-y-5">
          {experiences.map((e) => (
            <div key={e.id} className="space-y-3">
              <div>
                <h3 className="font-semibold">{e.role} at {e.company}</h3>
                <p className="text-sm text-muted-foreground">{e.period}</p>
              </div>
              <PersonalList items={e.questions} />
            </div>
          ))}
        </div>
      )
    case 'projects':
      return (
        <div className="space-y-5">
          {projects.map((p) => (
            <div key={p.id} className="space-y-3">
              <div className="space-y-1.5">
                <h3 className="font-semibold">{p.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>
              <PersonalList items={p.questions} />
            </div>
          ))}
        </div>
      )
    case 'resume':
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
          <PersonalList items={resumeSkills} />
        </div>
      )
    case 'hr':
      return <PersonalList items={hr} />
    case 'mock':
      return <MockInterview />
    case 'topic':
      return <TechList topic={topics[section.id]} />
  }
}

function countOf(section: Section) {
  switch (section.kind) {
    case 'myself': return myself.length
    case 'experience': return experiences.reduce((n, e) => n + e.questions.length, 0)
    case 'projects': return projects.reduce((n, p) => n + p.questions.length, 0)
    case 'resume': return resumeSkills.length
    case 'hr': return hr.length
    case 'mock': return null
    case 'topic': return topics[section.id]?.questions.length ?? 0
  }
}

const GROUPS: Group[] = ['About me', 'Technical', 'Practice']

function blurb(section: Section) {
  switch (section.kind) {
    case 'myself':
      return 'Short and natural. Edit src/data/profile.ts so these match your resume.'
    case 'experience':
      return '2-3 questions per role. Fill in the highlighted placeholders with your real work.'
    case 'projects':
      return '2-3 questions per project. Say it like you are explaining it to a friend.'
    case 'resume':
      return 'Questions about the skills you list on your resume.'
    case 'hr':
      return 'Common HR questions. Keep them honest and positive.'
    case 'mock':
      return 'A natural interview from "Tell me about yourself" into technical questions. Answer out loud first.'
    case 'topic':
      return topics[section.id]?.blurb ?? ''
  }
}

export default function App() {
  const [active, setActive] = useState(readHash)
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(() => {
    const saved = safeGet('theme')
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const onHash = () => setActive(readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      /* storage unavailable, theme just won't persist */
    }
  }, [dark])

  const go = (id: string) => {
    window.location.hash = id
    setOpen(false)
    window.scrollTo({ top: 0 })
  }

  const index = sections.findIndex((s) => s.id === active)
  const section = sections[index]
  const prev = sections[index - 1]
  const next = sections[index + 1]

  const nav = (
    <nav aria-label="Sections" className="space-y-4">
      {GROUPS.map((g) => (
        <div key={g}>
          <p className="mb-1 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{g}</p>
          <div className="space-y-0.5">
            {sections.map((s, i) =>
              s.group !== g ? null : (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  aria-current={s.id === active ? 'page' : undefined}
                  style={{ '--sec': `oklch(0.62 0.17 ${s.hue})` } as React.CSSProperties}
                  className={cn(
                    'group flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors hover:bg-muted',
                    s.id === active && 'bg-card font-medium shadow-sm ring-1 ring-[var(--sec)]/40',
                  )}
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-md bg-[var(--sec)]/15 text-[var(--sec)]">
                    <s.icon className="size-3.5" />
                  </span>
                  <span className="flex-1 truncate">{s.title}</span>
                  <span className="text-[10px] tabular-nums text-muted-foreground">{i + 1}</span>
                </button>
              ),
            )}
          </div>
        </div>
      ))}
    </nav>
  )

  const count = countOf(section)
  return (
    <div className="min-h-screen" style={{ '--sec': `oklch(0.62 0.17 ${section.hue})` } as React.CSSProperties}>
      <header className="sticky top-0 z-20 flex h-12 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
        <div className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Mic className="size-4" />
        </div>
        <h1 className="font-semibold">Frontend Interview Practice</h1>
        <span className="hidden rounded-full bg-accent px-2.5 py-0.5 text-xs text-primary sm:inline">{profile.name}</span>
        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setDark((d) => !d)} aria-label="Toggle dark mode">
          {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>
      </header>

      <div className="mx-auto flex max-w-[88rem]">
        <aside
          className={cn(
            'fixed inset-x-0 bottom-0 top-12 z-10 overflow-y-auto bg-background p-3 lg:sticky lg:block lg:h-[calc(100vh-3rem)] lg:w-56 lg:shrink-0 lg:bg-transparent',
            open ? 'block' : 'hidden',
          )}
        >
          {nav}
        </aside>

        <main className="min-w-0 flex-1 px-3 py-4 sm:px-5 lg:pl-2">
          <section
            className="relative mb-4 overflow-hidden rounded-2xl border p-5 text-white"
            style={{ background: `linear-gradient(120deg, oklch(0.5 0.19 ${section.hue}), oklch(0.42 0.2 ${section.hue + 40}))` }}
          >
            <section.icon className="absolute -right-3 -top-3 size-32 rotate-12 opacity-15" aria-hidden />
            <div className="relative flex items-center gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/20">
                <section.icon className="size-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-white/70">
                  Section {index + 1} of {sections.length}
                  {count !== null && ` · ${count} questions`}
                </p>
                <h2 className="text-2xl font-bold leading-tight tracking-tight">{section.title}</h2>
              </div>
            </div>
            <p className="relative mt-2 max-w-2xl text-sm text-white/85">{blurb(section)}</p>
          </section>

          <div className="max-w-5xl"><SectionBody key={section.id} section={section} /></div>

          <div className="mt-6 flex justify-between gap-2">
            {prev ? (
              <Button variant="outline" onClick={() => go(prev.id)}>
                ← {prev.title}
              </Button>
            ) : (
              <span />
            )}
            {next && (
              <Button variant="outline" onClick={() => go(next.id)}>
                {next.title} →
              </Button>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
