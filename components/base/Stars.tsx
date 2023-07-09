import { FC } from 'react'
//@ts-ignore
import ReactStarsRating from 'react-awesome-stars-rating'

type Props = {
  rating: number
}
export const Stars: FC<Props> = ({ rating }) => {
  return (
    <ReactStarsRating
      value={rating}
      isEdit={false}
      size={20}
      fillColor={'#FFB500'}
      className={'flex justify-center'}
    />
  )
}
