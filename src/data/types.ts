export interface PersonalQ {
  id: string
  question: string
  /** First person, spoken style. Anything in [square brackets] is a placeholder to fill in. */
  answer: string
}

export interface TechQ {
  id: string
  question: string
  /** 2-5 sentences, said out loud in an interview. */
  short: string
  /** Same idea in plain, easy words. */
  simple: string
  /** Optional small example. `code` is shown in a code block. */
  example?: { text?: string; code?: string; lang?: string }
  /** 1-3 likely follow-up questions. */
  followUp: string[]
}

export interface Topic {
  id: string
  title: string
  blurb: string
  questions: TechQ[]
}
