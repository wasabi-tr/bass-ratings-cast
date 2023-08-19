import Breadcrumb from '@/components/Base/Breadcrumb'
import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import PageTop from '@/components/Base/PageTop'
import { getGenreIdBySlug } from '@/features/genres/api/getGenreIdBySlug'
import { getGenreSlugs } from '@/features/genres/api/getGenreSlugs'
import { getLuresByGenreId } from '@/features/lure/api/getLuresByGenreId'
import LureItem from '@/features/lure/components/LureItem'
import { LureDetail } from '@/types'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

type Props = {
  lures: LureDetail[]
  slug: string
}
const LuresByGenre: NextPage<Props> = ({ lures, slug }) => {
  const genre_name = lures[0]?.genre_name
  const breadcrumbs = [
    { name: 'ホーム', item: '/' },
    { name: 'ルアー一覧', item: '/lure' },
    { name: genre_name, item: `/genre/${slug}` },
  ]
  return (
    <Layout>
      <PageTop title={`${genre_name}のルアー一覧`} />
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
  const slugs = await getGenreSlugs()
  const paths = slugs.map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params!.slug as string
  const genre_id = await getGenreIdBySlug(slug)
  const lures = await getLuresByGenreId(genre_id)

  return {
    props: {
      lures,
      slug,
    },
  }
}

export default LuresByGenre
