import { Auth } from '@/components/Auth'
import { Layout } from '@/components/Layout'
import { useMutateAuth } from '@/hooks/useMutateAuth'

const Login = () => {
  return (
    <Layout title="ログインページ">
      <Auth />
    </Layout>
  )
}

export default Login
