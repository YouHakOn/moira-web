import { z } from 'zod'

// TODO: 각 입력란 제한사항 추가
export const joinSchema = z
  .object({
    email: z.string().email('이메일이 유효하지 않습니다'),
    code: z.string().min(1, '인증코드를 입력해주세요'),
    nickname: z.string().min(1, '닉네임을 입력해주세요'),
    password: z.string().min(1, '비밀번호를 입력해주세요'),
    confirmPassword: z.string().min(1, '비밀번호를 한 번 더 입력해주세요')
  })
  .refine((val) => val.password === val.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다'
  })
