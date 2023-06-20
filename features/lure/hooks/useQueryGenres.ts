import { supabase } from '@/lib/supabaseClient'
import { useQuery } from 'react-query'

export const useQueryGenres = () => {
  const getGenres = async () => {
    const { data, error } = await supabase
      .from('genres')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) throw new Error(error.message)
    return data
  }
  return useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
    staleTime: Infinity,
  })
}
