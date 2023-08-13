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

type Props = {
  lures: LureDetail[]
  brands: Brand[]
  genres: Genre[]
}
const Home: NextPage<Props> = ({ lures, brands, genres }) => {
  return (
    <Layout title="">
      <Container>
        <section>
          <div className="py-16">
            <div className="bg-white py-24 px-7 flex gap-12">
              <div className="">
                <h1 className="text-4xl font-bold text-center">
                  Bass Ratings Cast
                </h1>
                <p className="mt-4 text-center">
                  釣り人が投稿するブラックバスルアー専門の評価サイト
                </p>
                <div className="flex justify-center mt-3">
                  <Link href={'/register'} className="btn-primary">
                    会員登録してレビューを投稿する
                  </Link>
                </div>
              </div>
              <div className="bg-gray30 aspect-video w-1/2"></div>
            </div>
          </div>
        </section>
        <section>
          <div className="py-16">
            <Heading heading="ルアー一覧" />
            <ul className="grid gap-4 grid-cols-auto-min-max-33 ">
              {lures?.map((lure) => (
                <LureItem key={lure.id} lure={lure} />
              ))}
            </ul>
            <div className="button-wrap mt-6 mx-auto w-80">
              <Link href={'/lure'} className="btn-primary">
                ルアー一覧をもっとみる
              </Link>
            </div>
          </div>
        </section>
        <section>
          <div className="py-16">
            <Heading heading="メーカーから探す" />
            <ul className="grid gap-4 grid-cols-auto-min-max-20 ">
              {brands?.map((brand) => (
                <BrandItem key={brand.id} brand={brand} />
              ))}
            </ul>
            <div className="button-wrap mt-6 mx-auto w-80">
              <Link href={'/brand'} className="btn-primary">
                メーカー一覧をもっとみる
              </Link>
            </div>
          </div>
        </section>
        <section>
          <div className="py-16">
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

//方法１：luresテーブルにbrand_nameをとaverage_ratingを入れる
//方法２：viewを使って型を書き換える
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
