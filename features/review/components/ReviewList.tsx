import { FC } from 'react'
import { Review } from '@/types'
import { Stars } from '@/components/Elements/Stars'
type ReviewWithUsername = Review & {
  username: string
  rating_average: number
}
type Props = {
  reviews: ReviewWithUsername[]
}
const ReviewList: FC<Props> = ({ reviews }) => {
  return (
    <>
      {reviews?.map((review) => (
        <div key={review.id} className="mb-4 p-3 bg-white rounded-md shadow-sm">
          <div className="">
            <div className="flex gap-2 items-center">
              <span className="font-bold">{review.username}</span>
              <Stars rating={review.rating_average} size={16} />
            </div>
            <p className="mt-2">{review.text}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default ReviewList
