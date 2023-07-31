import { supabase } from '@/lib/supabaseClient'
import React from 'react'

export const getGenreSlugs = async () => {
  const { data: genres, error } = await supabase.from('genres').select('*')

  if (error) throw new Error(error.message)
  const genreSlugs = genres.map((genre) => genre.slug)
  return genreSlugs
}
