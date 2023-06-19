import { supabase } from '@/lib/supabaseClient'

export const getLureById = async (id: string) => {
  const { data: lure, error } = await supabase
    .from('lures')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw new Error(error.message)

  return lure
}
