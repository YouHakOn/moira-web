import { useState } from 'react'
import { enterProject } from '~entities/project/api'
import { useModalStore } from '~entities/modal/model/modalStore'

export function useSearchProject() {
  const [error, setError] = useState<string | undefined>('')
  const [projectUrl, setProjectUrl] = useState<string | undefined>('')
  const { close } = useModalStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectUrl) {
      setError('필수입력 값입니다')
      return
    } else {
      const url = encodeURIComponent(projectUrl)
      setError('')
      // TODO: name 추가
      enterProject(url, 'name').then((res) => console.log(res))
      close()
    }
  }

  return {
    searchError: error,
    projectUrl,
    setProjectUrl,
    handleSearchSubmit: handleSubmit
  }
}
