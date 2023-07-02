import { supabase } from '@/lib/supabaseClient'

export const averageRating = () => {
  const getAverageRatings = async (lureId: string) => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: true })
      .eq('lure_id', lureId)
    if (error) throw new Error(error.message)
    console.log(data)

    let totalRating1 = 0
    let totalRating2 = 0
    let totalRating3 = 0
    let totalRating4 = 0
    let totalRating5 = 0

    data.forEach((item) => {
      totalRating1 += item.rating_1
      totalRating2 += item.rating_2
      totalRating3 += item.rating_3
      totalRating4 += item.rating_4
      totalRating5 += item.rating_5
    })

    const averageRatings = {
      rating_1: totalRating1 / data.length,
      rating_2: totalRating2 / data.length,
      rating_3: totalRating3 / data.length,
      rating_4: totalRating4 / data.length,
      rating_5: totalRating5 / data.length,
    }

    return averageRatings
  }
  const getAverageRatingsAll = async (lureId: string) => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: true })
      .eq('lure_id', lureId)
    if (error) throw new Error(error.message)

    let totalSum = 0
    let totalCount = 0

    data.forEach((item) => {
      totalSum +=
        item.rating_1 +
        item.rating_2 +
        item.rating_3 +
        item.rating_4 +
        item.rating_5
      totalCount += 5 // 5つのレーティングがあります
    })

    return totalSum / totalCount
  }

  return { getAverageRatings, getAverageRatingsAll }
}
