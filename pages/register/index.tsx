import { Auth } from '@/components/Base/Auth'
import { Layout } from '@/components/Base/Layout'
import { NextPage } from 'next'

const Register: NextPage = () => {
  return (
    <Layout>
      <Auth />
    </Layout>
  )
}

export default Register
