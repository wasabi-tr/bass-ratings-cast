import { Brand } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
type Props = {
  brand: Brand
}
const BrandItem: FC<Props> = ({ brand }) => {
  const { id, image_url, name, slug } = brand
  return (
    <li
      key={id}
      className="shadow-md bg-white rounded-lg transition duration-500 hover:-translate-y-1"
    >
      <Link
        href={`/brand/${slug}`}
        className="px-4 py-5 gap-3 flex flex-col items-center justify-center"
      >
        <div className="aspect-square w-32 h-32 relative">
          {image_url ? (
            <Image alt={name} src={image_url} fill className="object-cover" />
          ) : (
            <Image
              alt={name}
              src="/noimage.jpg"
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="text-gray-700 font-bold">{name}</div>
      </Link>
    </li>
  )
}

export default BrandItem
