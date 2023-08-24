import Breadcrumb from '@/components/Base/Breadcrumb'
import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import PageTop from '@/components/Base/PageTop'
import Seo from '@/components/Base/Seo'
import { getBrandBySlug } from '@/features/brands/api/getBrandBySlug'
import { getBrandSlugs } from '@/features/brands/api/getBrandSlugs'
import { getBrands } from '@/features/brands/api/getBrands'
import { getLuresByBrandId } from '@/features/lure/api/getLuresByBrandId'
import LureItem from '@/features/lure/components/LureItem'
import { Brand, LureDetail } from '@/types'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

type Props = {
  lures: LureDetail[]
  brand: Brand
}
const LuresByBrand: NextPage<Props> = ({ lures, brand }) => {
  const breadcrumbs = [
    { name: 'ホーム', item: '/' },
    { name: 'ルアー一覧', item: '/lure' },
    { name: brand.name, item: `/brand/${brand.slug}` },
  ]
  return (
    <Layout>
      <Seo pageTitle={`${brand.name}のルアー一覧`} />
      <PageTop title={`${brand.name}のルアー一覧`} />
      <Breadcrumb itemList={breadcrumbs} />
      <Container>
        <ul className="grid gap-4 grid-cols-auto-min-max-33 ">
          {lures?.map((lure) => (
            <LureItem key={lure.id} lure={lure} />
          ))}
        </ul>
      </Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getBrandSlugs()
  const paths = slugs.map((slug) => ({ params: { slug } }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params!.slug as string
  const brand = await getBrandBySlug(slug)
  const lures = await getLuresByBrandId(brand.id)

  return {
    props: {
      lures,
      brand,
    },
  }
}

export default LuresByBrand
