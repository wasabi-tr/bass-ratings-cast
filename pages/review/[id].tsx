import { useStore } from '@/lib/store'
import { useMutateReview } from '../../features/review/hooks/useMutateReview'
import { ChangeEvent, FormEvent, useEffect } from 'react'
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next'
import { Layout } from '@/components/base/Layout'
import { useRouter } from 'next/router'
import Container from '@/components/base/Container'
import dynamic from 'next/dynamic'
import { getLureIds } from '@/features/lure/api/getLureId'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import getReviewByUserIdAndLureId from '@/features/review/api/getReviewByUserIdAndLureId'
import axios from 'axios'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

type Props = {
  lure_id: string
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

const Review: NextPage<Props> = ({ lure_id }) => {
  const user = useUser()
  const { createReviewMutation } = useMutateReview()
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
    reset()
  }
  useEffect(() => {
    const getCurrentReview = async () => {
      const data = await getReviewByUserIdAndLureId(lure_id, user?.id!)

      console.log(data)
    }
    getCurrentReview()
  }, [])

  return (
    <Layout title="商品登録ページ">
      <Container>
        <div className="py-16">
          <div className="rounded-lg bg-white w-3/4 mx-auto py-10 px-24">
            <form onSubmit={handleSubmit} className="">
              <div className="flex items-center gap-3 mb-4">
                <label htmlFor="rate01" className="font-bold w-1/3">
                  <span className="text-sm font-bold border border-red-700 text-red-700 rounded-md py-1 px-2 mr-2">
                    必須
                  </span>
                  価格・コスパ
                </label>
                <div className="w-2/3">
                  <ReactStarsRating
                    name="rating_1"
                    value={editedReview.rating_1}
                    fillColor={'#FFB500'}
                    className={`flex`}
                    isHalf={false}
                    size={30}
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
                <label className="font-bold w-1/3">操作性</label>
                <div className="w-2/3">
                  <ReactStarsRating
                    name="rating_2"
                    value={editedReview.rating_2}
                    fillColor={'#FFB500'}
                    className={`flex`}
                    isHalf={false}
                    size={30}
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
                <label className="font-bold w-1/3">アクション</label>
                <div className="w-2/3">
                  <ReactStarsRating
                    name="rating_3"
                    value={editedReview.rating_3}
                    fillColor={'#FFB500'}
                    className={`flex`}
                    isHalf={false}
                    size={30}
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
                <label className="font-bold w-1/3">飛距離</label>
                <div className="w-2/3">
                  <ReactStarsRating
                    name="rating_4"
                    value={editedReview.rating_4}
                    fillColor={'#FFB500'}
                    className={`flex`}
                    isHalf={false}
                    size={30}
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
                <label className="font-bold w-1/3">耐久性</label>
                <div className="w-2/3">
                  <ReactStarsRating
                    name="rating_5"
                    value={editedReview.rating_5}
                    fillColor={'#FFB500'}
                    className={`flex`}
                    isHalf={false}
                    size={30}
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
              <div className="flex items-center gap-3 mb-4">
                <label className="font-bold w-1/3">レビューテキスト</label>
                <div className="w-2/3">
                  <textarea
                    name="text"
                    value={editedReview.text}
                    onChange={handleChange}
                    className="bg-gray10 rounded-lg w-full h-32 p-3"
                    required
                  />
                </div>
              </div>
              <div className="rounded-full bg-primary text-center shadow ease duration-300 hover:-translate-y-1 mt-4">
                <button
                  type="submit"
                  className="text-white font-bold py-5 px-4 inline-block "
                >
                  口コミを投稿する
                </button>
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

  // const data = await axios.get(
  //   `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/session`
  // )

  // console.log(data)

  // const user_id =
  // const profile = await getProfile(id)
  // const review = await getReviewByUserIdAndLureId(lure_id,user_id)

  return {
    props: { lure_id },
  }
}

export default Review
