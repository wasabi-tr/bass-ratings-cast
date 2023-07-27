import Breadcrumb from '@/components/base/Breadcrumb'
import Container from '@/components/base/Container'
import { Layout } from '@/components/base/Layout'
import PageTop from '@/components/base/PageTop'
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
      <Layout title="">
        <PageTop title="ルアー一覧" />
        <Breadcrumb itemList={breadcrumbs} />
        <Container padding="">
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
