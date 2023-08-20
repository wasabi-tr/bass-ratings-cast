import { Spinner } from '@/components/Base/Spinner'
import { Stars } from '@/components/Elements/Stars'
import { useDownloadUrl } from '@/hooks/useDownloadUrl'
import { Review } from '@/types'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { FC } from 'react'
type ReviewWithUsername = Review & {
  username: string
  avatar_url: string
  rating_average: number
}
type Props = {
  review: ReviewWithUsername
}
const ReviewItem: FC<Props> = ({ review }) => {
  const { isLoading, fullUrl, setFullUrl } = useDownloadUrl(
    review?.avatar_url,
    'avatars'
  )

  return (
    <div key={review.id} className="mb-4 p-3 bg-white rounded-md shadow-sm">
      <div className="flex gap-2 items-center mb-2">
        <div className="relative w-8 h-8 rounded-full ">
          {isLoading ? (
            <Spinner />
          ) : fullUrl ? (
            <Image src={fullUrl} alt="avatar" fill className="rounded-full" />
          ) : (
            <UserCircleIcon className="w-full h-full text-zinc-400" />
          )}
        </div>
        <span className="font-bold">{review.username}</span>
      </div>
      <Stars rating={review.rating_average} size={16} />
      <p className="mt-2">{review.text}</p>
    </div>
  )
}

export default ReviewItem
