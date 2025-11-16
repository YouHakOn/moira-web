import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authInstance } from '~shared/api/instance'
import { FormInput } from '~shared/ui/FormInput'
import { z } from 'zod'
import { useState } from 'react'

export const Route = createFileRoute('/auth/join')({
  component: RouteComponent
})

// TODO: 각 입력란 제한사항 추가
const joinSchema = z
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

type Inputs = z.infer<typeof joinSchema>

interface CreateCodeResponse {
  msg: string
  data: string
}

interface CheckCodeResponse {
  mail: string
  data: string
}

function RouteComponent() {
  const [isCreateCode, setIsCreateCode] = useState<boolean>(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    watch,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(joinSchema),
    mode: 'onSubmit' // submit 시 유효성 검사
  })

  // TODO: 전체 회원가입 데이터 post
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(data)
      const res = await authInstance.post<typeof data>(`/member/signIn`, {
        email: watch('email'),
        nickName: watch('nickname'),
        password: watch('password')
      }) // 인증요청 성공
      router.navigate({
        to: 'auth/join/success'
      })
      console.log(`회원가입 성공: ${res.data}`)
    } catch (err: any) {
      console.log(`회원가입 실패: ${err.message}`)
    }
  }

  const createCode = async () => {
    const isValid = await trigger('email')
    const emailInput = encodeURIComponent(watch('email'))
    if (!isValid) return
    // 유효성 검사 통과
    try {
      const res = await authInstance.get<CreateCodeResponse>(`/cert/create/${emailInput}`) // 인증요청 성공
      setIsCreateCode(true) // 인증번호 확인란 활성화
      console.log(`생성 성공: ${res.data}`)
    } catch (err: any) {
      console.log(`생성 실패: ${err.message}`) // 인증요청 실패
      setError('email', {
        type: 'server',
        message: '인증요청에 실패했습니다'
      })
    }
  }

  // 이메일 인증이 안 이뤄졌을 시엔 비활성화
  const checkCode = async () => {
    const emailInput = encodeURIComponent(watch('email'))
    const codeInput = encodeURIComponent(watch('code'))
    try {
      const res = await authInstance.get<CheckCodeResponse>(
        `/cert/check/${emailInput}/${codeInput}`
      )
      setIsCheckCode(true)
      console.log(`인증 성공: ${res.data}`)
    } catch (err: any) {
      console.log(`인증 실패: ${err}`)
      setError('code', {
        type: 'server',
        message: '인증에 실패했습니다'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput label="이메일" error={errors.email}>
        <input {...register('email')} placeholder="이메일을 입력해주세요" />
        <button type="button" onClick={createCode}>
          인증요청
        </button>
        {isCreateCode && (
          <p className="mt-2 text-sm text-green-500">인증요청 메일이 전송되었습니다</p>
        )}
      </FormInput>
      <fieldset disabled={!isCreateCode}>
        <FormInput label="인증번호" error={errors.code}>
          <input {...register('code')} placeholder="인증번호를 입력해주세요" />
          <button type="button" onClick={checkCode}>
            확인
          </button>
          {isCreateCode && (
            <p className="mt-2 text-sm text-green-500">인증번호 확인이 완료되었습니다</p>
          )}
        </FormInput>
      </fieldset>
      <FormInput label="닉네임" error={errors.nickname}>
        <input {...register('nickname')} placeholder="다른 회원에게 표시되는 이름이에요" />
      </FormInput>
      <FormInput label="비밀번호" error={errors.password}>
        <input {...register('password')} placeholder="비밀번호를 입력해주세요" />
      </FormInput>
      <FormInput label="" error={errors.confirmPassword}>
        <input {...register('confirmPassword')} placeholder="비밀번호를 한 번 더 입력해주세요" />
      </FormInput>
      <input type="submit" />
    </form>
  )
}
