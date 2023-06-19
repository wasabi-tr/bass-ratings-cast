import { Layout } from '@/components/Layout'
import { useMutateLure } from '@/hooks/useMutateLure'
import { useQueryBrands } from '@/hooks/useQueryBrands'
import { useQueryGenres } from '@/hooks/useQueryGenres'
import { useUploadLureImg } from '@/hooks/useUploadLureImg'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { NextPage } from 'next'
import { ChangeEvent, FormEvent, useState } from 'react'

const LureRegister: NextPage = () => {
  const { data: genres } = useQueryGenres()
  const { data: brands } = useQueryBrands()
  const editedLure = useStore((state) => state.editedLure)
  const updateEditedLure = useStore((state) => state.updateEditedLure)
  const { createLureMutation } = useMutateLure()
  const { useMutateUploadLureImg } = useUploadLureImg()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateEditedLure({
      ...editedLure,
      [e.target.name]: e.target.value,
    })
    console.log(editedLure)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    useMutateUploadLureImg.mutate(e)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data } = await supabase.storage
      .from('lures')
      .getPublicUrl(editedLure.image_url)
    const fullUrl = data.publicUrl

    console.log(data.publicUrl)
    console.log(fullUrl)
    // console.log(data.publicUrl)

    if (editedLure.id === '') {
      await createLureMutation.mutateAsync({
        name: editedLure.name,
        brand_id: editedLure.brand_id,
        genre_id: editedLure.genre_id,
        price: editedLure.price,
        length: editedLure.length,
        weight: editedLure.weight,
        image_url: fullUrl,
      })
    }
  }

  return (
    <Layout title="商品登録ページ">
      <h2>商品を登録する</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
              name="brand_id"
              value={brand.id}
              checked={editedLure.brand_id === brand.id}
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
          onChange={handleImageChange}
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
