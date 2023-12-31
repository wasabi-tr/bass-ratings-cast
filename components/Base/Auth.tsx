import { useMutateAuth } from '@/hooks/useMutateAuth'
import { FC, FormEvent, useEffect, useState } from 'react'
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
    errorMessage,
    registered,
  } = useMutateAuth()
  const [isDisabled, setIsDisabled] = useState(true)

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
  useEffect(() => {
    if (email && password) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [email, password, isDisabled])
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      {!registered ? (
        <>
          <h2 className="text-center font-bold text-3xl">LURE CASE</h2>
          <p className="font-bold text-center mt-4 text-primary text-lg">
            {isLogin ? 'ログイン' : '新規会員登録'}
          </p>

          <div className="w-2/4 mt-8 mx-auto bg-white rounded-2xl shadow-sm p-16 sm:w-full sm:py-8 sm:px-4">
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
              {errorMessage && (
                <p className="text-red-600 text-sm">{errorMessage}</p>
              )}
              {isLogin && (
                <div className="mt-2 text-center text-sm">
                  パスワードを忘れた方はこちら
                  <Link
                    href={'/forgot-password'}
                    className="text-primary transition-all font-bold hover:opacity-70"
                  >
                    こちら
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className={`relative flex w-full justify-center rounded-md  py-3 px-4 mt-4 text-sm font-bold text-white transition-all  ${
                  isDisabled ? 'bg-gray-400' : 'bg-primary hover:opacity-70'
                }`}
                disabled={isDisabled}
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
                <Image
                  alt=""
                  src="/icons/googleIcon.svg"
                  width={20}
                  height={20}
                />
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
        </>
      ) : (
        <>
          <h2 className="font-bold">仮登録が完了しました。</h2>
          <p className="mt-4">
            ご指定のメールアドレスに確認メールを送信しました。メール内のリンクをクリックして本登録を完了してください。もし、数分経ってもメールが届かない場合は、迷惑メールフォルダをご確認いただくか、メールアドレスが正しく入力されているかを再確認してください。
          </p>
        </>
      )}
    </div>
  )
}
