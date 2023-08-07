import { Database } from '@/database.types'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { EditedReview, Review } from '@/types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useMutation } from 'react-query'

export const useMutateReview = () => {
  const supabaseClient = useSupabaseClient()
  const reset = useStore((state) => state.resetEditedReview)
  const session = useStore((state) => state.session)
  const createReviewMutation = useMutation(
    async (review: Omit<EditedReview, 'id' | 'created_at'>) => {
      const { data, error } = await supabaseClient
        .from('reviews')
        .upsert(review, { onConflict: 'user_id  ' })
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
  const updateReviewMutation = useMutation(
    async (review: EditedReview) => {
      const { data, error } = await supabaseClient
        .from('reviews')
        .update({
          rating_1: review.rating_1,
          rating_2: review.rating_2,
          rating_3: review.rating_3,
          rating_4: review.rating_4,
          rating_5: review.rating_5,
          text: review.text,
        })
        .eq('id', review.id)
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

  return { createReviewMutation }
}
