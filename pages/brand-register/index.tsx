import Breadcrumb from '@/components/Base/Breadcrumb'
import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import Seo from '@/components/Base/Seo'
import { Database } from '@/database.types'
import { useMutateBrand } from '@/features/brands/hooks/useMutateBrands'
import { useQueryBrands } from '@/features/brands/hooks/useQueryBrands'
import { useUploadImg } from '@/features/lure/hooks/useUploadImg'
import { useStore } from '@/lib/store'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import { ChangeEvent, FormEvent, useState } from 'react'

const BrandRegister: NextPage = () => {
  const supabaseClient = useSupabaseClient<Database>()
  const [isRegister, setIsRegister] = useState(true)

  const editedBrand = useStore((state) => state.editedBrand)
  const updateEditedBrand = useStore((state) => state.updateEditedBrand)
  const { createBrandMutation, updateBrandMutation } = useMutateBrand()
  const { useMutateUploadImg } = useUploadImg('brands')
  const { data: brands } = useQueryBrands()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateEditedBrand({
      ...editedBrand,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    useMutateUploadImg.mutate(e)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data } = await supabaseClient.storage
      .from('brands')
      .getPublicUrl(editedBrand.image_url)
    const fullUrl = data.publicUrl

    if (editedBrand.id === '') {
      await createBrandMutation.mutateAsync({
        name: editedBrand.name,
        image_url: editedBrand.image_url && fullUrl,
        slug: editedBrand.slug,
      })
    } else {
      await updateBrandMutation.mutateAsync({
        id: editedBrand.id,
        name: editedBrand.name,
        image_url: editedBrand.image_url && fullUrl,
        slug: editedBrand.slug,
      })
    }
  }
  const breadcrumbs = [
    { name: 'ホーム', item: '/' },

    { name: 'メーカー登録', item: '' },
  ]
  return (
    <Layout>
      <Seo pageTitle="メーカー登録" />
      <Breadcrumb itemList={breadcrumbs} />
      <Container>
        <div className="pt-12 sm:pt-6">
          <h2 className="text-center font-bold text-2xl sm:text-lg">
            メーカーの商品情報を登録・修正する
          </h2>
          <div className="w-2/3 mt-8 mx-auto bg-white rounded-2xl shadow-sm p-16 sm:w-full sm:py-6 sm:px-4">
            <div className="w-full">
              <button
                type="button"
                className={`w-1/2 h-14 font-bold border border-primary  rounded-tl-md  rounded-bl-md  transition ${
                  isRegister ? 'text-white bg-primary' : 'text-primary bg-white'
                }`}
                onClick={() => setIsRegister(true)}
              >
                登録
              </button>
              <button
                type="button"
                className={`w-1/2 h-14 font-bold border border-primary rounded-tr-md rounded-br-md  transition ${
                  !isRegister
                    ? 'text-white bg-primary '
                    : 'text-primary bg-white '
                }`}
                onClick={() => setIsRegister(false)}
              >
                修正
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {!isRegister && (
                <div className="border-b border-gray-300 py-5 sm:block">
                  <div className="font-bold block text-sm sm:w-full">
                    <span className="text-sm font-bold border border-primary text-primary rounded-md py-1 px-2 mr-2 inline-block">
                      必須
                    </span>
                    修正するメーカー
                  </div>
                  <div className="mt-3 sm:w-full sm:mt-4">
                    <div className="flex flex-wrap gap-4">
                      {brands?.map((brand) => (
                        <label
                          className="flex items-center gap-2"
                          key={brand.id}
                        >
                          <input
                            type="radio"
                            name="brands"
                            value={brand.id}
                            onChange={() =>
                              updateEditedBrand({
                                id: brand.id,
                                name: brand.name,
                                image_url: brand.image_url,
                                slug: brand.slug,
                              })
                            }
                          />
                          {brand.name}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="border-b border-gray-300 py-5 sm:block">
                <label
                  htmlFor="lure-name"
                  className="font-bold block text-sm sm:w-full"
                >
                  <span className="text-sm font-bold border border-primary text-primary rounded-md py-1 px-2 mr-2 inline-block">
                    必須
                  </span>
                  メーカー名
                </label>
                <div className="mt-3 sm:w-full sm:mt-4">
                  <input
                    id="lure-name"
                    type="text"
                    name="name"
                    value={editedBrand.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className=" border-b border-gray-300 py-5 sm:block">
                <p
                  id="group-maker"
                  className="font-bold block text-sm sm:w-full "
                >
                  {' '}
                  <span className="text-sm font-bold border border-primary text-primary rounded-md py-1 px-2 mr-2 inline-block">
                    必須
                  </span>
                  スラッグ名<span className="text-xs ">(半角英数字)</span>
                </p>
                <div className="mt-4">
                  <input
                    id="slug"
                    type="text"
                    name="slug"
                    value={editedBrand.slug}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="border-b border-gray-300 py-5 sm:block">
                <label htmlFor="lure-pic" className="font-bold block text-sm ">
                  <span className="text-sm font-bold border border-gray-500 text-gray-500 rounded-md py-1 px-2 mr-2 inline-block">
                    任意
                  </span>
                  ルアー画像
                </label>
                <div className="mt-4">
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
                  メーカの情報を{isRegister ? '登録' : '修正'}する
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default BrandRegister
