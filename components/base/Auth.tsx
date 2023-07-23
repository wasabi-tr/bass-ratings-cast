import { useMutateAuth } from '@/hooks/useMutateAuth'
import { FC, FormEvent, useEffect, useState } from 'react'
import { CheckBadgeIcon, ShieldCheckIcon } from '@heroicons/react/24/solid'
import { supabase } from '@/lib/supabaseClient'

export const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState(true)

  const {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
    logoutMutation,
  } = useMutateAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    } else {
      console.log('register')
      registerMutation.mutate()
    }
  }
  const handleChange = () => {
    setIsLogin(!isLogin)
  }

  const logout = async () => {
    logoutMutation.mutate()
  }
  return (
    <>
      <ShieldCheckIcon className="mb-8 h-12 w-12 text-blue-500" />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>

        <button
          type="submit"
          className="relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <CheckBadgeIcon className="h-5 w-5" />
          </span>
          {isLogin ? 'ログインする' : '登録する'}
        </button>
      </form>
      <button onClick={logout}>ログアウト</button>
      <div className="mt-4">
        アカウントをお持ちでない方はこちらから
        <button
          onClick={handleChange}
          className="text-red-600 hover:opacity-70"
        >
          新規登録
        </button>
        してください
      </div>
    </>
  )
}
