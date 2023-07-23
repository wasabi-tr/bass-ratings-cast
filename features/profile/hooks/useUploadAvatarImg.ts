import { useDownloadUrl } from '@/hooks/useDownloadUrl'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { ChangeEvent } from 'react'
import { useMutation } from 'react-query'

export const useUploadAvatarImg = () => {
  const editedProfile = useStore((state) => state.editedProfile)
  const update = useStore((state) => state.updateEditedProfile)

  const useMutateUploadAvatarImg = useMutation(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Please select the image file')
      }
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)
      if (error) throw new Error(error.message)
      update({ ...editedProfile, avatar_url: filePath })
    },
    {
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return { useMutateUploadAvatarImg }
}
