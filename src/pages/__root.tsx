import * as React from 'react'
import { useEffect } from 'react'
import { Outlet, createRootRouteWithContext, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Sidebar from '~widgets/Sidebar'
import ModalRoot from '~widgets/modal/ModalRoot'

import type { StoreApi } from 'zustand'
import { useUserStore, type UserState } from '~entities/user/userStore'
import { useProjectsStore } from '~entities/project/projectStore'

interface MyRouterContext {
  userStore: StoreApi<UserState>
  getMyInfo: () => Promise<any>
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context, location }) => {
    const { userStore, getMyInfo } = context

    const token = localStorage.getItem('accessToken')

    // 1. 토큰 없음 -> /auth/login으로 이동
    if (!token) {
      if (!location.pathname.startsWith('/auth')) {
        throw redirect({ to: '/auth/login', search: { redirect: location.href } })
      }
      return
    }
    // 2. 토큰은 있는데 userStore.isLoggedIn이 false -> 자동 로그인 시도
    const state = userStore.getState()
    if (!state.isLoggedIn) {
      try {
        const res = await getMyInfo()
        const { id, mail, nickname } = res
        userStore.getState().login(id, nickname, mail) // 전역상태 로그인으로 업데이트
      } catch (err) {
        console.log(`자동 로그인 실패: ${err}`)
        localStorage.removeItem('accessToken')
        userStore.getState().logout()
        throw redirect({ to: '/auth/login', search: { redirect: location.href } })
      }
    }
    // 3. 로그인된 상태에서 /auth 페이지 접근 → 홈으로 보내기
    if (state.isLoggedIn && location.pathname.startsWith('/auth')) {
      throw redirect({ to: '/', replace: true })
    }
  },
  component: RootComponent
})

function RootComponent() {
  const { isLoggedIn } = useUserStore()
  const { projects, fetchProjects } = useProjectsStore()
  useEffect(() => {
    if (isLoggedIn) {
      fetchProjects() // 유저의 프로젝트 리스트 가져오기
      console.log(projects.data)
    }
  }, [isLoggedIn, fetchProjects])

  return (
    <React.Fragment>
      <ModalRoot />
      <Sidebar />
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  )
}
