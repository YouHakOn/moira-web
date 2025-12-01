import { z } from 'zod'

export const hostEnterSchema = z.object({
  projectTitle: z.string().min(1, '필수입력값입니다'),
  name: z.string().min(1, '필수입력값입니다')
})

export const guestEnterSchema = z.object({
  projectUrl: z.string().min(1, '필수입력값입니다'),
  name: z.string().min(1, '필수입력값입니다')
})
