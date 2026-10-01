import type { Topic } from '../types'
import { html } from './html'
import { css } from './css'
import { javascript } from './javascript'
import { typescript } from './typescript'
import { react } from './react'
import { nextjs } from './nextjs'
import { nodeExpress } from './node-express'
import { database } from './database'
import { git } from './git'
import { performance } from './performance'
import { systemDesign } from './system-design'
import { coding } from './coding'

export const topics: Record<string, Topic> = {
  html,
  css,
  javascript,
  typescript,
  react,
  nextjs,
  'node-express': nodeExpress,
  database,
  git,
  performance,
  'system-design': systemDesign,
  coding,
}
