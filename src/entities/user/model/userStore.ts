import { create } from 'zustand'

interface UserState {
  id: number | null
  isLoggedIn: boolean
  nickName: string | null
  mail: string | null
  imgUrl: string | null
  login: (id: number, userName: string, mail: string, imgUrl?: string|null) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => {
  return {
    // 초기 유저 상태
    id: null,
    isLoggedIn: false,
    nickName: null,
    mail: null,
    imgUrl: null,
    login: (id, nickName, mail, imgUrl) => set({ id, isLoggedIn: true, nickName, mail, imgUrl }),
    logout: () => set({ id: null, isLoggedIn: false, nickName: null, mail: null, imgUrl: null })
  }
})
