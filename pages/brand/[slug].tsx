import { getBrandSlugs } from '@/features/brands/api/getBrandSlugs'
import { getBrands } from '@/features/brands/api/getBrands'
import { LureDetail } from '@/types'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

type Props = {
  lures: LureDetail
}
const LuresBySlug: NextPage<Props> = ({ lures }) => {
  return <div>Enter</div>
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
  //   const lures = await getLuresBySlug(slug)

  return {
    props: {
      //   lures,
    },
  }
}

export default LuresBySlug
