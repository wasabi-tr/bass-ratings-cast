import { supabase } from '@/lib/supabaseClient'

export const getBrandIdBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw new Error(error.message)
  const brand_id = data.id

  return brand_id
}
