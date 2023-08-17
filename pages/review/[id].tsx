import { useStore } from '@/lib/store'
import { useMutateReview } from '../../features/review/hooks/useMutateReview'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next'
import { Layout } from '@/components/Base/Layout'
import Container from '@/components/Base/Container'
import dynamic from 'next/dynamic'
import { getLureIds } from '@/features/lure/api/getLureId'
import { useUser } from '@supabase/auth-helpers-react'
import { getLureById } from '@/features/lure/api/getLureById'
import { LureDetail } from '@/types'
import Image from 'next/image'
import getReviewByUserIdAndLureId from '@/features/review/api/getReviewByUserIdAndLureId'
import Breadcrumb from '@/components/Base/Breadcrumb'

type Props = {
  lure_id: string
  lure: LureDetail
}
type ReactStarsRatingProps = {
  name: string
  value: number
  size: number
  fillColor: string
  isHalf: boolean
  className: string
  onChange: Function
}
const ReactStarsRating = dynamic(
  () =>
    //@ts-ignore
    import('react-awesome-stars-rating') as Promise<{
      default: React.ComponentType<ReactStarsRatingProps>
    }>,
  { ssr: false }
)

const Review: NextPage<Props> = ({ lure_id, lure }) => {
  const user = useUser()
  const [reviewed, setReviewed] = useState(false)
  const { createReviewMutation, updateReviewMutation } = useMutateReview()
  const editedReview = useStore((state) => state.editedReview)
  const update = useStore((state) => state.updateEditedReview)
  const reset = useStore((state) => state.resetEditedReview)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    update({ ...editedReview, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (reviewed) {
      await updateReviewMutation.mutateAsync(editedReview)
    } else {
      await createReviewMutation.mutateAsync({
        user_id: user?.id,
        lure_id: lure_id,
        rating_1: editedReview.rating_1,
        rating_2: editedReview.rating_2,
        rating_3: editedReview.rating_3,
        rating_4: editedReview.rating_4,
        rating_5: editedReview.rating_5,
        text: editedReview.text,
      })
    }
    reset()
  }

  useEffect(() => {
    const getCurrentReview = async () => {
      const data = await getReviewByUserIdAndLureId(lure_id, user?.id!)
      console.log(data)

      if (data) {
        setReviewed(true)
        update({
          id: data.id,
          lure_id: data.lure_id,
          rating_1: data.rating_1,
          rating_2: data.rating_2,
          rating_3: data.rating_3,
          rating_4: data.rating_4,
          rating_5: data.rating_5,
          text: data.text,
          user_id: data.user_id,
        })
      }
    }
    if (user) getCurrentReview()
    return () => {
      reset()
    }
  }, [user, lure_id, update, reset])
  const { name, brand_name, genre_name, image_url } = lure
  const breadcrumbs = [
    { name: 'ホーム', item: '/' },
    { name: 'ルアー一覧', item: '/lure' },
    { name: `${name}のレビュー登録`, item: lure_id },
  ]

  return (
    <Layout title="商品登録ページ">
      <Breadcrumb itemList={breadcrumbs} />
      <Container>
        <div className="py-16">
          <div className="rounded-lg bg-white w-3/4 mx-auto py-14 px-24">
            <form onSubmit={handleSubmit} className="flex gap-9">
              <div className="">
                <div className="">
                  <span className="text-sm text-gray-400">{brand_name}</span>
                  <h2 className="text-2xl font-bold mt-2">{name}</h2>
                  <p className="border border-primary rounded-md inline-block text-primary font-bold px-3 mt-3">
                    {genre_name}
                  </p>
                </div>
                <div className="aspect-square m-auto relative w-48 mt-5">
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
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <label htmlFor="rate01" className="font-bold w-1/2">
                    <span className="text-sm font-bold border border-primary text-primary rounded-md py-1 px-2 mr-2">
                      必須
                    </span>
                    価格・コスパ
                  </label>
                  <div className="w-1/2">
                    <ReactStarsRating
                      name="rating_1"
                      value={editedReview.rating_1}
                      fillColor={'#FFB500'}
                      className={`flex justify-between`}
                      isHalf={false}
                      size={36}
                      onChange={(value: number) =>
                        update({ ...editedReview, rating_1: value })
                      }
                    />
                    <input
                      id="rate01"
                      type="number"
                      min="1"
                      max="5"
                      name="rating_1"
                      value={editedReview.rating_1}
                      onChange={handleChange}
                      required
                      hidden
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <label className="font-bold w-1/2">
                    {' '}
                    <span className="text-sm font-bold border border-primary text-primary rounded-md py-1 px-2 mr-2">
                      必須
                    </span>
                    操作性
                  </label>
                  <div className="w-1/2">
                    <ReactStarsRating
                      name="rating_2"
                      value={editedReview.rating_2}
                      fillColor={'#FFB500'}
                      className={`flex justify-between`}
                      isHalf={false}
                      size={36}
                      onChange={(value: number) =>
                        update({ ...editedReview, rating_2: value })
                      }
                    />
                    <input
                      type="number"
                      min="1"
                      max="5"
                      name="rating_2"
                      value={editedReview.rating_2}
                      onChange={handleChange}
                      hidden
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <label className="font-bold w-1/2">
                    {' '}
                    <span className="text-sm font-bold border border-primary text-primary rounded-md py-1 px-2 mr-2">
                      必須
                    </span>
                    アクション
                  </label>
                  <div className="w-1/2">
                    <ReactStarsRating
                      name="rating_3"
                      value={editedReview.rating_3}
                      fillColor={'#FFB500'}
                      className={`flex justify-between`}
                      isHalf={false}
                      size={36}
                      onChange={(value: number) =>
                        update({ ...editedReview, rating_3: value })
                      }
                    />
                    <input
                      type="number"
                      min="1"
                      max="5"
                      name="rating_3"
                      value={editedReview.rating_2}
                      onChange={handleChange}
                      hidden
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <label className="font-bold w-1/2">
                    {' '}
                    <span className="text-sm font-bold border border-primary text-primary rounded-md py-1 px-2 mr-2">
                      必須
                    </span>
                    飛距離
                  </label>
                  <div className="w-1/2">
                    <ReactStarsRating
                      name="rating_4"
                      value={editedReview.rating_4}
                      fillColor={'#FFB500'}
                      className={`flex justify-between`}
                      isHalf={false}
                      size={36}
                      onChange={(value: number) =>
                        update({ ...editedReview, rating_4: value })
                      }
                    />
                    <input
                      type="number"
                      min="1"
                      max="5"
                      name="rating_4"
                      value={editedReview.rating_4}
                      onChange={handleChange}
                      hidden
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <label className="font-bold w-1/2">
                    {' '}
                    <span className="text-sm font-bold border border-primary text-primary rounded-md py-1 px-2 mr-2">
                      必須
                    </span>
                    耐久性
                  </label>
                  <div className="w-1/2">
                    <ReactStarsRating
                      name="rating_5"
                      value={editedReview.rating_5}
                      fillColor={'#FFB500'}
                      className={`flex justify-between`}
                      isHalf={false}
                      size={36}
                      onChange={(value: number) =>
                        update({ ...editedReview, rating_5: value })
                      }
                    />
                    <input
                      type="number"
                      min="1"
                      max="5"
                      name="rating_5"
                      value={editedReview.rating_5}
                      hidden
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="font-bold mb-3 block">
                    レビューテキスト
                  </label>
                  <div className="">
                    <textarea
                      name="text"
                      value={editedReview.text}
                      onChange={handleChange}
                      className="bg-gray10 rounded-lg w-full h-32 p-3"
                      required
                    />
                  </div>
                </div>
                <div className="mx-auto mt-7 h-16 ">
                  <button type="submit" className="btn-primary">
                    {reviewed ? 'レビューを修正する' : 'レビューを投稿する'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
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

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const lure_id = context.params!.id as string
  const lure = await getLureById(lure_id)

  return {
    props: { lure_id, lure },
  }
}

export default Review
