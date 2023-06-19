import { Auth } from '@/components/Auth'
import { Layout } from '@/components/Layout'
import { NextPage } from 'next'

const Login: NextPage = () => {
  return (
    <Layout title="ログインページ">
      <Auth />
    </Layout>
  )
}

export default Login
