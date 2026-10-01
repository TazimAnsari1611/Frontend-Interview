import {
  Atom, Braces, Briefcase, Code2, Database, FileCode2, FolderGit2, Gauge, GitBranch, Globe, Handshake,
  LayoutTemplate, Mic, Network, Palette, Server, Sparkles, User, FileText, type LucideIcon,
} from 'lucide-react'

export type SectionKind = 'myself' | 'experience' | 'projects' | 'resume' | 'topic' | 'hr' | 'mock'
export type Group = 'About me' | 'Technical' | 'Practice'

export interface Section {
  id: string
  title: string
  kind: SectionKind
  group: Group
  icon: LucideIcon
  /** Tailwind hue used for the section accent (hue angle for oklch). */
  hue: number
}

/** Interview flow, in order. */
export const sections: Section[] = [
  { id: 'myself', title: 'Myself', kind: 'myself', group: 'About me', icon: User, hue: 270 },
  { id: 'experience', title: 'Experience', kind: 'experience', group: 'About me', icon: Briefcase, hue: 250 },
  { id: 'projects', title: 'Projects', kind: 'projects', group: 'About me', icon: FolderGit2, hue: 230 },
  { id: 'resume', title: 'Resume / Skills', kind: 'resume', group: 'About me', icon: FileText, hue: 300 },
  { id: 'html', title: 'HTML', kind: 'topic', group: 'Technical', icon: Globe, hue: 40 },
  { id: 'css', title: 'CSS', kind: 'topic', group: 'Technical', icon: Palette, hue: 215 },
  { id: 'javascript', title: 'JavaScript', kind: 'topic', group: 'Technical', icon: Braces, hue: 95 },
  { id: 'typescript', title: 'TypeScript', kind: 'topic', group: 'Technical', icon: FileCode2, hue: 245 },
  { id: 'react', title: 'React', kind: 'topic', group: 'Technical', icon: Atom, hue: 205 },
  { id: 'nextjs', title: 'Next.js', kind: 'topic', group: 'Technical', icon: LayoutTemplate, hue: 285 },
  { id: 'node-express', title: 'Node.js / Express', kind: 'topic', group: 'Technical', icon: Server, hue: 150 },
  { id: 'database', title: 'Database', kind: 'topic', group: 'Technical', icon: Database, hue: 175 },
  { id: 'git', title: 'Git / GitHub', kind: 'topic', group: 'Technical', icon: GitBranch, hue: 25 },
  { id: 'performance', title: 'Performance', kind: 'topic', group: 'Technical', icon: Gauge, hue: 60 },
  { id: 'system-design', title: 'Frontend System Design', kind: 'topic', group: 'Technical', icon: Network, hue: 320 },
  { id: 'coding', title: 'Coding', kind: 'topic', group: 'Technical', icon: Code2, hue: 190 },
  { id: 'hr', title: 'HR', kind: 'hr', group: 'Practice', icon: Handshake, hue: 10 },
  { id: 'mock', title: 'Mock Interview', kind: 'mock', group: 'Practice', icon: Mic, hue: 340 },
]

export const heroIcon = Sparkles
