import Heading from '@/components/Elements/Heading'
import { Layout } from '@/components/Base/Layout'
import { getBrands } from '@/features/brands/api/getBrands'
import BrandItem from '@/features/brands/components/BrandItem'
import { getGenres } from '@/features/genres/api/getGenres'
import GenreItem from '@/features/genres/components/GenreItem'
import { getLures } from '@/features/lure/api/getLures'
import LureItem from '@/features/lure/components/LureItem'
import { Brand, Genre, LureDetail } from '@/types'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import Container from '@/components/Base/Container'
import Image from 'next/image'
import Seo from '@/components/Base/Seo'
import SearchForm from '@/features/search/components/SearchForm'

type Props = {
  lures: LureDetail[]
  brands: Brand[]
  genres: Genre[]
}
const Home: NextPage<Props> = ({ lures, brands, genres }) => {
  return (
    <Layout>
      <Seo />
      <section>
        <div className="relative">
          <Image
            src={'/mv/mv1.jpg'}
            alt=""
            fill
            className="object-cover object-top -z-10"
          />
          <div className="absolute inset-0 bg-black opacity-40 -z-10"></div>
          <Container>
            <div className="py-20 sm:py-8">
              <div className="py-24  flex gap-12 sm:block sm:py-10">
                <div className="mx-auto">
                  <h1 className="text-5xl font-bold text-white text-center sm:text-2xl tracking-widest	 ">
                    LURE CASE
                  </h1>
                  <p className="mt-4 text-center  text-white sm:">
                    - 釣り人が投稿するブラックバスルアー専門のレビューサイト -
                  </p>
                  {/* <div className="flex justify-center mt-8 w-80 h-16 mx-auto sm:w-full">
                    <Link href={'/auth'} className="btn-primary">
                      会員登録してレビューを投稿する
                    </Link>
                  </div> */}
                  <div className="mt-8">
                    <SearchForm />
                  </div>
                </div>
                {/* <div className="bg-gray30 aspect-video w-1/2"></div> */}
              </div>
            </div>
          </Container>
        </div>
      </section>
      <Container>
        <section>
          <div className="py-16 sm:py-8">
            <Heading heading="ルアー一覧" />
            <ul className="grid gap-4 grid-cols-auto-min-max-33 ">
              {lures?.map((lure) => (
                <LureItem key={lure.id} lure={lure} />
              ))}
            </ul>
            <div className="button-wrap mt-6 mx-auto w-80 h-16">
              <Link href={'/lure'} className="btn-primary">
                ルアー一覧をもっとみる
              </Link>
            </div>
          </div>
        </section>
        <section>
          <div className="py-16 sm:py-8">
            <Heading heading="メーカーから探す" />
            <ul className="grid gap-4 grid-cols-auto-min-max-20 ">
              {brands?.map((brand) => (
                <BrandItem key={brand.id} brand={brand} />
              ))}
            </ul>
            <div className="button-wrap mt-6 mx-auto w-80  h-16">
              <Link href={'/brand'} className="btn-primary">
                メーカー一覧をもっとみる
              </Link>
            </div>
          </div>
        </section>
        <section>
          <div className="py-16 sm:py-8">
            <Heading heading="ルアージャンルから探す" />
            <ul className="grid gap-4 flex-wrap grid-cols-auto-min-max-20 ">
              {genres?.map((genre) => (
                <GenreItem key={genre.id} genre={genre} />
              ))}
            </ul>
          </div>
        </section>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const lures = await getLures()
  const brands = await getBrands()
  const genres = await getGenres()

  return {
    props: {
      lures,
      brands,
      genres,
    },
  }
}

export default Home
