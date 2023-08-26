import Breadcrumb from '@/components/Base/Breadcrumb'
import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import Seo from '@/components/Base/Seo'
import { NextPage } from 'next'
import Link from 'next/link'

const Custom404: NextPage = () => {
  const breadcrumbs = [
    { name: 'ホーム', item: '/' },
    { name: '404', item: '/search' },
  ]
  return (
    <Layout>
      <Seo pageTitle="404 NOT FOUND" />
      <Breadcrumb itemList={breadcrumbs} />
      <section>
        <Container>
          <div className="py-28 flex flex-col justify-center items-center">
            <h1 className="text-center font-bold text-4xl ">404</h1>
            <p className="text-center mt-4 sm:text-left">
              お探しのページが見つかりません。TOPまたはメニューからお探しください。
            </p>
            <div className="flex justify-center mt-8 w-80 h-16 mx-auto sm:w-full">
              <Link href={'/'} className="btn-primary">
                TOPページへ
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  )
}

export default Custom404
