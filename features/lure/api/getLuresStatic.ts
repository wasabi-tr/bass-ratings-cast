import { supabase } from '@/lib/supabaseClient'
import { Lure } from '@/types'

const getLuresStatic = async () => {
  const { data, error } = await supabase
    .from('lures')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  return data as Lure[]
}

export default getLuresStatic
