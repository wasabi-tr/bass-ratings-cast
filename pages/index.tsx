import Container from '@/components/Container'
import { Layout } from '@/components/Layout'
import LureItem from '@/components/LureItem'
import { getLuresStatic, useQueryLures } from '@/hooks/useQueryLures'
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const lures = await getLuresStatic()
  return {
    props: {
      lures,
    },
    revalidate: 60,
  }
}

export default Home
