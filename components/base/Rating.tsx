import { FC, useState } from 'react'
//@ts-ignore
import ReactStarsRating from 'react-awesome-stars-rating'

export const Star: FC = () => {
  const rating = 3.2

  return (
    <ReactStarsRating
      value={rating}
      isEdit={false}
      className={'flex justify-center'}
    />
  )
}
