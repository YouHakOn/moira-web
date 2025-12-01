import { authInstance } from '~shared/api/instance'
import type { ProjectsList } from './types'

// 프로젝트 리스트 조회
export const getProjects = async () => {
  try {
    const res = await authInstance.get<ProjectsList>('/enter/list')
    return res.data.data
  } catch (err: any) {
    console.log(err)
    return []
  }
}
