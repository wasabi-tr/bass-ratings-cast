import { Database } from '@/database.types'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { ChangeEvent } from 'react'
import { useMutation } from 'react-query'

export const useUploadImg = (buckets: 'lures' | 'brands') => {
  const supabaseClient = useSupabaseClient<Database>()
  const editedLure = useStore((state) => state.editedLure)
  const updateLure = useStore((state) => state.updateEditedLure)

  const editedBrand = useStore((state) => state.editedBrand)
  const updateBrand = useStore((state) => state.updateEditedBrand)
  const useMutateUploadImg = useMutation(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Please select the image file')
      }
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
      const { error } = await supabaseClient.storage
        .from(buckets)
        .upload(filePath, file)
      if (error) throw new Error(error.message)
      if (buckets === 'lures') {
        updateLure({ ...editedLure, image_url: filePath })
      } else if (buckets === 'brands') {
        updateBrand({ ...editedBrand, image_url: filePath })
      }
    },
    {
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return { useMutateUploadImg }
}
