import { FC } from 'react'
import dynamic from 'next/dynamic'
type ReactStarsRatingProps = {
  value: number
  isEdit: boolean
  size: number
  fillColor: string
  className: string
}

const ReactStarsRating = dynamic(
  () =>
    //@ts-ignore
    import('react-awesome-stars-rating') as Promise<{
      default: React.ComponentType<ReactStarsRatingProps>
    }>,
  { ssr: false }
)

type Props = {
  rating: number
  position?: string
  size?: number
  isEdit?: boolean
}

export const Stars: FC<Props> = ({
  rating,
  position = 'right',
  size = 20,
  isEdit = false,
}) => {
  return (
    <div
      className={`flex items-center gap-1 ${
        position === 'center' ? 'justify-center' : ''
      }`}
    >
      <ReactStarsRating
        value={rating}
        isEdit={isEdit}
        size={size}
        fillColor={'#FFB500'}
        className={`flex `}
      />
      <span className="text-rating text-xs font-bold">{rating}</span>
    </div>
  )
}
