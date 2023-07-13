import { supabase } from '@/lib/supabaseClient'

export const getLureIds = async () => {
  const { data: lures, error } = await supabase.from('lure_detail').select('*')
  if (error) throw new Error(error.message)

  const ids = lures.map((lure) => lure.id)

  return ids
}
