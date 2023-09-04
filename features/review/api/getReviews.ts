import { supabase } from '@/lib/supabaseClient'

const getReviews = async (id: string) => {
  const { data: reviewData, error: reviewError } = await supabase
    .from('reviews_with_usernames')
    .select('*')
    .order('created_at', { ascending: true })
    .eq('lure_id', id)
  if (reviewError) throw new Error(reviewError.message)

  return reviewData
}

export default getReviews
