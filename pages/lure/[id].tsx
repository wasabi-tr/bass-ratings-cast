import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Lure } from '@/types'
import { getLureIds } from '../api/lure/getLureId'
import { getLureById } from '../api/lure/getLureById'
type Props = {
  lure: Lure
}

const LureDetail: NextPage<Props> = ({ lure }) => {
  console.log(lure)
  return <div>{lure.name}</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getLureIds()
  const paths = ids.map((id) => ({ params: { id } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params!.id as string
  const lure = await getLureById(id)

  return {
    props: {
      lure,
    },
    revalidate: 60,
  }
}

export default LureDetail
