import { useModalStore } from '~features/manage-modal/modalStore'
import { SelectModal } from './SelectModal'
import { CreateProjectModal } from '../../features/enter-project/ui/CreateProjectModal'
import { SearchProjectModal } from '../../features/enter-project/ui/SearchProjectModal'

export default function ModalRoot() {
  const { modal, close } = useModalStore()
  if (!modal) return null
  if (modal)
    return (
      <>
        <div className="fixed inset-0 bg-black/40 z-[1000]" onClick={() => close()}></div>
        <div
          className="fixed left-1/2 top-1/2 z-[1001] -translate-x-1/2 -translate-y-1/2
            bg-white rounded-xl p-6 shadow-lg w-[400px]"
        >
          {modal === 'select' && <SelectModal />}
          {modal === 'create' && <CreateProjectModal />}
          {modal === 'search' && <SearchProjectModal />}
        </div>
      </>
    )
}
