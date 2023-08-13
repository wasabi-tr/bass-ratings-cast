import Heading from '@/components/Elements/Heading'
import Breadcrumb from '@/components/Base/Breadcrumb'
import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import PageTop from '@/components/Base/PageTop'
import { getBrandIdBySlug } from '@/features/brands/api/getBrandIdBySlug'
import { getBrandSlugs } from '@/features/brands/api/getBrandSlugs'
import { getBrands } from '@/features/brands/api/getBrands'
import { getLuresByBrandId } from '@/features/lure/api/getLuresByBrandId'
import LureItem from '@/features/lure/components/LureItem'
import { LureDetail } from '@/types'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

type Props = {
  lures: LureDetail[]
  slug: string
}
const LuresBySlug: NextPage<Props> = ({ lures, slug }) => {
  const brand_name = lures[0]?.brand_name
  const breadcrumbs = [
    { name: 'ホーム', item: '/' },
    { name: 'ルアー一覧', item: '/lure' },
    { name: brand_name, item: `/brand/${slug}` },
  ]
  return (
    <Layout title="">
      <PageTop title={`${brand_name}のルアー一覧`} />
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
  const brand_id = await getBrandIdBySlug(slug)
  const lures = await getLuresByBrandId(brand_id)

  return {
    props: {
      lures,
      slug,
    },
  }
}

export default LuresBySlug
