import { useDownloadUrl } from '@/hooks/useDownloadUrl'
import { supabase } from '@/lib/supabaseClient'
import { Profile } from '@/types'
import { revalidateProfile } from '@/utils/revalidate'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useMutation, useQueryClient } from 'react-query'

export const userMutateProfile = () => {
  const queryClient = useQueryClient()

  const createProfileMutation = useMutation(
    async (profile: Omit<Profile, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('profiles')
        .insert(profile)
        .select()
      if (error) throw new Error(error.message)
      console.log(data)

      return data
    },
    {
      onSuccess: (res) => {
        /* ISRでユーザープロフィールページを生成 */
        // revalidateProfile(res[0].user_id)
      },
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  const updateProfileMutation = useMutation(
    async (profile: Profile) => {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...profile,
        })
        .eq('user_id', profile.user_id)
      if (error) throw new Error(error.message)
      return profile
    },
    {
      onSuccess: (res) => {
        /* ISRでユーザープロフィールページを再生成 */
        revalidateProfile(res.user_id)

        /* ヘッダーにユーザー名、アバター画像をを即時反映するためにreact-queryのキャッシュを更新※要改善 */
        let previousProfile = queryClient.getQueryData<Profile>(['profile'])
        if (res.user_id === previousProfile?.user_id) {
          queryClient.setQueryData(['profile'], {
            id: res.id,
            created_at: res.created_at,
            username: res.username,
            text: res.text,
            avatar_url: res.avatar_url,
            user_id: res.user_id,
          })
        }
        alert('Profile updated')
      },
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return { createProfileMutation, updateProfileMutation }
}
