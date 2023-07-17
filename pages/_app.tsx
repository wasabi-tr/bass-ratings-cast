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
      setSession(session)
    }
    fetchSession()
    supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      console.log(event)

      if (event === 'SIGNED_IN' && session) {
        const { user } = session

        const { data: profiles, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
        if (fetchError) {
          return
        }

        if (!profiles || profiles.length === 0) {
          //useCreateMutation()と重複している
          const { error } = await supabase.from('profiles').insert({
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
    })
  }, [setSession])
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
