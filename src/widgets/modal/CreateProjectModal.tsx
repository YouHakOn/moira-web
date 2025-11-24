import { FormInput } from '~shared/ui/FormInput'
import { useModalStore } from '~entities/modal/model/modalStore'

interface Props {
  error?: string
  title?: string
  onChangeTitle: React.Dispatch<React.SetStateAction<string | undefined>>
  onSubmit: (e: React.FormEvent) => void
}

export function CreateProjectModal({ error, title, onChangeTitle, onSubmit }: Props) {
  const { close } = useModalStore()

  return (
    <div>
      <button onClick={close}>닫기</button>
      <h2>프로젝트 생성</h2>
      <form onSubmit={onSubmit}>
        <FormInput label="프로젝트 타이틀" error={error}>
          <input
            placeholder="프로젝트 이름을 입력해주세요"
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
          />
        </FormInput>
        <input type="submit" />
      </form>
    </div>
  )
}
