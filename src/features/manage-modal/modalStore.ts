import { create } from 'zustand'

export type modalKind = null | 'select' | 'create' | 'search'

interface modalState {
  modal: modalKind
  open: (m: modalKind) => void
  close: () => void
}

export const useModalStore = create<modalState>((set) => {
  return {
    modal: null,
    open: (m) => set({ modal: m }),
    close: () => set({ modal: null })
  }
})
