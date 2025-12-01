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
    formState: { errors }
  } = useForm<GuestInputs>({
    resolver: zodResolver(guestEnterSchema),
    mode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<GuestInputs> = async (data) => {
    try {
      const res = getTicket(data)
      console.log(`프로젝트 검증 성공: ${res}`)
    } catch (err: any) {
      console.log(`프로젝트 검증 실패: ${err.message}`)
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => close()}>닫기</button>
      </div>
      <h2>프로젝트 찾기</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="프로젝트 url" error={errors.projectUrl}>
          <input placeholder="프로젝트 링크를 입력해주세요" />
        </FormInput>
        <FormInput label="닉네임" error={errors.name}>
          <input placeholder="표시될 닉네임을 입력해주세요" />
        </FormInput>
        <input type="submit" />
      </form>
    </div>
  )
}
