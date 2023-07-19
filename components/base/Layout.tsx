import { getProfile } from '@/features/profile/api/getProfile'
import { useQueryProfile } from '@/features/profile/hooks/useQueryProfile'
import { useMutateAuth } from '@/hooks/useMutateAuth'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import Head from 'next/head'
import Link from 'next/link'
import { FC, ReactNode, Suspense, useState } from 'react'
import { useQueryClient } from 'react-query'
import Header from './Header'
import { ErrorBoundary } from 'react-error-boundary'
import { Spinner } from './Spinner'

type Props = {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ children, title = 'BassRatingsCast' }) => {
  const session = useStore((state) => state.session)

  return (
    <div className="text-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <ErrorBoundary fallback={<Spinner />}>
        <Suspense>
          <Header />
        </Suspense>
      </ErrorBoundary>
      <main>{children}</main>
      <footer className="flex h-12 w-full items-center justify-center border-t"></footer>
    </div>
  )
}
