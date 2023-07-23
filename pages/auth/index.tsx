import { Auth } from '@/components/base/Auth'
import Container from '@/components/base/Container'
import { Layout } from '@/components/base/Layout'
import { NextPage } from 'next'

const Login: NextPage = () => {
  return (
    <Layout title="ログインページ">
      <Container padding="py-16">
        <Auth />
      </Container>
    </Layout>
  )
}

export default Login
