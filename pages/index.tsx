import Container from '@/components/base/Container'
import { Layout } from '@/components/base/Layout'
import getLuresStatic from '@/features/lure/api/getLuresStatic'
import LureItem from '@/features/lure/components/LureItem'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { Lure } from '@/types'
import { GetStaticProps, NextPage } from 'next'
type Props = {
  lures: Lure[]
}
const Home: NextPage<Props> = ({ lures }) => {
  return (
    <Layout title="">
      <Container>
        <ul className="flex gap-7 flex-wrap">
          {lures?.map((lure) => (
            <LureItem key={lure.id} lure={lure} />
          ))}
        </ul>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const lures = await getLuresStatic()

  return {
    props: {
      lures,
    },
    revalidate: 60,
  }
}

export default Home
