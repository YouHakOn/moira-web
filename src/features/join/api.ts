import type { Inputs, JoinResponse, CreateCodeResponse, CheckCodeResponse } from './types'
import { authInstance } from '~shared/api/instance'

// 회원가입
export const join = async (data: Inputs) => {
  try {
    const res = await authInstance.post<JoinResponse>(`/member/signIn`, {
      email: data.email,
      nickName: data.nickname,
      password: data.password
    }) // 인증요청 성공
    return res.data
  } catch (err: any) {
    throw new Error(err?.message || '회원가입 실패')
  }
}

// 인증코드 생성
export const createCode = async (email: string) => {
  try {
    const res = await authInstance.get<CreateCodeResponse>(`/cert/create/${email}`)
    return res.data
  } catch (err: any) {
    throw new Error(err?.message || '코드 생성 실패')
  }
}

// 코드 인증
export const checkCode = async (email: string, code: string) => {
  try {
    const res = await authInstance.get<CheckCodeResponse>(`/cert/check/${email}/${code}`)
    return res.data
  } catch (err: any) {
    throw new Error(err?.message || '코드 인증 실패')
  }
}
