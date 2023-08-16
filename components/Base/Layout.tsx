import Head from 'next/head'
import { FC, ReactNode } from 'react'
import { Header } from './Header'
import Footer from './Footer'
import { useRouter } from 'next/router'

type Props = {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ children, title = 'BassRatingsCast' }) => {
  console.log('Rendering Layout')
  const router = useRouter()
  const isHederHide = [
    '/auth',
    '/update-password',
    '/forgot-password',
  ].includes(router.pathname)

  return (
    <div className="text-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      {!isHederHide && <Header />}
      <main className={`${!isHederHide && 'py-16'}`}>{children}</main>
      {!isHederHide && <Footer />}
    </div>
  )
}
