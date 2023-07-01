import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { Lure } from '@/types'
import { revalidateLure } from '@/utils/revalidate'
import { useMutation } from 'react-query'

export const useMutateLure = () => {
  const reset = useStore((state) => state.resetEditedLure)
  const createLureMutation = useMutation(
    async (lure: Omit<Lure, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('lures').insert(lure).select()
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        revalidateLure()
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return { createLureMutation }
}
