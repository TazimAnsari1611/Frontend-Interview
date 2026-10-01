import type { PersonalQ } from './types'

/**
 * EDIT THIS FILE with your real resume details.
 * Anything written in [square brackets] shows up highlighted on the site so you can spot
 * what still needs your real information. Nothing here is invented: if it is not in your
 * resume yet, it is a placeholder.
 */

export const profile = {
  name: 'Tazim Ansari',
  role: 'Software Developer (mainly frontend)',
  // Only what you told me: React, Next.js, JavaScript, TypeScript, plus some backend + databases.
  skills: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Backend', 'Databases'],
}

export const myself: PersonalQ[] = [
  {
    id: 'me-1',
    question: 'Tell me about yourself.',
    answer:
      "Hi, I'm Tazim Ansari. I'm a software developer with experience mainly in frontend development. I've worked with technologies like React, Next.js, JavaScript and TypeScript, and I've also worked with backend technologies and databases. I've worked on a few projects where I was involved in building the frontend and connecting it with APIs. Right now, I'm mainly focusing on improving my frontend skills and preparing for my next opportunity.",
  },
  {
    id: 'me-2',
    question: 'Can you walk me through your resume?',
    answer:
      "Sure. I'll start with my current or most recent role at [Company Name], where I worked as [Your Role]. Before that, I [Add your previous role or education here]. Along the way I've built projects like [Project 1] and [Project 2], mostly using React and Next.js. After that I can go deeper into whichever part you want to talk about.",
  },
  {
    id: 'me-3',
    question: 'What are your main technical skills?',
    answer:
      "My strongest area is frontend. I work mostly with React, Next.js, JavaScript and TypeScript, and I'm comfortable with HTML and CSS. I've also worked with backend technologies and databases, so I can connect the frontend to APIs and understand what's happening on the other side. [Add any other tools from your resume, like Tailwind, Git, or a specific database.]",
  },
  {
    id: 'me-4',
    question: 'What are you currently working on or improving?',
    answer:
      "Right now I'm focusing on getting stronger in frontend, mainly React performance, TypeScript and how Next.js handles rendering. I'm also practicing explaining my projects and solving problems out loud, because I want to be clear when I work with a team. [Add anything specific you are learning right now.]",
  },
]

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  questions: PersonalQ[]
}

/** Duplicate the object below for every company/role on your resume. */
export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: '[Company Name]',
    role: '[Your Role]',
    period: '[Start - End]',
    questions: [
      {
        id: 'exp-1-q1',
        question: 'Can you tell me about your role and what you worked on?',
        answer:
          "Sure. I worked at [Company Name] as [Your Role]. My main work was [Add what you actually worked on, from your resume]. I mostly worked on the frontend side and connected it with APIs. [Add anything else you were responsible for.]",
      },
      {
        id: 'exp-1-q2',
        question: 'What technologies did you use in your work?',
        answer:
          "I mainly used React, Next.js, JavaScript and TypeScript. [Add the exact tools from your resume for this role, like state management, styling, API or database tools.] I chose or used them because [Add the real reason].",
      },
      {
        id: 'exp-1-q3',
        question: 'What was one challenging problem you worked on?',
        answer: '[Add the real challenge you faced in this role, what you did, and what you learned.]',
      },
    ],
  },
]

export interface Project {
  id: string
  name: string
  stack: string[]
  questions: PersonalQ[]
}

/** Duplicate the object below for every project on your resume. */
export const projects: Project[] = [
  {
    id: 'proj-1',
    name: '[Project Name]',
    stack: ['React', '[Other tech from your resume]'],
    questions: [
      {
        id: 'proj-1-q1',
        question: 'Can you tell me about this project?',
        answer:
          "Sure. This project is basically a [simple explanation of what it does]. I built it using React and [actual technologies from your resume]. The main idea was to [actual purpose]. I worked mainly on [what you built, like the UI and API integration]. One thing I learned was [Add what you really learned].",
      },
      {
        id: 'proj-1-q2',
        question: 'What was your role in this project and what technologies did you use?',
        answer:
          "I worked on [your part of the project]. I used React for the UI because it let me split the screen into reusable components. [Add the rest of the stack and why you chose each one.]",
      },
      {
        id: 'proj-1-q3',
        question: 'What was the main challenge you faced while building it?',
        answer: '[Add the real challenge you faced while working on this project, how you solved it, and what you learned.]',
      },
    ],
  },
]

export const resumeSkills: PersonalQ[] = [
  {
    id: 'rs-1',
    question: 'Which skill on your resume are you most confident in?',
    answer:
      "I'm most confident in React and JavaScript, because that's what I've used the most. I know how to break a UI into components, manage state, and connect it to APIs. [Add a real example from your work.]",
  },
  {
    id: 'rs-2',
    question: 'Which skill on your resume are you still learning?',
    answer:
      "I'm still getting better at [Add the real skill, for example advanced TypeScript or performance tuning]. I try to learn it by building small things and reading how other people solve the same problem.",
  },
  {
    id: 'rs-3',
    question: 'You have listed backend and database skills. How much have you actually used them?',
    answer:
      "I've worked with backend technologies and databases, mainly to support the frontend I was building. [Add exactly what you built: which backend, which database, and what you did with it.] I'd say frontend is my main strength and backend is my supporting skill.",
  },
]

export const hr: PersonalQ[] = [
  {
    id: 'hr-1',
    question: 'Why do you want to join our company?',
    answer:
      "From what I've seen, [Add something real about the company, like its product or tech]. I want to work on [what interests you], and I think my frontend experience can help the team. [Research the company and add one specific reason.]",
  },
  {
    id: 'hr-2',
    question: 'Why are you looking for a new opportunity?',
    answer:
      "I'm looking for a role where I can keep growing as a frontend developer and take on more responsibility. [Add your real reason, and keep it positive. Don't speak badly about your current or previous company.]",
  },
  {
    id: 'hr-3',
    question: 'What are your strengths?',
    answer:
      "I'm good at turning designs into clean, reusable components, and I enjoy connecting the UI to APIs. I also like to keep learning, so I pick up new tools fairly quickly. [Add one real example that shows this.]",
  },
  {
    id: 'hr-4',
    question: 'What is your weakness?',
    answer:
      "[Add a real weakness.] For example, I sometimes spend too long polishing small details. I've been handling it by setting a time limit and shipping first, then improving after feedback.",
  },
  {
    id: 'hr-11',
    question: 'Do you have any questions for us?',
    answer:
      'Yes. What does a typical week look like for the frontend team? How do you handle code reviews? And what would you expect from me in the first three months?',
  },
]
