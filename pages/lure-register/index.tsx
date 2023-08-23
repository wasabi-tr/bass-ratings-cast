import Breadcrumb from '@/components/Base/Breadcrumb'
import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import Seo from '@/components/Base/Seo'
import { Database } from '@/database.types'
import { useMutateLure } from '@/features/lure/hooks/useMutateLure'
import { useQueryBrands } from '@/features/lure/hooks/useQueryBrands'
import { useQueryGenres } from '@/features/lure/hooks/useQueryGenres'
import { useUploadLureImg } from '@/features/lure/hooks/useUploadLureImg'
import { useStore } from '@/lib/store'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import { ChangeEvent, FormEvent } from 'react'
import { GetStaticProps } from 'next'
import { getGenres } from '@/features/genres/api/getGenres'
import { getBrands } from '@/features/brands/api/getBrands'
import { Brand, Genre } from '@/types'
type Props = {
  genres: Genre[]
  brands: Brand[]
}

const LureRegister: NextPage<Props> = ({ genres, brands }) => {
  const supabaseClient = useSupabaseClient<Database>()

  const editedLure = useStore((state) => state.editedLure)
  const updateEditedLure = useStore((state) => state.updateEditedLure)
  const { createLureMutation } = useMutateLure()
  const { useMutateUploadLureImg } = useUploadLureImg()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateEditedLure({
      ...editedLure,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    useMutateUploadLureImg.mutate(e)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data } = await supabaseClient.storage
      .from('lures')
      .getPublicUrl(editedLure.image_url)
    const fullUrl = data.publicUrl

    if (editedLure.id === '') {
      await createLureMutation.mutateAsync({
        name: editedLure.name,
        brand_id: editedLure.brand_id,
        genre_id: editedLure.genre_id,
        price: editedLure.price,
        length: editedLure.length,
        weight: editedLure.weight,
        image_url: editedLure.image_url && fullUrl,
      })
    }
  }
  const breadcrumbs = [
    { name: 'ホーム', item: '/' },
    { name: '商品登録', item: '' },
  ]

  return (
    <Layout>
      <Seo pageTitle="商品登録" />
      <Breadcrumb itemList={breadcrumbs} />
      <Container>
        <div className="pt-12 sm:pt-6">
          <h2 className="text-center font-bold text-2xl sm:text-lg">
            ルアーの商品情報を登録する
          </h2>
          <div className="w-700 max-w-full mt-8 mx-auto bg-white rounded-2xl shadow-sm p-16 sm:w-full sm:py-6 sm:px-4">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-5 items-center border-b border-gray-300 py-5 sm:block">
                <label
                  htmlFor="lure-name"
                  className="font-bold block w-1/4 text-sm sm:w-full"
                >
                  <span className="text-sm font-bold border border-primary text-primary rounded-md py-1 px-2 mr-2 inline-block">
                    必須
                  </span>
                  ルアー名
                </label>
                <div className="w-3/4 sm:w-full sm:mt-4">
                  <input
                    id="lure-name"
                    type="text"
                    name="name"
                    placeholder="ルアー名"
                    value={editedLure.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex gap-5 items-start border-b border-gray-300 py-5 sm:block">
                <p
                  id="group-maker"
                  className="font-bold block w-1/4 text-sm sm:w-full "
                >
                  {' '}
                  <span className="text-sm font-bold border border-primary text-primary rounded-md py-1 px-2 mr-2 inline-block">
                    必須
                  </span>
                  メーカー名
                </p>
                <div className="flex flex-wrap gap-4  sm:mt-4">
                  {brands?.map((brand, index) => (
                    <label
                      key={index}
                      className="flex items-center text-sm cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="brand_id"
                        value={brand.id}
                        checked={editedLure.brand_id === brand.id}
                        onChange={handleChange}
                        className="mr-1 "
                      />
                      {brand.name}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-5 items-start border-b border-gray-300 py-5 sm:block">
                <p
                  id="group-maker"
                  className="font-bold block w-1/4 text-sm sm:w-full"
                >
                  {' '}
                  <span className="text-sm font-bold border border-primary text-primary rounded-md py-1 px-2 mr-2 inline-block ">
                    必須
                  </span>
                  ジャンル
                </p>
                <div className="flex flex-wrap gap-4  sm:mt-4">
                  {genres?.map((genre, index) => (
                    <label
                      key={index}
                      className="flex items-center  text-sm cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="genre_id"
                        value={genre.id}
                        checked={editedLure.genre_id === genre.id}
                        onChange={handleChange}
                        className="mr-1 "
                      />
                      {genre.name}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-5 items-center border-b border-gray-300 py-5 sm:block">
                <label
                  htmlFor="price"
                  className="font-bold block w-1/4 text-sm sm:w-full"
                >
                  <span className="text-sm font-bold border border-gray-500 text-gray-500 rounded-md py-1 px-2 mr-2 inline-block">
                    任意
                  </span>
                  価格
                </label>
                <div className="w-3/4 sm:w-full sm:mt-4">
                  <input
                    id="price"
                    type="text"
                    name="price"
                    placeholder="価格"
                    value={editedLure.price}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex gap-5 items-center border-b border-gray-300 py-5 sm:block">
                <label
                  htmlFor="length"
                  className="font-bold block w-1/4 text-sm sm:w-full"
                >
                  <span className="text-sm font-bold border border-gray-500 text-gray-500 rounded-md py-1 px-2 mr-2 inline-block">
                    任意
                  </span>
                  長さ
                </label>
                <div className="w-3/4 sm:w-full sm:mt-4">
                  <input
                    id="length"
                    type="text"
                    name="length"
                    placeholder="長さ"
                    value={editedLure.length}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex gap-5 items-center border-b border-gray-300 py-5 sm:block">
                <label
                  htmlFor="weight"
                  className="font-bold block w-1/4 text-sm sm:w-full"
                >
                  <span className="text-sm font-bold border border-gray-500 text-gray-500 rounded-md py-1 px-2 mr-2 inline-block">
                    任意
                  </span>
                  重さ
                </label>
                <div className="w-3/4 sm:w-full sm:mt-4">
                  <input
                    id="weight"
                    type="text"
                    name="weight"
                    placeholder="重さ"
                    value={editedLure.weight}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex gap-5 items-center border-b border-gray-300 py-5 sm:block">
                <label
                  htmlFor="lure-pic"
                  className="font-bold block w-1/4 text-sm sm:w-full"
                >
                  <span className="text-sm font-bold border border-gray-500 text-gray-500 rounded-md py-1 px-2 mr-2 inline-block">
                    任意
                  </span>
                  画像
                </label>
                <div className="w-3/4 sm:w-full sm:mt-4">
                  <input
                    id="lure-pic"
                    type="file"
                    name="image_url"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="mt-5 mx-auto h-16 w-64 block">
                <button type="submit" className="btn-primary">
                  ルアーを登録する
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const genres = await getGenres()
  const brands = await getBrands()

  return {
    props: {
      genres,
      brands,
    },
  }
}

export default LureRegister
