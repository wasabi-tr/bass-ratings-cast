import { Database } from '@/database.types'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { ChangeEvent } from 'react'
import { useMutation } from 'react-query'

export const useUploadLureImg = () => {
  const supabaseClient = useSupabaseClient<Database>()
  const editedLure = useStore((state) => state.editedLure)
  const updateLure = useStore((state) => state.updateEditedLure)
  const useMutateUploadLureImg = useMutation(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Please select the image file')
      }
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
      const { error } = await supabaseClient.storage
        .from('lures')
        .upload(filePath, file)
      if (error) throw new Error(error.message)
      updateLure({ ...editedLure, image_url: filePath })
    },
    {
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return { useMutateUploadLureImg }
}
