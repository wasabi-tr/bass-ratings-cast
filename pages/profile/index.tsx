import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { ChangeEvent, FormEvent, useState } from 'react'
import { PencilIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useStore } from '@/lib/store'
import { useUploadAvatarImg } from '@/features/profile/hooks/useUploadAvatarImg'
import { useDownloadUrl } from '@/hooks/useDownloadUrl'
import getProfile from '@/features/profile/api/getProfile'
import { useQueryProfile } from '@/features/profile/hooks/useQueryProfile'

const Profile: NextPage = () => {
  const editedProfile = useStore((state) => state.editedProfile)
  const update = useStore((state) => state.updateEditedProfile)
  const { useMutateUploadAvatarImg } = useUploadAvatarImg()
  const profile = useQueryProfile()
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    update({ ...editedProfile, [e.target.name]: e.target.value })
    console.log(editedProfile)
  }
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    useMutateUploadAvatarImg.mutate(e)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedProfile.user_id) {
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="avatarImg">
        {profile ? (
          <div className="relative m-auto cursor-pointer  w-72 h-72">
            {/* <Image
              src={profile}
              alt="avatar"
              width={50}
              height={50}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
              className="rounded-full"
            /> */}
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
          name="description"
          value={editedProfile.text}
          onChange={handleChange}
        />
      </div>
    </form>
  )
}

export default Profile
