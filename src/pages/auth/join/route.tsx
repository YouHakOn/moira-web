import { createFileRoute } from '@tanstack/react-router'
import JoinForm from '~features/join/ui'

export const Route = createFileRoute('/auth/join')({
  component: RouteComponent
})

function RouteComponent() {
  return <JoinForm />
}
