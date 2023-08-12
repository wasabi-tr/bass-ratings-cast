import { supabase } from '@/lib/supabaseClient'

const getReviewByUserIdAndLureId = async (lureId: string, userId: string) => {
  console.log(lureId, userId)

  const { data, error, status } = await supabase
    .from('reviews')
    .select('*')
    .filter('lure_id', 'eq', lureId)
    .filter('user_id', 'eq', userId)
    .single()
  if (error) {
    if (status === 406) {
      return null
    } else {
      throw new Error(error.message)
    }
  }

  return data
}

export default getReviewByUserIdAndLureId
