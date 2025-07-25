import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { queryClient } from '~shared/queryClient'

// Create a new router instance
const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultStructuralSharing: true,

  context: {
    queryClient
  },
  defaultPreload: "intent", // preload when hovering over link
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function Router() {
  return <RouterProvider router={router} />
}

export default Router
