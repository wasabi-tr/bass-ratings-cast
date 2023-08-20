import { useMutateAuth } from '@/hooks/useMutateAuth'
import { FC, FormEvent, useState } from 'react'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'

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
    googleSignInMutation,
  } = useMutateAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    } else {
      registerMutation.mutate()
    }
  }
  const handleChange = () => {
    setIsLogin(!isLogin)
  }
  const googleSignIn = async () => {
    googleSignInMutation.mutate()
  }

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h2 className="text-center font-bold text-3xl">LURE CASE</h2>
      <p className="font-bold text-center mt-4 text-primary text-lg">
        {isLogin ? 'ログイン' : '新規会員登録'}
      </p>

      <div className="w-2/4 mt-8 mx-auto bg-white rounded-2xl shadow-sm p-16">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="font-bold mb-2 block">
              メールアドレス
            </label>
            <input
              id="email"
              type="text"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-primary focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="mt-7">
            <label htmlFor="password" className="font-bold mb-2 block">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-primary focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <div className="mt-2 text-center text-sm">
            パスワードを忘れた方はこちら
            <Link
              href={'/forgot-password'}
              className="text-primary transition-all font-bold hover:opacity-70"
            >
              こちら
            </Link>
          </div>

          <button
            type="submit"
            className="relative flex w-full justify-center rounded-md bg-primary py-3 px-4 mt-4 text-sm font-bold text-white transition-all hover:opacity-70"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
              <CheckBadgeIcon className="h-5 w-5" />
            </span>
            {isLogin ? 'ログインする' : '新規会員登録する'}
          </button>
        </form>
        <button
          className="relative flex w-full justify-center rounded-md py-3 px-4 mt-4 text-sm font-bold transition-all hover:opacity-70 border border-gray-500"
          onClick={googleSignIn}
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
            <Image alt="" src="/icons/googleIcon.svg" width={20} height={20} />
          </span>
          Googleアカウントで{isLogin ? 'ログイン' : '新規会員登録'}
        </button>
        {isLogin ? (
          <div className="mt-4 text-center text-sm">
            アカウントをお持ちでない方はこちらから
            <button
              onClick={handleChange}
              className="text-primary transition-all font-bold hover:opacity-70"
            >
              新規登録
            </button>
            してください
          </div>
        ) : (
          <div className="mt-4 text-center text-sm">
            アカウントをお持ちの方はこちらから
            <button
              onClick={handleChange}
              className="text-primary transition-all font-bold hover:opacity-70"
            >
              ログイン
            </button>
            してください
          </div>
        )}
      </div>
    </div>
  )
}
