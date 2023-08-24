import { supabase } from '@/lib/supabaseClient'

export const getBrandBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw new Error(error.message)

  return data
}
