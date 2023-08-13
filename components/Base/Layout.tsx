import Head from 'next/head'
import { FC, ReactNode } from 'react'
import { Header } from './Header'
import Footer from './Footer'

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
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  )
}
