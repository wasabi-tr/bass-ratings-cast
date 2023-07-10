import { FC } from 'react'
//@ts-ignore
import ReactStarsRating from 'react-awesome-stars-rating'

type Props = {
  rating: number
  position?: string
  size?: number
}
export const Stars: FC<Props> = ({ rating, position = 'right', size = 20 }) => {
  return (
    <div
      className={`flex items-center gap-1 mt-auto ${
        position === 'center' ? 'justify-center' : ''
      }`}
    >
      <ReactStarsRating
        value={rating}
        isEdit={false}
        size={size}
        fillColor={'#FFB500'}
        className={`flex `}
      />
      <span className="text-rating text-xs font-bold">{rating}</span>
    </div>
  )
}
