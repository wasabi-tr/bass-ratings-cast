import { Auth } from '@/components/Auth'
import { Layout } from '@/components/Layout'
import { useMutateAuth } from '@/hooks/useMutateAuth'

const Register = () => {
  return (
    <Layout title="新規登録ページ">
      <Auth />
    </Layout>
  )
}

export default Register
