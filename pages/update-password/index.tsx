import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'

const UpdatePassword: NextPage = () => {
  const supabaseClient = useSupabaseClient()
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [sent, setSent] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if (password) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [password, isDisabled])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await supabaseClient.auth.updateUser({
        password: password,
      })
      setSent(true)
    } catch (error) {
      alert(
        'パスワードの更新に失敗しました。もう一度入力して送信してください。'
      )
    }
  }
  return (
    <Layout>
      <Container>
        <button onClick={() => setSent(true)}>rr</button>
        <div className="h-screen flex  justify-center flex-col">
          <div className="w-1/2 mx-auto">
            {!sent ? (
              <>
                <h2 className="font-bold text-center text-lg">
                  新しいパスワードを入力して更新ボタンをクリックしてください。
                </h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="mt-7">
                      <input
                        id="password"
                        type="password"
                        required
                        className="w-full rounded border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-primary focus:outline-none"
                        placeholder="新しいパスワード"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-6 h-11 mx-auto">
                    <button
                      type="submit"
                      className={`relative flex w-full justify-center rounded-md  py-3 px-4 mt-4 text-sm font-bold text-white transition-all  ${
                        isDisabled
                          ? 'bg-gray-400'
                          : 'bg-primary hover:opacity-70'
                      }`}
                    >
                      パスワードを更新する
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="font-bold text-center text-lg">
                  新しいパスワードを設定しました。
                </h2>
                <div className="flex justify-center mt-8 w-80 h-16 mx-auto sm:w-full">
                  <Link href={'/auth'} className="btn-primary">
                    ログインページに戻る
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default UpdatePassword
