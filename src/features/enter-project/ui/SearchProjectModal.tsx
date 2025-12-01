import { FormInput } from '~shared/ui/FormInput'
import { useModalStore } from '~features/manage-modal/modalStore'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { GuestInputs } from '../model/type'
import { getTicket } from '~features/enter-project/api/api'
import { guestEnterSchema } from '../model/schema'

export function SearchProjectModal() {
  const { close } = useModalStore()

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<GuestInputs>({
    resolver: zodResolver(guestEnterSchema),
    mode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<GuestInputs> = async (data) => {
    getTicket(data)
  }

  return (
    <div>
      <div>
        <button onClick={() => close()}>닫기</button>
      </div>
      <h2>프로젝트 찾기</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="프로젝트 url" error={errors.projectUrl}>
          <input {...register('projectUrl')} placeholder="프로젝트 링크를 입력해주세요" />
        </FormInput>
        <FormInput label="닉네임" error={errors.name}>
          <input {...register('name')} placeholder="표시될 닉네임을 입력해주세요" />
        </FormInput>
        <input type="submit" />
      </form>
    </div>
  )
}
