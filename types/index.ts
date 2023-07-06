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
  rating_1: number
  rating_2: number
  rating_3: number
  rating_4: number
  rating_5: number
  text: string
  user_id: string | undefined
}
export type EditedProfile = {
  user_id: string
  username: string | undefined
  text: string | undefined
  avatar_url: string | undefined
}
export type Rating = {
  rating_1: number
  rating_2: number
  rating_3: number
  rating_4: number
  rating_5: number
}
export type LureDetail = {
  id: string
  name: string
  created_at: string
  image_url: string | undefined
  length: string | null
  weight: string | null
  price: string | null
  brand_id: string
  brand_name: string
  genre_id: string
  genre_name: string
  rating_average: number
}
