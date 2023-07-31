import { supabase } from '@/lib/supabaseClient'
import React from 'react'

export const getLuresByBrandId = async (id: string) => {
  const { data, error } = await supabase
    .from('lure_detail')
    .select('*')
    .eq('brand_id', id)
  if (error) throw new Error(error.message)
  return data
}
