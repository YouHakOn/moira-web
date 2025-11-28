import z from 'zod'
import { joinSchema } from './joinSchema'

export type Inputs = z.infer<typeof joinSchema>

export interface JoinResponse {
  msg: string
  data: string
}

export interface CreateCodeResponse {
  msg: string
  data: string
}

export interface CheckCodeResponse {
  mail: string
  data: string
}
