import { Genre } from '@/types'
import Link from 'next/link'
import { FC } from 'react'
type Props = {
  genre: Genre
}
const GenreItem: FC<Props> = ({ genre }) => {
  const { id, name } = genre
  return (
    <li key={id} className="shadow-md rounded-lg bg-white ">
      <Link href={`/genre/${id}`} className="px-4 py-5 block">
        <div className="text-lg text-primary font-bold text-center">{name}</div>
      </Link>
    </li>
  )
}

export default GenreItem
