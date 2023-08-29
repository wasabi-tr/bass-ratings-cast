import { Stars } from '@/components/Elements/Stars'
import { LureDetail } from '@/types'
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
    <li
      key={id}
      className="shadow-md bg-white rounded-lg  transition duration-500 hover:-translate-y-1"
    >
      <Link href={`/lure/${id}`} className="px-4 py-5 flex items-start gap-6">
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
          <p className="font-bold">{name}</p>
          {rating_average && <Stars rating={rating_average} size={20} />}
        </div>
      </Link>
    </li>
  )
}

export default LureItem
