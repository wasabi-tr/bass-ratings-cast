import { Layout } from '@/components/base/Layout'
import { userMutateProfile } from '@/features/profile/hooks/userMutateProfile'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
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
  const router = useRouter()

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session) //ログイン状態を更新関数に渡す
      // console.log(session)
    }
    fetchSession() // async関数を呼び出す
    supabase.auth.onAuthStateChange(async (event, session) => {
      //ログイン状態の変更を検知して変更があったら更新関数に変更後のログイン状態を渡す
      setSession(session)
      console.log(event, session)

      if (event === 'SIGNED_IN' && session) {
        const { user } = session
        const { data: profile, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
        if (fetchError) {
          if (fetchError) throw new Error(fetchError.message)
        }
        console.log(profile)

        if (!profile) {
          const { data, error } = await supabase.from('profiles').insert({
            user_id: user?.id!,
            username: user?.email,
            text: '',
            avatar_url: '',
          })
          if (error) throw new Error(error.message)
        }

        router.push('/')
      } else if (event === 'SIGNED_OUT') {
        router.push('/')
      }

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
