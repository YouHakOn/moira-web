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
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4 p-6 border rounded-lg">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          // onClick={() => handleSocialLogin('google')}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Continue with Google
        </button>
      </form>
    </div>
  )
}
