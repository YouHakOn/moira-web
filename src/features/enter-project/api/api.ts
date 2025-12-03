import { authInstance } from '~shared/api/instance'
import type { CreateProjectRes, EnterProjectRes } from '../../../entities/project/types'
import type { GuestInputs } from '../model/type'

// 프로젝트 생성
export const createProject = async (projectTitle: string, projectId: number) => {
  try {
    const res = await authInstance.post<CreateProjectRes>('/project/create', {
      id: projectId,
      title: projectTitle
    })
    return {
      id: projectId,
      title: projectTitle,
      url: res.data.msg // 링크 생성
    }
  } catch (err: any) {
    console.log(err)
    const errorMessage = err.response?.data?.msg || err.message || '프로젝트 생성 실패'
    throw new Error(errorMessage)
  }
}

// 프로젝트 참가
// 프로젝트 url 검증 및 티켓 발급
export const getTicket = async ({ projectUrl, name }: GuestInputs) => {
  try {
    const res = await authInstance.post<EnterProjectRes>(`/enter/project/${projectUrl}`, {
      alias: name
    })
    console.log(`프로젝트 검증 성공:`, res)
    return res.data.msg
  } catch (err: any) {
    throw new Error(err?.msg || '프로젝트 참가 실패')
  }
}
