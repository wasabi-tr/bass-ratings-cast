import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { LureDetail, Rating, Review } from '@/types'
import { getLureById } from '../../features/lure/api/getLureById'
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

type ReviewWithUsername = Review & {
  username: string
  rating_average: number
}
type Props = {
  lure: LureDetail
  reviews: ReviewWithUsername[]
  averageRatings: Rating
}

const LureDetail: NextPage<Props> = ({ lure, reviews, averageRatings }) => {
  const {
    id,
    name,
    brand_name,
    genre_name,
    image_url,
    price,
    rating_average,
    length,
    weight,
  } = lure
  const user = useUser()
  return (
    <Layout title={name}>
      <section>
        <Container>
          <div className="py-16">
            <div className="flex gap-16">
              <div className="left w-1/3 ">
                <div className="sticky top-6">
                  <span className="text-sm text-gray-400">{brand_name}</span>
                  <h2 className="text-2xl font-bold mt-2">{name}</h2>
                  <p className="border border-primary rounded-md inline-block text-primary font-bold px-3 mt-3">
                    {genre_name}
                  </p>
                  <div className="aspect-square mt-5 relative">
                    {image_url ? (
                      <Image
                        alt={name}
                        src={image_url}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        alt={name}
                        src="/noimage.jpg"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="mt-5 h-16">
                    {user ? (
                      <Link href={`/review/${id}`} className="btn-primary">
                        口コミを投稿する
                      </Link>
                    ) : (
                      <Link href={`/auth`} className="btn-primary font-ms">
                        会員登録をして口コミを投稿する
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="right  w-2/3">
                <section>
                  <div className="">
                    <Heading heading="総合評価" />
                    {rating_average && (
                      <Stars rating={rating_average} position="center" />
                    )}
                    <Chart
                      lureData={{
                        name: name,
                        ...averageRatings,
                      }}
                    />
                  </div>
                </section>
                <section>
                  <div className="py-10">
                    <Heading heading="商品情報詳細" />
                    <div className="">
                      <dl className="flex items-center border-b border-gray-400 gap-4 pb-4">
                        <dt className="font-bold w-1/4">商品名</dt>
                        <dd>{name}</dd>
                      </dl>
                      <dl className="flex items-center border-b border-gray-400 gap-4 py-4">
                        <dt className="font-bold w-1/4">メーカー名</dt>
                        <dd>{brand_name}</dd>
                      </dl>
                      <dl className="flex items-center border-b border-gray-400 gap-4 py-4">
                        <dt className="font-bold w-1/4">価格</dt>
                        <dd>{price}</dd>
                      </dl>
                      <dl className="flex items-center border-b border-gray-400 gap-4 py-4">
                        <dt className="font-bold w-1/4">長さ</dt>
                        <dd>{length}</dd>
                      </dl>
                      <dl className="flex items-center border-b border-gray-400 gap-4 py-4">
                        <dt className="font-bold w-1/4">重さ</dt>
                        <dd>{weight}</dd>
                      </dl>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="py-10">
                    <Heading heading="口コミ" />
                    <ReviewList reviews={reviews} />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getLureIds()
  const paths = ids.map((id) => ({ params: { id } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params!.id as string
  const { getAverageRatings } = averageRating()
  const [lure, reviews, averageRatings] = await Promise.all([
    getLureById(id),
    getReviews(id),
    getAverageRatings(id),
  ])

  return {
    props: {
      lure,
      reviews,
      averageRatings,
    },
  }
}

export default LureDetail
