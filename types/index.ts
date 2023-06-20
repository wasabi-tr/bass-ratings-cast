import { Database } from '@/database.types'
import { type } from 'os'

export type Lure = Database['public']['Tables']['lures']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
// export type Genre = Database['public']['Tables']['genres']['Row']
export type Brand = Database['public']['Tables']['brands']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']

export type Genre = {
  id: string
  name: string
  slug: string
}
export type EditedLure = {
  id: string
  name: string
  brand_id: string
  genre_id: string
  image_url: string
  length: string
  weight: string
  price: string
}

export type EditedReview = {
  id: string
  lure_id: string
  rating_1: number | null
  rating_2: number | null
  rating_3: number | null
  rating_4: number | null
  rating_5: number | null
  text: string
  user_id: string
}
