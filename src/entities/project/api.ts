import { authInstance } from '~shared/api/instance'
import type { ProjectsRes } from './types'

// 프로젝트 리스트 조회
export const getProjects = async () => {
  try {
    const res = await authInstance.get<ProjectsRes>('enter/list')
    console.log(res.data.msg)
    return res.data.data
  } catch (err) {
    console.log(err)
    return []
  }
}
