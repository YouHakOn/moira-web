import { authInstance } from '~shared/api/instance'
import type { MyInfo } from './types'
import type { AxiosResponse } from 'axios'

export const getLogin = async (email: string, password: string) => {
  try {
    const res: AxiosResponse = await authInstance.post('/member/login', {
      mail: email,
      password: password
    })
    return res
  } catch (err: any) {
    throw new Error(err?.message || '로그인 실패')
  }
}

export const getMyInfo = async () => {
  try {
    const res = await authInstance.get<MyInfo>('/member/myInfo')
    return res.data
  } catch (err: any) {
    throw new Error(err?.message || '사용자 정보 업데이트 실패')
  }
}
