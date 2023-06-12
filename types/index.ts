import { Database } from '@/database.types'
import { type } from 'os'

export type Lure = Database['public']['Tables']['lures']['Row']
export type Profiles = Database['public']['Tables']['profiles']['Row']
export type Genres = Database['public']['Tables']['genres']['Row']
export type Brands = Database['public']['Tables']['brands']['Row']

export type EditedLure = {
  id: string
  name: string
  bland_id: string
  length: string
  weight: string
}
