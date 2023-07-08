import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import Head from 'next/head'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
}
export const Layout: FC<Props> = ({ children, title = 'BassRatingsCast' }) => {
  const session = useStore((state) => state.session)

  return (
    <div className=" flex min-h-screen flex-col items-center justify-center font-mono text-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="flex justify-between w-full px-5 py-6 shadow bg-white">
        <div className="-bold">
          <Link href={'/'} className="font-bold">
            Bass Ratings Cast
          </Link>
        </div>
        <nav className="ml-auto">
          <ul className="flex items-center gap-6">
            <li>
              <Link href={'/lure'} className=" font-bold">
                ルアー一覧
              </Link>
            </li>
            <li>
              <Link href={'/auth'} className=" font-bold">
                ログイン
              </Link>
            </li>
            <li>
              <Link href={'/lure-register'} className=" font-bold">
                商品登録
              </Link>
            </li>
            <li>
              <Link href={`/profile/${session?.user.id}`} className="font-bold">
                プロフィール
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex w-screen flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <footer className="flex h-12 w-full items-center justify-center border-t"></footer>
    </div>
  )
}
