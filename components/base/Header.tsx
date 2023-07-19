import { useQueryProfile } from '@/features/profile/hooks/useQueryProfile'
import { useMutateAuth } from '@/hooks/useMutateAuth'
import { useStore } from '@/lib/store'
import Link from 'next/link'
import { FC, memo, useEffect } from 'react'
import { useQueryClient } from 'react-query'

const Header: FC = () => {
  console.log('rendering')

  const { data: profile } = useQueryProfile()
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)
  const queryClient = useQueryClient()

  const { logoutMutation } = useMutateAuth()
  const logout = async () => {
    logoutMutation.mutate()
    queryClient.removeQueries(['profile'])
  }

  return (
    <header className="flex justify-between w-full px-5 py-6 shadow bg-white">
      <div className="">
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
          <>
            <div>
              <Link href={`/profile/${session?.user.id}`} className="font-bold">
                プロフィール
              </Link>
            </div>
            <div className="">
              <button onClick={logout}>ログアウト</button>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}

export default memo(Header)
