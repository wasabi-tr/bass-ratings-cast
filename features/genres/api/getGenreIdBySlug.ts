import { supabase } from '@/lib/supabaseClient'

export const getGenreIdBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('genres')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw new Error(error.message)
  const genre_id = data.id

  return genre_id
}
