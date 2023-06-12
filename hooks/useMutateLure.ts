import { supabase } from '@/lib/supabaseClient'
import { Lure } from '@/types'
import { useMutation } from 'react-query'

export const useMutateLure = () => {
  const createLureMutation = useMutation(
    async (lure: Omit<Lure, 'id' | 'created_at'>) => {
      const { data } = await supabase.from('lures').insert(lure)
      return data
    },
    {
      onSuccess: () => {},
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return {}
}
