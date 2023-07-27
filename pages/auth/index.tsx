import { Auth } from '@/components/base/Auth'
import Breadcrumb from '@/components/base/Breadcrumb'
import Container from '@/components/base/Container'
import { Layout } from '@/components/base/Layout'
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
