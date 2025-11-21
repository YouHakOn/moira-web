export interface Project {
  id: number
  title: string
}

export interface ProjectsRes {
  msg: string
  data: Project[]
}
