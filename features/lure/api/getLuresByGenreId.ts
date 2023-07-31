import { supabase } from '@/lib/supabaseClient'
import React from 'react'

export const getLuresByGenreId = async (id: string) => {
  const { data, error } = await supabase
    .from('lure_detail')
    .select('*')
    .eq('genre_id', id)
  if (error) throw new Error(error.message)
  return data
}
