import { getProjects } from '~entities/project/api'
import { useState, useEffect } from 'react'
import type { Project } from '~entities/project/types'
import { Link } from '@tanstack/react-router'

export default function Sidebar() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects().then((projects) => setProjects(projects))
  }, [])

  return (
    <aside>
      <nav>
        {projects.map((p) => (
          <Link key={p.id} to="/projects/$projectId" params={{ projectId: `${p.id}` }}>
            {p.title}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
