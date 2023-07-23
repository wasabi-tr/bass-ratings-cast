import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { PencilIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useStore } from '@/lib/store'
import { useUploadAvatarImg } from '@/features/profile/hooks/useUploadAvatarImg'
import { useDownloadUrl } from '@/hooks/useDownloadUrl'
import { Layout } from '@/components/base/Layout'
import { getProfileIds } from '@/features/profile/api/getProfileIds'
import { Profile } from '@/types'
import { getProfile } from '@/features/profile/api/getProfile'
import { Spinner } from '@/components/base/Spinner'
import { userMutateProfile } from '@/features/profile/hooks/userMutateProfile'
type Props = {
  profile: Profile
}

const Profile: NextPage<Props> = ({ profile }) => {
  const [editedProfile, setEditedProfile] = useState(profile)
  const { useMutateUploadAvatarImg } = useUploadAvatarImg()
  const { isLoading, fullUrl } = useDownloadUrl(
    editedProfile.avatar_url,
    'avatars'
  )
  const { updateProfileMutation } = userMutateProfile()
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value })
    console.log(editedProfile)
  }
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    useMutateUploadAvatarImg.mutate(e)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedProfile.user_id) {
      updateProfileMutation.mutate(editedProfile)
    }
  }

  return (
    <Layout title="プロフィール">
      <form onSubmit={handleSubmit}>
        <label htmlFor="avatarImg">
          {isLoading ? (
            <Spinner />
          ) : fullUrl ? (
            <div className="relative m-auto cursor-pointer w-72 h-72">
              <Image
                src={fullUrl}
                alt="avatar"
                width={50}
                height={50}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                className="rounded-full"
              />
              <PencilIcon className="h-5 w-5 text-zinc-400 absolute bottom-0 right-0" />
            </div>
          ) : (
            <div className="relative m-auto cursor-pointer w-72 h-72">
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
        <div className="flex items-center gap-3">
          <label className="font-bold">ユーザー名：</label>
          <input
            type="text"
            name="username"
            value={editedProfile.username}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="font-bold">自己紹介</label>
          <textarea
            name="text"
            value={editedProfile.text}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          プロフィールを更新する
        </button>
      </form>
    </Layout>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getProfileIds()
  const paths = ids.map((id) => ({ params: { id } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params!.id as string
  const profile = await getProfile(id)

  return {
    props: {
      profile,
    },
  }
}

export default Profile
