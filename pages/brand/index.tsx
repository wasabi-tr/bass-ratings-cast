import Breadcrumb from '@/components/base/Breadcrumb'
import Container from '@/components/base/Container'
import { Layout } from '@/components/base/Layout'
import PageTop from '@/components/base/PageTop'
import { getBrands } from '@/features/brands/api/getBrands'
import BrandItem from '@/features/brands/components/BrandItem'
import { Brand } from '@/types'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'

type Props = {
  brands: Brand[]
}
const Brand: NextPage<Props> = ({ brands }) => {
  const breadcrumbs = [
    { name: 'ホーム', item: '/' },
    { name: 'メーカー一覧', item: '/brand' },
  ]
  return (
    <>
      <Layout title="">
        <PageTop title="メーカー一覧" />
        <Breadcrumb itemList={breadcrumbs} />
        <Container>
          <ul className="grid gap-4 grid-cols-auto-min-max-20 ">
            {brands?.map((brand) => (
              <BrandItem key={brand.id} brand={brand} />
            ))}
          </ul>
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const brands = await getBrands()

  return {
    props: {
      brands,
    },
  }
}

export default Brand
