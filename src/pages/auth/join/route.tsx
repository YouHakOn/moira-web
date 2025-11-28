import { createFileRoute } from '@tanstack/react-router'
import JoinForm from '~entities/auth/join/ui/JoinForm'

export const Route = createFileRoute('/auth/join')({
  component: RouteComponent
})

function RouteComponent() {
  return <JoinForm />
}
