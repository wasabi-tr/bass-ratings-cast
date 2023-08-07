import { Database } from '@/database.types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { ChangeEvent } from 'react'
import { useMutation } from 'react-query'

export const useUploadAvatarImg = () => {
  const supabaseClient = useSupabaseClient<Database>()

  const useMutateUploadAvatarImg = useMutation(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Please select the image file')
      }
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
      const { error } = await supabaseClient.storage
        .from('avatars')
        .upload(filePath, file)
      if (error) throw new Error(error.message)
      return filePath
    },
    {
      onSuccess(data) {},
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return { useMutateUploadAvatarImg }
}
