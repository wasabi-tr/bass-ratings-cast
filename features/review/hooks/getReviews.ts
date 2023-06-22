import { supabase } from '@/lib/supabaseClient'

export const getReviews = async (lure_id: string) => {
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select()
    .eq('lure_id', lure_id)
  if (error) {
    throw new Error(error.message)
  }
  return reviews
}
