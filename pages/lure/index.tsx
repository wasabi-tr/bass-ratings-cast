import Breadcrumb from '@/components/Base/Breadcrumb'
import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import PageTop from '@/components/Base/PageTop'
import Seo from '@/components/Base/Seo'
import { getLures } from '@/features/lure/api/getLures'
import LureItem from '@/features/lure/components/LureItem'
import { LureDetail } from '@/types'
import { GetStaticProps, NextPage } from 'next'

type Props = {
  lures: LureDetail[]
}
const LureArchive: NextPage<Props> = ({ lures }) => {
  const breadcrumbs = [
    { name: 'ホーム', item: '/' },
    { name: 'ルアー一覧', item: '/lure' },
  ]
  return (
    <>
      <Layout>
        <Seo pageTitle="ルアー一覧" />
        <Breadcrumb itemList={breadcrumbs} />
        <Container padding="py-10">
          <ul className="grid gap-4 grid-cols-auto-min-max-33 ">
            {lures?.map((lure) => (
              <LureItem key={lure.id} lure={lure} />
            ))}
          </ul>
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const lures = await getLures()

  return {
    props: {
      lures,
    },
  }
}

export default LureArchive
