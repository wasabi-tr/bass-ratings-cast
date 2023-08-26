import { FC, ReactNode } from 'react'
import { Header } from './Header'
import Footer from './Footer'
import { useRouter } from 'next/router'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  const router = useRouter()
  const isHederHide = [
    '/auth',
    '/update-password',
    '/forgot-password',
  ].includes(router.pathname)

  return (
    <div className="text-gray-800">
      {!isHederHide && <Header />}
      <main className={`${!isHederHide && 'py-16'}`}>{children}</main>
      {!isHederHide && <Footer />}
    </div>
  )
}
