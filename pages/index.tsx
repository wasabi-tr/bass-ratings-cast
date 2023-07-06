import Container from '@/components/base/Container'
import { Layout } from '@/components/base/Layout'
import { getLuresStatic } from '@/features/lure/api/getLuresStatic'
import LureItem from '@/features/lure/components/LureItem'
import { averageRating } from '@/features/review/hooks/averageRating'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { Lure, LureDetail } from '@/types'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'

type Props = {
  lures: LureDetail[]
}
const Home: NextPage<Props> = ({ lures }) => {
  console.log(lures)

  return (
    <Layout title="">
      <Container>
        <section>
          <div className="py-16">
            <div className="bg-white py-24 px-7 flex gap-12">
              <div className="">
                <h1 className="text-4xl font-bold">BassRatingsCast</h1>
                <p>釣り人が投稿するブラックバスルアー専門の評価サイト</p>
                <div className="rounded-full bg-sub text-center shadow ease duration-300 hover:-translate-y-1 mt-4">
                  <Link
                    href={'/register'}
                    className="text-white font-bold py-5 px-4 inline-block "
                  >
                    会員登録してレビューを投稿する
                  </Link>
                </div>
              </div>
              <div className="bg-gray30 aspect-video w-1/2"></div>
            </div>
          </div>
        </section>
        <ul className="grid gap-7 flex-wrap grid-cols-auto-min-max">
          {lures?.map((lure) => (
            <LureItem key={lure.id} lure={lure} />
          ))}
        </ul>
      </Container>
    </Layout>
  )
}

//方法１：luresテーブルにbrand_nameをとaverage_ratingを入れる
//方法２：viewを使って型を書き換える
export const getStaticProps: GetStaticProps = async () => {
  const lures = await getLuresStatic()

  return {
    props: {
      lures,
    },
  }
}

export default Home
