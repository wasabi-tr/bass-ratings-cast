import { supabase } from '@/lib/supabaseClient'

export const getProfile = async (id: string) => {
  console.log(`idは${id}`)

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', id)
    .single()
  if (error) throw new Error(error.message)
  console.log(`戻り値は${profile}`)

  return profile
}
