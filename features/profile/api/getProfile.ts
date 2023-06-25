import { supabase } from '@/lib/supabaseClient'

const getProfile = async (userID: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userID)
    .single()
  if (error) throw new Error(error.message)
  return data
}

export default getProfile
