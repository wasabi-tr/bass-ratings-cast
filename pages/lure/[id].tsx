import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Lure, Rating, Review } from '@/types'
import { getLureById } from '../../features/lure/api/getLureById'
import { Layout } from '@/components/base/Layout'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/router'
import ReviewList from '@/features/review/components/ReviewList'
import getReviews from '@/features/review/api/getReviews'
import { getLureIds } from '@/features/lure/api/getLureId'
import Chart from '@/features/lure/components/Chart'
import { averageRating } from '@/features/review/hooks/averageRating'
type Props = {
  lure: Lure
  reviews: Review[]
  averageRatings: Rating
}

const LureDetail: NextPage<Props> = ({ lure, reviews, averageRatings }) => {
  // console.log(lure)
  // console.log(reviews)
  console.log(averageRatings)

  const update = useStore((state) => state.updateReviewedLureId)
  const router = useRouter()
  const handleClick = () => {
    update(lure.id)
    router.push(`/review/${lure.id}`)
  }

  return (
    <Layout title={lure.name}>
      <h2>{lure.name}</h2>
      <ReviewList reviews={reviews} />
      <div className="">
        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          onClick={handleClick}
        >
          口コミを投稿する
        </button>
        <Chart
          lureData={{
            name: lure.name,
            ...averageRatings,
          }}
        />
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getLureIds()
  const paths = ids.map((id) => ({ params: { id } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params!.id as string
  const { getAverageRatings, getAverageRatingsAll } = averageRating()
  const lure = await getLureById(id)
  const reviews = await getReviews(id)
  const averageRatings = await getAverageRatings(id)
  return {
    props: {
      lure,
      reviews,
      averageRatings,
    },
  }
}

export default LureDetail
