import { createFileRoute, useParams } from '@tanstack/react-router'
import { useConnectSocket } from '~features/connect-socket/hooks/useConnectSocket'
import { useProjectsStore } from '~entities/project/projectStore'
import { useEffect, useState } from 'react'
import type { Project } from '~entities/project/types'

export const Route = createFileRoute('/projects/$projectId')({
  component: RouteComponent
})

function RouteComponent() {
  const { projectId } = useParams({ strict: false })
  const [project, setProject] = useState<Project | null>(null)
  useEffect(() => {
    if (!projectId) return
    const projects = useProjectsStore.getState().projects
    console.log(projects)
    const nowPage = projects.data.find((p) => p.id === Number(projectId)) ?? null
    console.log(nowPage)
    setProject(nowPage)
  }, [projectId])
  useEffect(() => {
    console.log(project)
  }, [project])
  useConnectSocket(project?.id)
  return <div>Hello "/projects/$projectId"!</div>
}
