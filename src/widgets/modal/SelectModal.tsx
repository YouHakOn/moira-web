import { useModalStore } from '~entities/modal/model/modalStore'

export function SelectModal() {
  const { open, close } = useModalStore()
  return (
    <div>
      <div>
        <button onClick={() => close()}>닫기</button>
      </div>
      <button onClick={() => open('create')}>프로젝트 생성</button>
      <button onClick={() => open('search')}>프로젝트 찾기</button>
    </div>
  )
}
