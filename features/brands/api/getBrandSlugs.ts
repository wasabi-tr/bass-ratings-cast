import { supabase } from '@/lib/supabaseClient'

export const getBrandSlugs = async () => {
  const { data: brands, error } = await supabase.from('brands').select('*')

  if (error) throw new Error(error.message)
  const brandSlugs = brands.map((brand) => brand.slug)
  return brandSlugs
}
