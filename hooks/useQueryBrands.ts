import { supabase } from '@/lib/supabaseClient'
import { useQuery } from 'react-query'

export const useQueryBrands = () => {
  const getBrands = async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) throw new Error(error.message)
    return data
  }
  return useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
    staleTime: Infinity,
  })
}
