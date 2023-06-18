import { useDownloadUrl } from '@/hooks/useDownloadUrl'
import { Lure } from '@/types'
import Image from 'next/image'
import { FC } from 'react'
import { Spinner } from './Spinner'

type LureItemProps = {
  key: string
  lure: Lure
}
const LureItem: FC<LureItemProps> = ({ lure }) => {
  const { name, brand_id, image_url, id } = lure

  // const { isLoading: lureImageLoading, fullUrl: lureImage } = useDownloadUrl(
  //   image_url,
  //   'lures'
  // )
  return (
    <li
      key={id}
      className="flex items-start gap-4 drop-shadow-md p-4 rounded-md"
    >
      <div className="w-[100px] h-[100px]">
        {image_url ? (
          <Image
            alt={name}
            src={image_url}
            width={100}
            height={100}
            className="object-cover"
          />
        ) : (
          <Image
            alt={name}
            src="/noimage.jpg"
            width={100}
            height={100}
            className="object-cover"
          />
        )}
      </div>
      <div className="">
        <p>{name}</p>
        <p>{brand_id}</p>
        <p>{id}</p>
      </div>
    </li>
  )
}

export default LureItem
