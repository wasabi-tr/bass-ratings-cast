import { FC } from 'react'
import { Review } from '@/types'
type Props = {
  reviews: Review[]
}
const ReviewList: FC<Props> = ({ reviews }) => {
  console.log(reviews)
  return (
    <>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>{review.text}</p>
        </div>
      ))}
    </>
  )
}

export default ReviewList
