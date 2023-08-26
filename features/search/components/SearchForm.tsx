import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { FC, useState } from 'react'

const SearchForm: FC = () => {
  const [keyword, setKeyword] = useState('')
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }
  return (
    <form action="/search" method="get">
      <div className="relative  flex w-700 max-w-full mx-auto">
        <label className="w-full">
          <input
            type="text"
            name="q"
            value={keyword}
            className="w-full border-primary border  h-12 py-3 pl-6 pr-14 rounded-md  focus-visible:outline-none transition focus-visible:shadow-primary"
            placeholder="ルアー名を入力..."
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button className="absolute top-0 right-0 h-full aspect-square rounded-br-md rounded-tr-md  bg-primary flex items-center justify-center transition hover:opacity-60">
          <MagnifyingGlassIcon className="w-6 h-6 text-white " />
        </button>
      </div>
    </form>
  )
}

export default SearchForm
