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
              width={120}
              height={120}
              className="object-cover"
            />
          ) : (
            <Image
              alt={name}
              src="/noimage.jpg"
              width={120}
              height={120}
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col">
          <div className="text-xs text-gray-500">{brand_name}</div>
          <p className="text-lg font-bold">{name}</p>
          {rating_average && (
            <div className="flex items-center gap-1 mt-auto">
              <Stars rating={rating_average} />
              <span className="text-rating text-xs font-bold">
                {rating_average}
              </span>
            </div>
          )}
        </div>
      </Link>
    </li>
  )
}

export default LureItem
