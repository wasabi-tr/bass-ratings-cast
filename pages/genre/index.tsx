import Breadcrumb from '@/components/Base/Breadcrumb'
import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import Seo from '@/components/Base/Seo'
import { getGenres } from '@/features/genres/api/getGenres'
import GenreItem from '@/features/genres/components/GenreItem'
import { Genre } from '@/types'
import { GetStaticProps, NextPage } from 'next'

type Props = {
  genres: Genre[]
}
const Genre: NextPage<Props> = ({ genres }) => {
  const breadcrumbs = [
    { name: 'ホーム', item: '/' },
    { name: 'ジャンル一覧', item: '/genre' },
  ]
  return (
    <>
      <Layout>
        <Seo pageTitle="ジャンル一覧" />
        <Breadcrumb itemList={breadcrumbs} />
        <Container padding="py-10">
          <ul className="grid gap-4 grid-cols-auto-min-max-20 ">
            {genres?.map((genre) => (
              <GenreItem key={genre.id} genre={genre} />
            ))}
          </ul>
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const genres = await getGenres()

  return {
    props: {
      genres,
    },
  }
}
export default Genre
