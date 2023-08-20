import { FC } from 'react'
import { Review } from '@/types'
import ReviewItem from './ReviewItem'
type ReviewWithUsername = Review & {
  username: string
  avatar_url: string
  rating_average: number
}
type Props = {
  reviews: ReviewWithUsername[]
}
const ReviewList: FC<Props> = ({ reviews }) => {
  return (
    <>
      {reviews?.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </>
  )
}

export default ReviewList
