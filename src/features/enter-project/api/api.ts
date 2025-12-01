import { authInstance } from '~shared/api/instance'
import type { CreateProjectRes, EnterProjectRes } from '../../../entities/project/types'
import { getProjects } from '~entities/project/api'
import type { GuestInputs } from '../model/type'

// 프로젝트 생성
export const createProject = async (projectTitle: string) => {
  try {
    const projects = await getProjects()
    const id = projects.length
    const res = await authInstance.post<CreateProjectRes>('/project/create', {
      id: id,
      title: projectTitle
    })
    return {
      id: id,
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
// 프로젝트 url 검증  티켓 발급
export const getTicket = async ({ projectUrl, name }: GuestInputs) => {
  try {
    const res = await authInstance.post<EnterProjectRes>(`/enter/project/${projectUrl}`, {
      alias: name
    })
    return res.data.msg
  } catch (err: any) {
    console.log(err)
    throw new Error(err?.msg || '프로젝트 참가 실패')
  }
}
