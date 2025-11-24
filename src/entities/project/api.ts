import { authInstance } from '~shared/api/instance'
import type { ProjectsList, CreateProjectRes, EnterProjectRes } from './types'

// 프로젝트 리스트 조회
export const getProjects = async () => {
  try {
    const res = await authInstance.get<ProjectsList>('/enter/list')
    return res.data.data
  } catch (err) {
    console.log(err)
    return []
  }
}

// 프로젝트 생성
export const createProject = async (title: string) => {
  try {
    const projects = await getProjects()
    const id = projects.length
    console.log(id)
    const res = await authInstance.post<CreateProjectRes>('/project/create', {
      id: id,
      title: title
    })
    return {
      id: id,
      title: title,
      url: res.data.msg
    }
  } catch (err: any) {
    const errorMessage = err.response?.data?.msg || err.message || '프로젝트 생성 실패'
    throw new Error(errorMessage)
  }
}

// 프로젝트 참가
// 프로젝트 url 검증
export const enterProject = async (url: string, name: string) => {
  try {
    const res = await authInstance.post<EnterProjectRes>(`/enter/project/${url}`, {
      alias: name
    })
    return res.data.msg
  } catch (err: any) {
    throw new Error(err?.msg || '프로젝트 참가 실패')
  }
}
