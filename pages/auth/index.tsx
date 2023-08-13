import { Auth } from '@/components/Base/Auth'
import Breadcrumb from '@/components/Base/Breadcrumb'
import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import { NextPage } from 'next'

const Login: NextPage = () => {
  const breadcrumbs = [
    { name: 'ホーム', item: '/' },
    { name: 'ログイン', item: '/login' },
  ]

  return (
    <Layout title="ログインページ">
      <Breadcrumb itemList={breadcrumbs} />
      <Container padding="py-16">
        <Auth />
      </Container>
    </Layout>
  )
}

export default Login
