import { Database } from '@/database.types'
import { type } from 'os'

export type Lure = Database['public']['Tables']['lures']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
// export type Genre = Database['public']['Tables']['genres']['Row']
export type Brand = Database['public']['Tables']['brands']['Row']

export type Genre = {
  id: string
  name: string
  slug: string
}
export type EditedLure = {
  id: string
  name: string
  bland_id: string
  image_url: string
  length: string
  weight: string
  price: string
}
