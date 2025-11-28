export interface Project {
  id: number
  title: string
  url: string
}

export interface ProjectsList {
  msg: string
  data: Project[]
}

export interface CreateProjectRes {
  msg: string
  data: string
}

export interface EnterProjectRes {
  msg: string
  data: string
}
