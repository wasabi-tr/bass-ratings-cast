import { Layout } from '@/components/Layout'
import { useQueryBrands } from '@/hooks/useQueryBrands'
import { useQueryGenres } from '@/hooks/useQueryGenres'
import { useStore } from '@/lib/store'
import { ChangeEvent, FormEvent } from 'react'

const LureRegister = () => {
  const { data: genres } = useQueryGenres()
  const { data: brands } = useQueryBrands()
  const editedLure = useStore((state) => state.editedLure)
  const updateEditedLure = useStore((state) => state.updateEditedLure)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateEditedLure({
      ...editedLure,
      [e.target.name]: e.target.value,
    })
  }

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateEditedLure({
        ...editedLure,
        image_url: URL.createObjectURL(e.target.files[0]),
      })
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle your form submission logic here
  }

  return (
    <Layout title="商品登録ページ">
      <h2>商品を登録する</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Lure Name"
          value={editedLure.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        {brands?.map((brand, index) => (
          <label key={index} className="flex items-center">
            <input
              type="radio"
              name="bland_id"
              value={brand.id}
              checked={editedLure.bland_id === brand.id}
              onChange={handleChange}
              className="mr-2"
            />
            {brand.name}
          </label>
        ))}

        {genres?.map((genre, index) => (
          <label key={index} className="flex items-center">
            <input
              type="radio"
              name="genre_id"
              value={genre.id}
              checked={editedLure.genre_id === genre.id}
              onChange={handleChange}
              className="mr-2"
            />
            {genre.name}
          </label>
        ))}

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={editedLure.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="length"
          placeholder="Length"
          value={editedLure.length}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="weight"
          placeholder="Weight"
          value={editedLure.weight}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="file"
          name="image_url"
          onChange={onImageChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </Layout>
  )
}

export default LureRegister
