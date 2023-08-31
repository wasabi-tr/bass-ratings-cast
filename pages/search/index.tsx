import Container from '@/components/Base/Container'
import { Layout } from '@/components/Base/Layout'
import { GetStaticProps, NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { LureDetail } from '@/types'
import Seo from '@/components/Base/Seo'
import PageTop from '@/components/Base/PageTop'
import Breadcrumb from '@/components/Base/Breadcrumb'
import LureItem from '@/features/lure/components/LureItem'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { getLures } from '@/features/lure/api/getLures'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Spinner } from '@/components/Base/Spinner'
import { useQueryLures } from '@/features/lure/hooks/useQueryLures'

const Search: NextPage = () => {
  const router = useRouter()
  const [resultLures, setResultLures] = useState<LureDetail[]>([])
  const [keyword, setKeyword] = useState('')
  const { data: lures, isLoading: queryLoading } = useQueryLures()
  const [isLoading, setIsLoading] = useState(true)

  const search = useCallback(
    async (value: string) => {
      if (value !== '') {
        const resultLures = lures?.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
        setResultLures(resultLures as LureDetail[])
      } else {
        setResultLures(lures as LureDetail[])
      }
      setIsLoading(false)
    },
    [lures, setResultLures, setIsLoading]
  )

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
    search(e.target.value)
  }

  useEffect(() => {
    if (router.query.q) {
      const query = router.query.q as string
      setKeyword(query)
      search(query)
    } else {
      search('')
    }
  }, [router.query, search])

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
          <div className="py-10 min-h-screen">
            <label className="relative flex w-700 max-w-full mx-auto  ">
              <MagnifyingGlassIcon className="absolute top-1/2 left-5 -translate-y-1/2 w-6 h-6 text-primary sm:left-2 sm:w-5 sm:h-5" />
              <input
                type="text"
                value={keyword}
                className="w-full border-primary border  h-12 py-3 pl-14 pr-8 rounded-md  focus-visible:outline-none transition focus-visible:shadow-primary sm:pl-8"
                placeholder="ルアー名を入力..."
                onChange={(e) => handleChange(e)}
              />
            </label>
            {queryLoading || isLoading ? (
              <div className="mt-10">
                <Spinner />
              </div>
            ) : keyword && resultLures.length === 0 ? (
              <>
                <p className="text-center font-bold mt-20 sm:mt-8 sm:text-left">
                  検索したワードに該当するルアーはありません。トップページまたは上部の検索フォームからお探しください。
                </p>
                <div className="flex justify-center mt-8 w-80 h-16 mx-auto sm:w-full">
                  <Link href={'/'} className="btn-primary">
                    TOPページへ
                  </Link>
                </div>
              </>
            ) : (
              <ul className="grid gap-4 grid-cols-2 mt-10 sm:grid-cols-1 ">
                {resultLures?.map((lure) => (
                  <LureItem key={lure.id} lure={lure} />
                ))}
              </ul>
            )}
          </div>
        </Container>
      </section>
    </Layout>
  )
}
export default Search
