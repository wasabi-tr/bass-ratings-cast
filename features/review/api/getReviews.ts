import { supabase } from '@/lib/supabaseClient'
import { Review } from '@/types'

const getReviews = async (id: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: true })
    .eq('lure_id', id)
  if (error) throw new Error(error.message)
  return data as Review[]
}

export default getReviews
