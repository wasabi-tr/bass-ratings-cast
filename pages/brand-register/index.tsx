import Breadcrumb from '@/components/Base/Breadcrumb'
import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import Seo from '@/components/Base/Seo'
import { Database } from '@/database.types'
import { useMutateBrand } from '@/features/brands/hooks/useMutateBrands'
import { useUploadImg } from '@/features/lure/hooks/useUploadImg'
import { useStore } from '@/lib/store'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import { ChangeEvent, FormEvent } from 'react'

const BrandRegister: NextPage = () => {
  const supabaseClient = useSupabaseClient<Database>()
  const editedBrand = useStore((state) => state.editedBrand)
  const updateEditedBrand = useStore((state) => state.updateEditedBrand)
  const { createBrandMutation } = useMutateBrand()
  const { useMutateUploadImg } = useUploadImg('brands')
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
    }
  }
  const breadcrumbs = [
    { name: 'ホーム', item: '/' },
    { name: 'メーカー登録', item: '' },
  ]
  console.log(editedBrand)

  return (
    <Layout>
      <Seo pageTitle="メーカー登録" />
      <Breadcrumb itemList={breadcrumbs} />
      <Container>
        <div className="pt-12 sm:pt-6">
          <h2 className="text-center font-bold text-2xl sm:text-lg">
            メーカーの商品情報を登録する
          </h2>
          <div className="w-2/3 mt-8 mx-auto bg-white rounded-2xl shadow-sm p-16 sm:w-full sm:py-6 sm:px-4">
            <form onSubmit={handleSubmit}>
              <div className="border-b border-gray-300 py-5 sm:block">
                <label
                  htmlFor="lure-name"
                  className="font-bold block w-1/4 text-sm sm:w-full"
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
                  メーカーを登録する
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
