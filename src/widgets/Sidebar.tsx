import { Link } from '@tanstack/react-router'
import { useModalStore } from '~features/manage-modal/modalStore'
import { useProjectsStore } from '~entities/project/projectStore'
import type { Project } from '~entities/project/types'

export default function Sidebar() {
  const { open } = useModalStore()
  const { projects } = useProjectsStore()

  return (
    <aside>
      <nav>
        <Link to="/">Home</Link>
        {projects.data.map((p: Project) => (
          <Link key={p.id} to="/projects/$projectId" params={{ projectId: `${p.id}` }}>
            {p.title}
          </Link>
        ))}
        <button onClick={() => open('select')}>프로젝트 추가</button>
      </nav>
    </aside>
  )
}
