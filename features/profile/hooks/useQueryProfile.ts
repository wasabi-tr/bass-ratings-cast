import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { useQuery } from 'react-query'

export const useQueryProfile = () => {
  const session = useStore((state) => state.session)

  const getProfile = async () => {
    const { data, status, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', session?.user?.id)
      .single()

    if (error) {
      console.log(status)

      throw new Error(error.message)
    }
    return data
  }
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })
}
