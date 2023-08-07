import { Database } from '@/database.types'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { Lure } from '@/types'
import { revalidateIndex, revalidateLure } from '@/utils/revalidate'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useMutation } from 'react-query'

export const useMutateLure = () => {
  const supabaseClient = useSupabaseClient<Database>()

  const reset = useStore((state) => state.resetEditedLure)
  const createLureMutation = useMutation(
    async (lure: Omit<Lure, 'id' | 'created_at'>) => {
      const { data, error } = await supabaseClient
        .from('lures')
        .insert(lure)
        .select()
      if (error) throw new Error(error.message)
      console.log(data)

      return data
    },
    {
      onSuccess: (res) => {
        console.log('投稿')

        revalidateIndex()
        revalidateLure(res[0].id)
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return { createLureMutation }
}
