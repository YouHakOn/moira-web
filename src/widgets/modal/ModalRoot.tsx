import { useModalStore } from '~entities/modal/model/modalStore'
import { SelectModal } from './SelectModal'
import { CreateProjectModal } from './CreateProjectModal'
import { SearchProjectModal } from './SearchProjectModal'
import { useCreateProject } from '~features/project/useCreateProject'
import { useSearchProject } from '~features/project/useSearchProject'

export default function ModalRoot() {
  const { modal, close } = useModalStore()
  const { createError, title, setTitle, handleCreateSubmit } = useCreateProject()
  const { searchError, projectUrl, setProjectUrl, handleSearchSubmit } = useSearchProject()
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
          {modal === 'create' && (
            <CreateProjectModal
              error={createError}
              title={title}
              onChangeTitle={setTitle}
              onSubmit={handleCreateSubmit}
            />
          )}
          {modal === 'search' && (
            <SearchProjectModal
              error={searchError}
              url={projectUrl}
              onChangeUrl={setProjectUrl}
              onSubmit={handleSearchSubmit}
            />
          )}
        </div>
      </>
    )
}
