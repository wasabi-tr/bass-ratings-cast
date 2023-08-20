import { Auth } from '@/components/Base/Auth'
import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import { NextPage } from 'next'

const Login: NextPage = () => {
  return (
    <Layout>
      <Container>
        <Auth />
      </Container>
    </Layout>
  )
}

export default Login
