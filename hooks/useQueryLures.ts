import { supabase } from '@/lib/supabaseClient'
import { Lure } from '@/types'
import { useQuery } from 'react-query'

export const useQueryLures = () => {
  const getLures = async () => {
    const { data, error } = await supabase
      .from('lures')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) throw new Error(error.message)
    return data as Lure[]
  }
  return useQuery<Lure[], Error>({
    queryKey: ['lures'],
    queryFn: getLures,
    staleTime: Infinity,
  })
}

export const getLuresStatic = async () => {
  const { data, error } = await supabase
    .from('lures')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  return data as Lure[]
}
