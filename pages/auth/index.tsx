import { Auth } from '@/components/base/Auth'
import { Layout } from '@/components/base/Layout'
import { NextPage } from 'next'

const Login: NextPage = () => {
  return (
    <Layout title="ログインページ">
      <Auth />
    </Layout>
  )
}

export default Login
