import { Layout } from '@/components/base/Layout'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  const setSession = useStore((state) => state.setSession)
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session) //ログイン状態を更新関数に渡す
      console.log(session)
    }
    fetchSession() // async関数を呼び出す
    supabase.auth.onAuthStateChange((_event, session) => {
      //ログイン状態の変更を検知して変更があったら更新関数に変更後のログイン状態を渡す
      setSession(session)
      // console.log(`login userID is ${session?.user.id}`)
    })
  }, [setSession]) //更新関数が更新されるたびに発火

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
