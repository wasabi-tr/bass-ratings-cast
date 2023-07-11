import { useStore } from '@/lib/store'
import { useMutateReview } from '../../features/review/hooks/useMutateReview'
import { ChangeEvent, FormEvent } from 'react'
import { NextPage } from 'next'
import { Layout } from '@/components/base/Layout'
import { useRouter } from 'next/router'
import Container from '@/components/base/Container'
//@ts-ignore
import ReactStarsRating from 'react-awesome-stars-rating'

const Review: NextPage = () => {
  const session = useStore((state) => state.session)
  const userId = session?.user.id
  const router = useRouter()
  const { id: lureId } = router.query
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
      user_id: userId,
      lure_id: lureId as string,
      rating_1: editedReview.rating_1,
      rating_2: editedReview.rating_2,
      rating_3: editedReview.rating_3,
      rating_4: editedReview.rating_4,
      rating_5: editedReview.rating_5,
      text: editedReview.text,
    })
    reset()
  }

  return (
    <Layout title="商品登録ページ">
      <Container>
        <div className="py-16">
          <div className="rounded-lg bg-white w-3/4 mx-auto py-10 px-24">
            <form onSubmit={handleSubmit} className="">
              <div className="flex items-center gap-3 mb-4">
                <label className="font-bold w-1/3">価格・コスパ</label>
                <div className="w-2/3">
                  <ReactStarsRating
                    name="rating_1"
                    value={editedReview.rating_1.toString()}
                    fillColor={'#FFB500'}
                    className={`flex`}
                    isHalf={false}
                    size={30}
                    onChange={(value: string) =>
                      update({ ...editedReview, rating_1: Number(value) })
                    }
                  />
                  <input
                    type="number"
                    min="0"
                    max="5"
                    name="rating_1"
                    value={editedReview.rating_1.toString()}
                    // onChange={handleChange}
                    hidden
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <label className="font-bold w-1/3">操作性</label>
                <div className="w-2/3">
                  <ReactStarsRating
                    name="rating_2"
                    value={editedReview.rating_2.toString()}
                    fillColor={'#FFB500'}
                    className={`flex`}
                    isHalf={false}
                    size={30}
                    onChange={(value: string) =>
                      update({ ...editedReview, rating_2: Number(value) })
                    }
                  />
                  <input
                    type="number"
                    min="0"
                    max="5"
                    name="rating_2"
                    value={editedReview.rating_2.toString()}
                    hidden
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <label className="font-bold w-1/3">アクション</label>
                <div className="w-2/3">
                  <ReactStarsRating
                    name="rating_3"
                    value={editedReview.rating_3.toString()}
                    fillColor={'#FFB500'}
                    className={`flex`}
                    isHalf={false}
                    size={30}
                    onChange={(value: string) =>
                      update({ ...editedReview, rating_3: Number(value) })
                    }
                  />
                  <input
                    type="number"
                    min="0"
                    max="5"
                    name="rating_3"
                    value={editedReview.rating_2.toString()}
                    hidden
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <label className="font-bold w-1/3">飛距離</label>
                <div className="w-2/3">
                  <ReactStarsRating
                    name="rating_4"
                    value={editedReview.rating_4.toString()}
                    fillColor={'#FFB500'}
                    className={`flex`}
                    isHalf={false}
                    size={30}
                    onChange={(value: string) =>
                      update({ ...editedReview, rating_4: Number(value) })
                    }
                  />
                  <input
                    type="number"
                    min="0"
                    max="5"
                    name="rating_4"
                    value={editedReview.rating_4.toString()}
                    hidden
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <label className="font-bold w-1/3">耐久性</label>
                <div className="w-2/3">
                  <ReactStarsRating
                    name="rating_5"
                    value={editedReview.rating_5.toString()}
                    fillColor={'#FFB500'}
                    className={`flex`}
                    isHalf={false}
                    size={30}
                    onChange={(value: string) =>
                      update({ ...editedReview, rating_5: Number(value) })
                    }
                  />
                  <input
                    type="number"
                    min="0"
                    max="5"
                    name="rating_5"
                    value={editedReview.rating_5.toString()}
                    hidden
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

export default Review
