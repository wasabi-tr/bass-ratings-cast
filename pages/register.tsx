import { Auth } from '@/components/Auth'
import { Layout } from '@/components/Layout'
import { NextPage } from 'next'

const Register: NextPage = () => {
  return (
    <Layout title="新規登録ページ">
      <Auth />
    </Layout>
  )
}

export default Register
