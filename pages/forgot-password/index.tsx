import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import Seo from '@/components/Base/Seo'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

const ForgotPassword: NextPage = () => {
  const supabaseClient = useSupabaseClient()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if (email) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    console.log(isDisabled)
  }, [email, isDisabled])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_API_URL}/update-password`,
      })
      setSent(true)
    } catch (error) {
      alert(
        'メールの送信に失敗しました。もう一度メールアドレスを入力して送信してください。'
      )
    }
  }
  return (
    <Layout>
      <Seo pageTitle="パスワード再設定申請" />
      <Container>
        <div className="h-screen flex  justify-center flex-col">
          <div className="w-1/2 mx-auto">
            <h2 className="font-bold text-center text-lg">
              パスワード再設定申請
            </h2>
            {!sent ? (
              <>
                <p className="text-left mt-6">
                  ご指定のメールアドレス宛にパスワード再設定用の認証コードが送られます。
                </p>
                <p>
                  メールアドレス側でドメイン設定を行っている場合は事前に「」から、メールを受信できるように変更をお願いいたします。
                </p>
                <form onSubmit={handleSubmit} className="mt-6">
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
                  <div className="mt-6 h-11 mx-auto">
                    <button
                      type="submit"
                      className={`relative flex w-full justify-center rounded-md  py-3 px-4 mt-4 text-sm font-bold text-white transition-all  ${
                        isDisabled
                          ? 'bg-gray-400'
                          : 'bg-primary hover:opacity-70'
                      }`}
                    >
                      メールを送信する
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <p className="text-left mt-6">
                  ご指定のメールアドレス宛にパスワード再設定用の認証コードを送信しました。
                </p>
                <p className="text-left">
                  そちらをクリックして、パスワードの再設定をしてください。
                </p>
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

export default ForgotPassword
