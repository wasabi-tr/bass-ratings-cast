import { useStore } from '@/lib/store'
// import { supabase } from '@/lib/supabaseClient'
import { useQuery } from 'react-query'
import { userMutateProfile } from './userMutateProfile'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import axios from 'axios'

export const useQueryProfile = () => {
  const { createProfileMutation } = userMutateProfile()
  const user = useUser()
  console.log(user)

  const getProfile = async () => {
    const {
      data: { data, error, status },
    } = await axios.get('http://localhost:3000/api/profile')

    if (error) {
      if (status === 406) {
        try {
          const result = await createProfileMutation.mutateAsync({
            user_id: user?.id!,
            username: user?.email,
            text: '',
            avatar_url: '',
          })

          return result[0]
        } catch (error: any) {
          throw new Error(error.message)
        }
      } else {
        throw new Error(error.message)
      }
    }
    return data
  }

  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
    enabled: !!useUser(),
  })
}
