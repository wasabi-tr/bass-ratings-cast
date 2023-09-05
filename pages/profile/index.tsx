import { NextPage } from 'next'
import Image from 'next/image'
import { ChangeEvent, FormEvent } from 'react'
import {
  CheckCircleIcon,
  PencilIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid'
import { useUploadAvatarImg } from '@/features/profile/hooks/useUploadAvatarImg'
import { useDownloadUrl } from '@/hooks/useDownloadUrl'

import { userMutateProfile } from '@/features/profile/hooks/userMutateProfile'
import { Layout } from '@/components/Base/Layout'
import Container from '@/components/Base/Container'
import { Spinner } from '@/components/Base/Spinner'
import Breadcrumb from '@/components/Base/Breadcrumb'
import { useStore } from '@/lib/store'
import Seo from '@/components/Base/Seo'

const Profile: NextPage = () => {
  const editedProfile = useStore((state) => state.editedProfile)
  const updateEditedProfile = useStore((state) => state.updateEditedProfile)
  const { useMutateUploadAvatarImg } = useUploadAvatarImg()
  const { isLoading, fullUrl } = useDownloadUrl(
    editedProfile.avatar_url,
    'avatars'
  )
  const { updateProfileMutation, success } = userMutateProfile()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateEditedProfile({ ...editedProfile, [e.target.name]: e.target.value })
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const filePath = await useMutateUploadAvatarImg.mutateAsync(e)
    updateEditedProfile({ ...editedProfile, avatar_url: filePath })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editedProfile.user_id) {
      updateProfileMutation.mutate(editedProfile)
    }
  }

  const breadcrumbs = [
    { name: 'ホーム', item: '/' },
    { name: 'マイページ', item: '' },
  ]

  return (
    <Layout>
      <Seo pageTitle="マイページ" noindex />
      <Breadcrumb itemList={breadcrumbs} />
      {success && (
        <div className="success-message fixed top-5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 rounded-md bg-green-100 border border-green-500 h-20 px-32 z-20 sm:px-4 w-full">
          <CheckCircleIcon className="w-8 h-8 text-green-500" />
          <div className="  text-green-500 font-bold ">
            プロフィールを更新しました。
          </div>
        </div>
      )}
      <Container>
        <div className="py-16 sm:py-8">
          <div className="w-3/4 mx-auto bg-white rounded-2xl shadow-sm py-16 px-20 sm:w-full sm:py-8 sm:px-5 ">
            <form onSubmit={handleSubmit}>
              <label htmlFor="avatarImg">
                {isLoading ? (
                  <Spinner />
                ) : fullUrl ? (
                  <div className="relative m-auto cursor-pointer w-28 h-28">
                    <Image
                      src={fullUrl}
                      alt="avatar"
                      fill
                      className="rounded-full"
                    />
                    <PencilIcon className="h-5 w-5 text-zinc-400 absolute bottom-0 right-0" />
                  </div>
                ) : (
                  <div className="relative m-auto cursor-pointer w-28 h-28">
                    <UserCircleIcon className="h-50 w-50 text-zinc-400" />
                    <PencilIcon className="h-5 w-5 text-zinc-400 absolute bottom-0 right-0" />
                  </div>
                )}
              </label>
              <input
                type="file"
                id="avatarImg"
                className="hidden"
                onChange={handleImageChange}
              />
              <div className="mt-4">
                <label htmlFor="username" className="font-bold">
                  ユーザー名
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={editedProfile.username}
                    onChange={handleChange}
                    className="w-full rounded bg-gray-100 p-3"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="description" className="font-bold">
                  自己紹介
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="text"
                    value={editedProfile.text}
                    onChange={handleChange}
                    className="w-full rounded bg-gray-100 p-3 h-56"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="relative flex w-full justify-center rounded-md bg-primary py-3 px-4 mt-4 text-sm font-bold text-white transition-all hover:opacity-70"
              >
                プロフィールを更新する
              </button>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default Profile
