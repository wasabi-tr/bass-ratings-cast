import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { LureDetail, Rating, Review } from '@/types'
import { getLureById } from '../../features/lure/api/getLureById'
import { Layout } from '@/components/base/Layout'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/router'
import ReviewList from '@/features/review/components/ReviewList'
import getReviews from '@/features/review/api/getReviews'
import { getLureIds } from '@/features/lure/api/getLureId'
import Chart from '@/features/chart/components/Chart'
import { averageRating } from '@/features/review/hooks/averageRating'
import { Stars } from '@/components/base/Stars'
import Image from 'next/image'
type Props = {
  lure: LureDetail
  reviews: Review[]
  averageRatings: Rating
}

const LureDetail: NextPage<Props> = ({ lure, reviews, averageRatings }) => {
  const update = useStore((state) => state.updateReviewedLureId)
  const router = useRouter()
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
  const handleClick = () => {
    update(id)
    router.push(`/review/${id}`)
  }

  return (
    <Layout title={name}>
      <section>
        <div className="inner">
          <div className="py-16">
            <div className="flex gap-16">
              <div className="left w-1/3 ">
                <div className="sticky top-6">
                  <span className="text-sm text-gray-400">{brand_name}</span>
                  <h2 className="text-2xl text-bold mt-2">{name}</h2>
                  <p className="border border-primary rounded-md inline-block text-primary font-bold px-3 mt-3">
                    {genre_name}
                  </p>
                  <div className="aspect-square mt-5">
                    {image_url ? (
                      <Image
                        alt={name}
                        src={image_url}
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        alt={name}
                        src="/noimage.jpg"
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <button
                    className="rounded-full bg-primary text-center shadow 
                    duration-300 mt-3 text-white font-bold py-3 px-3 w-full  hover:-translate-y-1"
                    onClick={handleClick}
                  >
                    口コミを投稿する
                  </button>
                </div>
              </div>
              <div className="right  w-2/3">
                <section>
                  <div className="">
                    <h2 className="heading">総合評価</h2>
                    {rating_average && (
                      <div className="flex items-center gap-1 mt-auto justify-center">
                        <Stars rating={rating_average} />
                        <span className="text-rating text-xs font-bold">
                          {rating_average}
                        </span>
                      </div>
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
                    <h2 className="heading">商品情報詳細</h2>
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
                    <h2 className="heading">口コミ</h2>
                    <ReviewList reviews={reviews} />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
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
  const { getAverageRatings } = averageRating()
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
