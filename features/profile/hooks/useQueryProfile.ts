import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { useQuery } from 'react-query'
import { userMutateProfile } from './userMutateProfile'

export const useQueryProfile = () => {
  const { createProfileMutation } = userMutateProfile()
  const session = useStore((state) => state.session)

  const getProfile = async () => {
    const { data, status, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', session?.user.id)
      .single()

    if (error) {
      if (status === 406) {
        try {
          const result = await createProfileMutation.mutateAsync({
            user_id: session?.user?.id!,
            username: session?.user?.email,
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
    enabled: !!session,
  })
}
