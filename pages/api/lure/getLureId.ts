import { supabase } from '@/lib/supabaseClient'

export const getLureIds = async () => {
  const { data: lures, error } = await supabase
    .from('lures')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) throw new Error(error.message)

  const ids = lures.map((lure) => lure.id)

  return ids
}
