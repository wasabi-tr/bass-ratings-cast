import { supabase } from '@/lib/supabaseClient'

export const getBrands = async () => {
  const { data: brands, error } = await supabase.from('brands').select('*')

  if (error) throw new Error(error.message)
  return brands
}
