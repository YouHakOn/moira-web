import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { type RouterContext } from '~app/router'
import Sidebar from '~widgets/Sidebar'

// find method to fix this
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent
})

function RootComponent() {
  return (
    <React.Fragment>
      <Sidebar />
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  )
}
