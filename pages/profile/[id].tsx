import {
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next'
import Image from 'next/image'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { PencilIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useUploadAvatarImg } from '@/features/profile/hooks/useUploadAvatarImg'
import { useDownloadUrl } from '@/hooks/useDownloadUrl'
import { Layout } from '@/components/base/Layout'
import { getProfileIds } from '@/features/profile/api/getProfileIds'
import { Profile } from '@/types'
import { getProfile } from '@/features/profile/api/getProfile'
import { Spinner } from '@/components/base/Spinner'
import { userMutateProfile } from '@/features/profile/hooks/userMutateProfile'
import Container from '@/components/base/Container'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/router'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
type Props = {
  profile: Profile
}

const Profile: NextPage<Props> = ({ profile }) => {
  const session = useStore((state) => state.session)
  const router = useRouter()

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
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const filePath = await useMutateUploadAvatarImg.mutateAsync(e)
    setEditedProfile({ ...editedProfile, avatar_url: filePath })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedProfile.user_id) {
      updateProfileMutation.mutate(editedProfile)
    }
  }

  return (
    <Layout title="プロフィール">
      <Container>
        <div className="py-16">
          <div className="w-3/4 mt-8 mx-auto bg-white rounded-2xl shadow-sm py-16 px-20">
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
// export const getStaticPaths: GetStaticPaths = async () => {
//   const ids = await getProfileIds()
//   const paths = ids.map((id) => ({ params: { id } }))

//   return {
//     paths,
//     fallback: 'blocking',
//   }
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const id = context.params!.id as string
//   const profile = await getProfile(id)

//   return {
//     props: {
//       profile,
//     },
//   }
// }
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Create authenticated Supabase Client
  fetch('/api/supabaseServer')
    .then((response) => response.json())
    .then((data) => console.log(data))
  // const supabase = createPagesServerClient(context)
  // // Check if we have a session
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession()
  // console.log(session)

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }
  const id = context.params!.id as string
  const profile = await getProfile(id)

  return {
    props: {
      profile,
    },
  }
}
export default Profile
