import { supabase } from '@/lib/supabaseClient'

export const getProfileIds = async () => {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) throw new Error(error.message)

  const userIds = profiles.map((profile) => profile.user_id)

  return userIds
}
