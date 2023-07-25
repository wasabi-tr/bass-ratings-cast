import { useQueryProfile } from '@/features/profile/hooks/useQueryProfile'
import { useDownloadUrl } from '@/hooks/useDownloadUrl'
import { useMutateAuth } from '@/hooks/useMutateAuth'
import { useStore } from '@/lib/store'
import Link from 'next/link'
import { FC, memo, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { Spinner } from './Spinner'
import Image from 'next/image'
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/24/solid'
import { startTransition } from 'react'

export const HeaderMemo: FC = () => {
  console.log('Rendering Header')
  const session = useStore((state) => state.session)
  const profile = useStore((state) => state.editedProfile)
  const setProfile = useStore((state) => state.updateEditedProfile)
  const queryClient = useQueryClient()
  const { data } = useQueryProfile()
  const { logoutMutation } = useMutateAuth()
  const { isLoading, fullUrl, setFullUrl } = useDownloadUrl(
    profile.avatar_url,
    'avatars'
  )
  const [open, setOpen] = useState(false)

  useEffect(() => {
    /* 
    ※要改善
    現在はuseEffectでglobal stateを更新しているがreact-queryが更新されるたびに更新しなくてはならない。
    react-queryだけで制御したいが、SSGでレンダリングしているため、ハイドレーションエラーが出る。
     */
    startTransition(() => {
      setProfile({
        user_id: data?.user_id,
        username: data?.username,
        text: data?.text,
        avatar_url: data?.avatar_url,
      })
      if (!session) {
        queryClient.removeQueries(['profile'])
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient])

  const logout = async () => {
    await logoutMutation.mutateAsync()
    queryClient.removeQueries(['profile'])
  }
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <header className="flex justify-between w-full px-5 py-6 shadow bg-white">
      <div>
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
        {profile.username ? (
          <div className="relative">
            <button onClick={handleClick} className="flex items-center gap-3">
              <div className="relative m-auto w-5 h-5">
                {isLoading ? (
                  <Spinner />
                ) : fullUrl ? (
                  <Image
                    src={fullUrl}
                    alt="avatar"
                    fill
                    className="rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="w-5 h-5 text-zinc-400" />
                )}
              </div>
              <p>{profile.username}</p>
            </button>
            <div
              className={`${
                open ? 'opacity-100 visible' : 'opacity-0 invisible'
              } absolute top-full bg-white shadow-sm p-3 rounded-md w-52 right-0`}
            >
              <div className="border-b border-gray-300 flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-zinc-400" />
                <Link
                  href={`/profile/${profile?.user_id}`}
                  className="text-sm py-2 flex-grow text-left transition-all hover:opacity-60"
                >
                  プロフィール
                </Link>
              </div>
              <div className=" flex items-center gap-2">
                <ArrowRightOnRectangleIcon className="w-4 h-4 text-zinc-400" />

                <button
                  onClick={logout}
                  className="block text-sm py-2 flex-grow text-left transition-all hover:opacity-60"
                >
                  ログアウト
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Link
              href={'/auth'}
              className="font-bold text-xs p-3 border border-primary rounded-sm text-primary text-center"
            >
              ログイン/新規会員登録
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export const Header = memo(HeaderMemo)
