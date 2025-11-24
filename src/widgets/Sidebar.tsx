import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { useModalStore } from '~entities/modal/model/modalStore'
import { useProjectsStore } from '~entities/project/model/projectStore'
import { useUserStore } from '~entities/user/model/userStore'

export default function Sidebar() {
  const { open } = useModalStore()
  const { projects } = useProjectsStore()

  return (
    <aside>
      <nav>
        <Link to="/">Home</Link>
        {projects.data.map((p) => (
          <Link key={p.id} to="/projects/$projectId" params={{ projectId: `${p.id}` }}>
            {p.title}
          </Link>
        ))}
        <button onClick={() => open('select')}>프로젝트 추가</button>
      </nav>
    </aside>
  )
}
