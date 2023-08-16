import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import { supabase } from '@/lib/supabaseClient'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import { FormEvent, useState } from 'react'

const ForgotPassword: NextPage = () => {
  const supabaseClient = useSupabaseClient()
  const [email, setEmail] = useState('')
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_API_URL}/update-password`,
      })
      alert('入力されたメールアドレスにメールを送信しました。')
    } catch (error) {
      alert(
        'メールの送信に失敗しました。もう一度メールアドレスを入力して送信してください。'
      )
    }
  }
  return (
    <Layout title="パスワードを忘れた方">
      <Container>
        <div className="h-screen flex  justify-center flex-col">
          <div className="w-1/2 mx-auto">
            <h2 className="font-bold text-center text-lg">
              パスワード再設定申請
            </h2>
            <p className="text-left mt-6">
              ご指定のメールアドレス宛にパスワード再設定ようの認証コードが送られます。
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
                <button type="submit" className="btn-primary text-sm">
                  メールを送信する
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default ForgotPassword
