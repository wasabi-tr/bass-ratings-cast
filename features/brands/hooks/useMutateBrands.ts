import { Database } from '@/database.types'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { Brand } from '@/types'
import { revalidateIndex } from '@/utils/revalidate'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useMutation } from 'react-query'

export const useMutateBrand = () => {
  const supabaseClient = useSupabaseClient<Database>()

  const reset = useStore((state) => state.resetEditedBrand)
  const createBrandMutation = useMutation(
    async (brand: Omit<Brand, 'id' | 'created_at'>) => {
      const { data, error } = await supabaseClient
        .from('brands')
        .insert(brand)
        .select()
      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: (res) => {
        revalidateIndex()
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return { createBrandMutation }
}
