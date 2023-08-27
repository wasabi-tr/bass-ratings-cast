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
import Link from 'next/link'

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
      <Breadcrumb itemList={breadcrumbs} />
      <Container padding="py-10">
        {lures.length !== 0 ? (
          <ul className="grid gap-4 grid-cols-auto-min-max-33 ">
            {lures?.map((lure) => (
              <LureItem key={lure.id} lure={lure} />
            ))}
          </ul>
        ) : (
          <div className="pt-28 pb-20 ">
            <p className="text-center font-bold flex items-center justify-center ">
              {brand.name}のルアーは現在登録されていません
            </p>
            <div className="flex justify-center mt-8 w-80 h-16 mx-auto sm:w-full">
              <Link href={'/'} className="btn-primary">
                TOPページへ
              </Link>
            </div>
          </div>
        )}
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
