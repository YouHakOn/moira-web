import { useState } from 'react'
import { createProject } from '~entities/project/api'
import { useModalStore } from '~entities/modal/model/modalStore'
import { useProjectsStore } from '~entities/project/model/projectStore'

export function useCreateProject() {
  const [error, setError] = useState<string | undefined>('')
  const [title, setTitle] = useState<string | undefined>('')
  const { close } = useModalStore()
  const { update } = useProjectsStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) {
      setError('필수입력 값입니다')
      return
    }
    setError('')
    try {
      const newProject = await createProject(title) // id, title, url
      // 프로젝트 리스트 업데이트
      update(newProject)
      close()
    } catch (err: any) {
      setError(err.message || '프로젝트 생성에 실패했습니다')
      console.log(err)
    }
  }

  return {
    createError: error,
    handleCreateSubmit: handleSubmit,
    title,
    setTitle
  }
}
