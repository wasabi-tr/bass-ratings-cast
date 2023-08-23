import { Auth } from '@/components/Base/Auth'
import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import Seo from '@/components/Base/Seo'
import { NextPage } from 'next'

const Login: NextPage = () => {
  return (
    <Layout>
      <Container>
        <Seo pageTitle="ログイン" />

        <Auth />
      </Container>
    </Layout>
  )
}

export default Login
