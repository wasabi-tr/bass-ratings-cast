import { Genre } from '@/types'
import Link from 'next/link'
import { FC } from 'react'
type Props = {
  genre: Genre
}
const GenreItem: FC<Props> = ({ genre }) => {
  const { id, name } = genre
  return (
    <li key={id} className="shadow-md bg-white px-4 py-5">
      <div className="text-lg text-primary font-bold text-center">{name}</div>
      <div
        className="rounded-full bg-primary text-center shadow 
   duration-300 mt-3   hover:-translate-y-1"
      >
        <Link
          href={`/genre/${id}`}
          className="inline-block text-white font-bold py-1 px-3 w-full "
        >{`${name}のルアー一覧を見る`}</Link>
      </div>
    </li>
  )
}

export default GenreItem
