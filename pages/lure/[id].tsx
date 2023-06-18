import { getLuresStatic } from '@/hooks/useQueryLures'
import { GetStaticProps } from 'next'

const LureDetail = () => {
  return <div>Enter</div>
}

export async function getStaticPaths() {
  return {
    // paths: allSlugs.map(({ slug }) => `/blog/${slug}`),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const lures = await getLuresStatic()
  return {
    props: {
      lures,
    },
  }
}

export default LureDetail
