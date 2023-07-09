import { Brand } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
type Props = {
  brand: Brand
}
const BrandItem: FC<Props> = ({ brand }) => {
  const { id, image_url, name } = brand
  return (
    <li key={id} className="shadow-md bg-white">
      <div className="px-4 py-5 flex items-center gap-6  ">
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
        <div>
          <div className="text-lg text-gray-700 font-bold">{name}</div>
          <div
            className="rounded-full bg-primary text-center shadow 
   duration-300  hover:-translate-y-1 mt-3"
          >
            <Link
              href={`/brand/${id}`}
              className="inline-block text-white font-bold py-1 px-3 w-full"
            >{`${name}のルアー一覧を見る`}</Link>
          </div>
        </div>
      </div>
    </li>
  )
}

export default BrandItem
