import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { useQuery } from 'react-query'
import { userMutateProfile } from './userMutateProfile'
import { Profile } from '@/types'

export const useQueryProfile = () => {
  const session = useStore((state) => state.session)
  const update = useStore((state) => state.updateEditedProfile)
  const { createProfileMutation } = userMutateProfile()

  const getProfile = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const { data, status, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', session?.user.id)
      .single()

    if (error && status === 406) {
      createProfileMutation.mutate({
        user_id: session?.user?.id!,
        username: session?.user?.email,
        text: '',
        avatar_url: '',
      })
      if (error && status !== 406) {
        throw new Error(error.message)
      }
    }
    return data
  }

  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
    onSuccess: (data) => {
      if (data) {
        console.log(data)

        // update({
        //   user_id: data.user_id,
        //   username: data.username,
        //   text: data.text,
        //   avatar_url: data.avatar_url,
        // })
      }
    },
  })
}
