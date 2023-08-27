import { useStore } from '@/lib/store'
import { EditedReview } from '@/types'
import { revalidateIndex, revalidateLure } from '@/utils/revalidate'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { useMutation } from 'react-query'

export const useMutateReview = () => {
  const supabaseClient = useSupabaseClient()
  const reset = useStore((state) => state.resetEditedReview)
  const [success, setSuccess] = useState(false)
  const createReviewMutation = useMutation(
    async (review: Omit<EditedReview, 'id' | 'created_at'>) => {
      const { data, error } = await supabaseClient
        .from('reviews')
        .insert(review)
        .select()
        .single()
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        revalidateIndex()
        revalidateLure(res.lure_id)
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 2000)
      },
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  const updateReviewMutation = useMutation(
    async (review: Omit<EditedReview, 'created_at'>) => {
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
        .select()
        .single()
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        revalidateIndex()
        revalidateLure(res.lure_id)

        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 2000)
      },
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )

  return { createReviewMutation, updateReviewMutation, success }
}
