import { supabase } from '@/lib/supabaseClient'
import { Profile } from '@/types'
import { useMutation } from 'react-query'

export const userMutateProfile = () => {
  const createProfileMutation = useMutation(
    async (
      profile: Omit<Profile, 'id' | 'created_at' | 'avatar_url' | 'text'>
    ) => {
      const { data, error } = await supabase
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
  return { createProfileMutation }
}
