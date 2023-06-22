import { useStore } from '@/lib/store'
import { useMutateReview } from '../../features/review/hooks/useMutateReview'
import { ChangeEvent, FormEvent } from 'react'
import { NextPage } from 'next'
import { Layout } from '@/components/base/Layout'
import { useRouter } from 'next/router'
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
    console.log(editedReview)
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
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3">
          <label className="font-bold">価格・コスパ</label>
          <input
            type="number"
            min="0"
            max="5"
            name="rating_1"
            value={editedReview.rating_1.toString()}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="font-bold">操作性</label>
          <input
            type="number"
            min="0"
            max="5"
            name="rating_2"
            value={editedReview.rating_2.toString()}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="font-bold">アクション</label>
          <input
            type="number"
            min="0"
            max="5"
            name="rating_3"
            value={editedReview.rating_3.toString()}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="font-bold">飛距離</label>
          <input
            type="number"
            min="0"
            max="5"
            name="rating_4"
            value={editedReview.rating_4.toString()}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="font-bold">耐久性</label>
          <input
            type="number"
            min="0"
            max="5"
            name="rating_5"
            value={editedReview.rating_5.toString()}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="font-bold">レビューテキスト</label>
          <textarea
            name="text"
            value={editedReview.text}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          口コミを投稿する
        </button>
      </form>
    </Layout>
  )
}

export default Review
