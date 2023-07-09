import { supabase } from '@/lib/supabaseClient'

export const getGenres = async () => {
  const { data: genres, error } = await supabase.from('genres').select('*')

  if (error) throw new Error(error.message)
  return genres
}
