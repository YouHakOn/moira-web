import { createFileRoute, useRouter } from '@tanstack/react-router'
import LoginForm from '~entities/auth/login/ui/LoginForm'

export const Route = createFileRoute('/auth/login')({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || '/'
  }),
  component: LoginComponent
})

function LoginComponent() {
  const router = useRouter()
  const { redirect } = Route.useSearch()

  const handleRedirect = () => router.history.push(redirect)

  return <LoginForm redirect={handleRedirect} />
}
