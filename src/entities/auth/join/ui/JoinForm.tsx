import { useRouter } from '@tanstack/react-router'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from '~shared/ui/FormInput'
import { useState } from 'react'
import { joinSchema } from '~entities/auth/join/joinSchema'
import type { Inputs } from '~entities/auth/join/types'
import { join, checkCode, createCode } from '~entities/auth/join/api'

export default function JoinForm() {
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
      const res = await join(data)
      router.navigate({
        to: '/auth/join/success'
      })
      console.log(`회원가입 성공: ${res}`)
    } catch (err: any) {
      console.log(`회원가입 실패: ${err.message}`)
    }
  }

  const onRequestCode = async () => {
    const isValid = await trigger('email')
    const emailInput = encodeURIComponent(watch('email'))
    if (!isValid) return
    // 유효성 검사 통과
    try {
      const res = await createCode(emailInput)
      setIsCreateCode(true) // 인증번호 확인란 활성화
      console.log(`생성 성공: ${res}`)
    } catch (err: any) {
      console.log(`생성 실패: ${err.message}`) // 인증요청 실패
      setError('email', {
        type: 'server',
        message: '인증코드 생성에 실패했습니다'
      })
    }
  }

  // 이메일 인증이 안 이뤄졌을 시엔 비활성화
  const onCheckCode = async () => {
    const emailInput = encodeURIComponent(watch('email'))
    const codeInput = encodeURIComponent(watch('code'))
    try {
      const res = await checkCode(emailInput, codeInput)
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
      <FormInput label="이메일" error={errors.email?.message}>
        <input {...register('email')} placeholder="이메일을 입력해주세요" />
        <button type="button" onClick={onRequestCode}>
          인증요청
        </button>
        {isCreateCode && (
          <p className="mt-2 text-sm text-green-500">인증요청 메일이 전송되었습니다</p>
        )}
      </FormInput>
      <fieldset disabled={!isCreateCode}>
        <FormInput label="인증번호" error={errors.code?.message}>
          <input {...register('code')} placeholder="인증번호를 입력해주세요" />
          <button type="button" onClick={onCheckCode}>
            확인
          </button>
          {isCreateCode && (
            <p className="mt-2 text-sm text-green-500">인증번호 확인이 완료되었습니다</p>
          )}
        </FormInput>
      </fieldset>
      <FormInput label="닉네임" error={errors.nickname?.message}>
        <input {...register('nickname')} placeholder="다른 회원에게 표시되는 이름이에요" />
      </FormInput>
      <FormInput label="비밀번호" error={errors.password?.message}>
        <input {...register('password')} placeholder="비밀번호를 입력해주세요" />
      </FormInput>
      <FormInput label="" error={errors.confirmPassword?.message}>
        <input {...register('confirmPassword')} placeholder="비밀번호를 한 번 더 입력해주세요" />
      </FormInput>
      <input type="submit" />
    </form>
  )
}
