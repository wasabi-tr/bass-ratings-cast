import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { useQuery } from 'react-query'

export const useQueryProfile = () => {
  const update = useStore((state) => state.updateEditedProfile)

  const getProfile = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    console.log(session?.user.id)

    const { data, status, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', session?.user.id)

    if (error) {
      console.log(status)
      throw new Error(error.message)
    }
    console.log(data)

    return data
  }
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
    onSuccess: (data) => {
      //   if (data) {
      //     update({
      //       user_id: data.user_id,
      //       username: data.username,
      //       text: data.text,
      //       avatar_url: data.avatar_url,
      //     })
      //   }
    },
  })
}
