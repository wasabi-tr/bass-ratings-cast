import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { LureDetail } from '@/types'
import Seo from '@/components/Base/Seo'
import PageTop from '@/components/Base/PageTop'
import Breadcrumb from '@/components/Base/Breadcrumb'
import LureItem from '@/features/lure/components/LureItem'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { getLures } from '@/features/lure/api/getLures'
type Props = {
  lures: LureDetail[]
}
const Search: NextPage<Props> = ({ lures }) => {
  const [resultLures, setResultLures] = useState<LureDetail[]>([])
  const [keyword, setKeyword] = useState('')

  const search = async (value: string) => {
    if (value !== '') {
      const { data: resultLures, error } = await supabase
        .from('lure_detail')
        .select()
        .ilike('name', `%${value}%`)
      if (error) throw error
      setResultLures(resultLures as LureDetail[])
      return
    } else {
      setResultLures([])
    }
  }
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
    search(e.target.value)
  }
  const breadcrumbs = [
    { name: 'ホーム', item: '/' },
    { name: 'ルアー検索', item: '/search' },
  ]
  return (
    <Layout>
      <Seo pageTitle="ルアー検索" />
      <Breadcrumb itemList={breadcrumbs} />
      <section>
        <Container>
          <div className="py-20 sm:py-8">
            <label className="relative flex w-700 max-w-full mx-auto  ">
              <MagnifyingGlassIcon className="absolute top-1/2 left-5 -translate-y-1/2 w-6 h-6 text-primary " />
              <input
                type="text"
                value={keyword}
                className="w-full border-primary border  h-12 py-3 px-14 rounded-md  focus-visible:outline-none transition focus-visible:shadow-primary"
                placeholder="ルアー名を入力..."
                onChange={(e) => handleChange(e)}
              />
            </label>
            <ul className="grid gap-4 grid-cols-2 mt-10 sm:grid-cols-1">
              {resultLures.length > 0 || keyword
                ? resultLures?.map((lure) => (
                    <LureItem key={lure.id} lure={lure} />
                  ))
                : lures?.map((lure) => <LureItem key={lure.id} lure={lure} />)}
            </ul>
          </div>
        </Container>
      </section>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const lures = await getLures()

  return {
    props: {
      lures,
    },
  }
}

export default Search
