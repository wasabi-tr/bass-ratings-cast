import { Profile } from '@/types'
import { revalidateLure, revalidateProfile } from '@/utils/revalidate'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

export const userMutateProfile = () => {
  const queryClient = useQueryClient()
  const supabaseClient = useSupabaseClient()
  const [success, setSuccess] = useState(false)

  const createProfileMutation = useMutation(
    async (profile: Omit<Profile, 'id' | 'created_at'>) => {
      const { data, error } = await supabaseClient
        .from('profiles')
        .insert(profile)
        .select()
      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: (res) => {},
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  const updateProfileMutation = useMutation(
    async (profile: Omit<Profile, 'id' | 'created_at'>) => {
      const { error } = await supabaseClient
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
        let previousProfile = queryClient.getQueryData<Profile>(['profile'])
        if (res.user_id === previousProfile?.user_id) {
          queryClient.setQueryData(['profile'], {
            username: res.username,
            text: res.text,
            avatar_url: res.avatar_url,
            user_id: res.user_id,
          })
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 2000)
        }
      },
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return { createProfileMutation, updateProfileMutation, success }
}
