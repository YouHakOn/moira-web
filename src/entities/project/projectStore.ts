import { create } from 'zustand'
import type { ProjectsList, Project } from './types'
import { getProjects } from '~entities/project/api'

interface projectState {
  projects: ProjectsList
  update: (p: Project) => void
  fetchProjects: () => Promise<void>
  clear: () => void
}

export const useProjectsStore = create<projectState>((set, get) => {
  return {
    projects: { msg: '', data: [] },
    update: (p) => {
      const currentProjects = get().projects
      set({
        projects: {
          ...currentProjects,
          data: [...currentProjects.data, p]
        }
      })
    },
    fetchProjects: async () => {
      const result = await getProjects()
      console.log(result)
      set({
        projects: {
          msg: 'success',
          data: result
        }
      })
    },
    clear: () => set({ projects: { msg: '', data: [] } })
  }
})
