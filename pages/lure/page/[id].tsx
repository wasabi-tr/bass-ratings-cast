import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { LureDetail, Rating, Review } from '@/types'
import { Layout } from '@/components/Base/Layout'
import ReviewList from '@/features/review/components/ReviewList'
import getReviews from '@/features/review/api/getReviews'
import { getLureIds } from '@/features/lure/api/getLureId'
import Chart from '@/features/chart/components/Chart'
import { averageRating } from '@/features/review/hooks/averageRating'
import { Stars } from '@/components/Elements/Stars'
import Image from 'next/image'
import Heading from '@/components/Elements/Heading'
import Container from '@/components/Base/Container'
import Link from 'next/link'
import { useUser } from '@supabase/auth-helpers-react'
import Breadcrumb from '@/components/Base/Breadcrumb'
import Seo from '@/components/Base/Seo'
import { getLures } from '@/features/lure/api/getLures'
import { LURES_PER_PAGE } from '@/const'
import { getLuresByPage } from '@/features/lure/api/getLuresByPage'
import LureItem from '@/features/lure/components/LureItem'
import Pagination from '@/components/Elements/Pagination'

type Props = {
  lures: LureDetail[]
  totalCount: number
  currentCount: number
}
const LuresByPage: NextPage<Props> = ({ lures, totalCount, currentCount }) => {
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
          <ul className="grid gap-4 grid-cols-2 sm:grid-cols-1 ">
            {lures?.map((lure) => (
              <LureItem key={lure.id} lure={lure} />
            ))}
          </ul>
          <div className="mt-6">
            <Pagination
              slug="lure"
              totalCount={totalCount}
              currentCount={currentCount}
            />
          </div>
        </Container>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const lures = await getLures()

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

  const paths = range(1, Math.ceil(lures.length / LURES_PER_PAGE)).map(
    (id) => ({ params: { id: id.toString() } })
  )
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params!.id
  const start = (Number(id) - 1) * LURES_PER_PAGE
  const end = start + LURES_PER_PAGE
  const lures = await getLuresByPage(start, end)
  const allLures = await getLures()
  const totalCount = allLures.length

  const id_number = Number(id)
  const currentCount =
    id_number >= 0 && id_number <= totalCount ? id_number : null

  return {
    props: { lures, totalCount, currentCount },
  }
}

export default LuresByPage
