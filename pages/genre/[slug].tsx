import Breadcrumb from '@/components/Base/Breadcrumb'
import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import PageTop from '@/components/Base/PageTop'
import Seo from '@/components/Base/Seo'
import { getGenreBySlug } from '@/features/genres/api/getGenreBySlug'
import { getGenreSlugs } from '@/features/genres/api/getGenreSlugs'
import { getLuresByGenreId } from '@/features/lure/api/getLuresByGenreId'
import LureItem from '@/features/lure/components/LureItem'
import { Genre, LureDetail } from '@/types'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'

type Props = {
  lures: LureDetail[]
  genre: Genre
}
const LuresByGenre: NextPage<Props> = ({ lures, genre }) => {
  const breadcrumbs = [
    { name: 'ホーム', item: '/' },
    { name: 'ルアー一覧', item: '/lure' },
    { name: genre.name, item: `/genre/${genre.slug}` },
  ]

  return (
    <Layout>
      <Seo pageTitle={`${genre.name}のルアー一覧`} />
      <Breadcrumb itemList={breadcrumbs} />
      <Container padding="pt-10">
        {lures.length !== 0 ? (
          <ul className="grid gap-4 grid-cols-auto-min-max-33 ">
            {lures?.map((lure) => (
              <LureItem key={lure.id} lure={lure} />
            ))}
          </ul>
        ) : (
          <div className="pt-28 pb-20 ">
            <p className="text-center font-bold flex items-center justify-center ">
              {genre.name}のルアーは現在登録されていません
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
  const slugs = await getGenreSlugs()
  const paths = slugs.map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params!.slug as string
  const genre = await getGenreBySlug(slug)
  const lures = await getLuresByGenreId(genre.id)

  return {
    props: {
      lures,
      genre,
    },
  }
}

export default LuresByGenre
