import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { useUserStore } from '~entities/user/model/userStore'
import { getMyInfo } from '~entities/auth/login/api'

const userStore = useUserStore
// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    userStore,
    getMyInfo
  }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
