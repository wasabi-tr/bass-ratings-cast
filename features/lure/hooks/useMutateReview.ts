import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { Review } from '@/types'
import { useMutation } from 'react-query'

export const useMutateReview = () => {
  const reset = useStore((state) => state.resetEditedReview)
  const createLureMutation = useMutation(
    async (review: Omit<Review, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert(review)
        .select()
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return {}
}
