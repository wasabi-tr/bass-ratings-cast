import '@/styles/globals.css'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import { useState } from 'react'
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

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
