import { supabase } from '@/lib/supabaseClient'

export const getLures = async () => {
  const { data, error } = await supabase.from('lure_detail').select('*')

  if (error) throw new Error(error.message)
  return data
}
