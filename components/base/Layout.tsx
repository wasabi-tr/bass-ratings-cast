import Head from 'next/head'
import { FC, ReactNode, Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Spinner } from './Spinner'
import { Header } from './Header'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

type Props = {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ children, title = 'BassRatingsCast' }) => {
  console.log('Rendering Layout')
  return (
    <div className="text-gray-800">
      <Head>
        <title>{title}</title>
      </Head>

      <Header />
      <main>{children}</main>
      <footer className="flex h-12 w-full items-center justify-center border-t"></footer>
    </div>
  )
}
