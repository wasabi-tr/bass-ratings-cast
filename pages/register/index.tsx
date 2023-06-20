import { Auth } from '@/components/base/Auth'
import { Layout } from '@/components/base/Layout'
import { NextPage } from 'next'

const Register: NextPage = () => {
  return (
    <Layout title="新規登録ページ">
      <Auth />
    </Layout>
  )
}

export default Register
