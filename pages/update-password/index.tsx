import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

const UpdatePassword: NextPage = () => {
  const supabaseClient = useSupabaseClient()
  const [password, setPassword] = useState('')
  const router = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await supabaseClient.auth.updateUser({
        password: password,
      })
      alert('パスワードを更新しました。')
    } catch (error) {
      alert(
        'パスワードの更新に失敗しました。もう一度入力して送信してください。'
      )
    }
    router.replace('/')
  }
  return (
    <Layout title="パスワード更新">
      <Container>
        <div className="h-screen flex  justify-center flex-col">
          <div className="w-1/2 mx-auto">
            <h2 className="font-bold text-center text-lg">
              新しいパスワードを入力して更新ボタンをクリックしてください。
            </h2>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="mt-7">
                  <label htmlFor="password" className="font-bold mb-2 block">
                    新しいパスワード
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
              </div>
              <div className="mt-6 h-11 mx-auto">
                <button type="submit" className="btn-primary text-sm">
                  パスワードを更新する
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default UpdatePassword
