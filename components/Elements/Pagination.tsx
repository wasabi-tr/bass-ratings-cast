import { LURES_PER_PAGE } from '@/const'
import Link from 'next/link'
import React, { FC } from 'react'
type Props = {
  slug: string
  totalCount: number
  currentCount: number
}

const Pagination: FC<Props> = ({ slug, totalCount, currentCount }) => {
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <ul className="flex gap-2 justify-center">
      {range(1, Math.ceil(totalCount / LURES_PER_PAGE)).map((number, index) => (
        <li key={index}>
          <Link
            href={index !== 0 ? `/${slug}/page/${number}` : `/${slug}`}
            className={`flex items-center justify-center text-primary border border-primary rounded-md w-8 h-8 transition hover:opacity-60 ${
              number === currentCount
                ? 'bg-primary text-white'
                : ' bg-white text-primary '
            }`}
          >
            {number}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Pagination
