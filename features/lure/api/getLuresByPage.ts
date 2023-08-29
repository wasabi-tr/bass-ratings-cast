import { LURES_PER_PAGE } from '@/const'
import { supabase } from '@/lib/supabaseClient'

export const getLuresByPage = async (
  start: number,
  end: number,
  limit = LURES_PER_PAGE
) => {
  const { data, error } = await supabase
    .from('lure_detail')
    .select('*')
    .range(start, end)
    .limit(limit)

  if (error) throw new Error(error.message)
  return data
}
