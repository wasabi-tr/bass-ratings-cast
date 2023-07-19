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
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
    }
    fetchSession()
    supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)

      console.log(session)
    })
  }, [setSession])
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
