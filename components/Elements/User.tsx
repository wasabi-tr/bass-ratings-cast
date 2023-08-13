import { useQueryProfile } from '@/features/profile/hooks/useQueryProfile'
import { useDownloadUrl } from '@/hooks/useDownloadUrl'
import { useMutateAuth } from '@/hooks/useMutateAuth'
import { useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import { useQueryClient } from 'react-query'
import { Spinner } from '../Base/Spinner'
import Image from 'next/image'
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/24/solid'

const User: FC = () => {
  console.log('render user')

  const user = useUser()
  const [open, setOpen] = useState(false)
  const { data: profile } = useQueryProfile()
  const { logoutMutation } = useMutateAuth()
  const queryClient = useQueryClient()

  const { isLoading, fullUrl, setFullUrl } = useDownloadUrl(
    profile?.avatar_url,
    'avatars'
  )

  const logout = async () => {
    await logoutMutation.mutateAsync()
    queryClient.removeQueries(['profile'])
  }
  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <>
      {user && profile ? (
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
    </>
  )
}

export default User
