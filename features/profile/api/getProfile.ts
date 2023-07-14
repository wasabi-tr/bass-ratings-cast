import { supabase } from '@/lib/supabaseClient'

export const getProfile = async (id: string) => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', id)
    .single()
  if (error) throw new Error(error.message)

  return profile
}
