import { FormInput } from '~shared/ui/FormInput'
import { useModalStore } from '~features/manage-modal/modalStore'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { HostInputs } from '../model/type'
import { hostEnterSchema } from '../model/schema'
import { createProject } from '../api/api'
import { useProjectsStore } from '~entities/project/projectStore'

export function CreateProjectModal() {
  const { close } = useModalStore()
  const { projects, update } = useProjectsStore()
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<HostInputs>({
    resolver: zodResolver(hostEnterSchema),
    mode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<HostInputs> = async (data) => {
    console.log(data)
    try {
      const newProject = await createProject(data.projectTitle, projects.data.length)
      // 생성 후 티켓 발급 받음
      console.log(`프로젝트 생성 성공:`, newProject)
      update(newProject)
      console.log('store projects', useProjectsStore.getState().projects)
      close()
    } catch (err: any) {
      console.log(`프로젝트 생성 실패: ${err}`)
    }
  }

  return (
    <div>
      <button onClick={close}>닫기</button>
      <h2>프로젝트 생성</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="프로젝트 타이틀" error={errors.projectTitle}>
          <input {...register('projectTitle')} placeholder="프로젝트 이름을 입력해주세요" />
        </FormInput>
        <FormInput label="닉네임" error={errors.name}>
          <input {...register('name')} placeholder="표시될 닉네임을 입력해주세요" />
        </FormInput>
        <input type="submit" />
      </form>
    </div>
  )
}
