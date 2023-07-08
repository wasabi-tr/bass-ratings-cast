import { Stars } from '@/components/base/Stars'
import { Lure, LureDetail } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

type LureItemProps = {
  key: string
  lure: LureDetail
}
const LureItem: FC<LureItemProps> = ({ lure }) => {
  const { name, brand_name, rating_average, image_url, id } = lure

  return (
    <li key={id} className="shadow-md bg-white">
      <Link href={`/lure/${id}`} className="px-4 py-5 flex items-start gap-6 ">
        <div className="aspect-square">
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
        <div>
          <div className="text-sm text-gray-700">{brand_name}</div>
          <p className="text-lg font-bold">{name}</p>
          {rating_average && (
            <div className="flex items-center gap3">
              <Stars rating={rating_average} />
              <span>{rating_average}</span>
            </div>
          )}
        </div>
      </Link>
    </li>
  )
}

export default LureItem
