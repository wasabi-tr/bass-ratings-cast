import { FC, useState } from 'react'
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
      className={'flex justify-center'}
    />
  )
}
