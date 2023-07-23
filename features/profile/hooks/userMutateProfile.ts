import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { Profile } from '@/types'
import { revalidateProfile } from '@/utils/revalidate'
import { useMutation, useQueryClient } from 'react-query'
import { useQueryProfile } from './useQueryProfile'

export const userMutateProfile = () => {
  // const editedProfile = useStore((state) => state.editedProfile)
  // const updateEditedProfile = useStore((state) => state.updateEditedProfile)
  // const resetEditedProfile = useStore((state) => state.resetEditedProfile)

  const createProfileMutation = useMutation(
    async (profile: Omit<Profile, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('profiles')
        .insert(profile)
        .select()
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        // revalidateProfile(res.user_id)
      },
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  const updateProfileMutation = useMutation(
    async (profile: Omit<Profile, 'id' | 'created_at'>) => {
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
        console.log(res)
        revalidateProfile(res.user_id)
        alert('Profile updated')
      },
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return { createProfileMutation, updateProfileMutation }
}
