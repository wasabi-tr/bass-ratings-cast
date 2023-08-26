import { supabase } from '@/lib/supabaseClient'
import { Lure, LureDetail } from '@/types'
import { useQuery } from 'react-query'

export const useQueryLures = () => {
  const getLures = async () => {
    const { data, error } = await supabase
      .from('lure_detail')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) throw new Error(error.message)
    return data as LureDetail[]
  }
  return useQuery<LureDetail[], Error>({
    queryKey: ['lures'],
    queryFn: getLures,
    staleTime: Infinity,
  })
}
