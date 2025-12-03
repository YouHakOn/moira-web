import { useState } from 'react'
import { useUserStore } from '~entities/user/userStore'
import { getLogin, getMyInfo } from '~features/login/api'

export default function LoginForm({ redirect }: { redirect: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useUserStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const res = await getLogin(email, password)
      // localStorage에 토큰 설정
      const authHeader = res.headers['authorization']
      const token = authHeader?.split(' ')[1]
      localStorage.setItem('accessToken', token)
      await updateMyInfo()
      redirect()
    } catch (err: any) {
      console.log(err)
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  // userInfo(nickname, mail, imgUrl) 업뎃
  const updateMyInfo = async () => {
    try {
      const res = await getMyInfo()
      const { id, mail, nickname } = res
      login(id, nickname, mail)
      return
    } catch (err) {
      console.log(err)
    }
  }

  /* 소셜 로그인
    const handleSocialLogin = async (provider: 'google' | 'kakao' | 'naver') => {
      try {
        const res = await authInstance.get(`/member/oauth2/authorization/jso878729@gmail.com`)
        const token = res.headers['authorization']
        localStorage.setItem('accessToken', token)
      } catch (err) {
        console.log(err)
      }
    }
    */

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg border p-6">
        <h1 className="text-center text-2xl font-bold">Sign In</h1>

        {error && (
          <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          // onClick={() => handleSocialLogin('google')}
          className="w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Continue with Google
        </button>
      </form>
    </div>
  )
}
