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
      {reviews.map((review) => (
        <div key={review.id}>
          <div className="">
            <div className="">
              <span>{review.username}</span>
              <Stars rating={review.rating_average} />
            </div>
            <p>{review.text}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default ReviewList
