import { FormInput } from '~shared/ui/FormInput'
import { useModalStore } from '~entities/modal/model/modalStore'

interface Props {
  error?: string
  url?: string
  onChangeUrl: React.Dispatch<React.SetStateAction<string | undefined>>
  onSubmit: (e: React.FormEvent) => void
}

export function SearchProjectModal({ error, url, onChangeUrl, onSubmit }: Props) {
  const { close } = useModalStore()

  return (
    <div>
      <div>
        <button onClick={() => close()}>닫기</button>
      </div>
      <h2>프로젝트 찾기</h2>
      <form>
        <FormInput label="프로젝트 url" error={error}>
          <input
            placeholder="프로젝트 링크를 입력해주세요"
            value={url}
            onChange={(e) => onChangeUrl(e.target.value)}
          />
        </FormInput>
        <input type="submit" onSubmit={onSubmit} />
      </form>
    </div>
  )
}
