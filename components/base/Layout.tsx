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
    <div className="text-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="flex justify-between w-full px-5 py-6 shadow bg-white">
        <div className="-bold">
          <Link href={'/'} className="font-bold">
            Bass Ratings Cast
          </Link>
        </div>
        <nav className="ml-auto flex gap-6">
          <ul className="flex items-center gap-6">
            <li>
              <Link href={'/lure'} className=" font-bold">
                ルアー一覧
              </Link>
            </li>
            <li>
              <Link href={'/brand'} className=" font-bold">
                メーカー一覧
              </Link>
            </li>
          </ul>
          {!session ? (
            <div>
              <Link href={'/auth'} className="font-bold text-xs">
                ログイン/新規会員登録
              </Link>
            </div>
          ) : (
            <div>
              <Link href={`/profile/${session?.user.id}`} className="font-bold">
                プロフィール
              </Link>
            </div>
          )}
        </nav>
      </header>
      <main className="">{children}</main>
      <footer className="flex h-12 w-full items-center justify-center border-t"></footer>
    </div>
  )
}
