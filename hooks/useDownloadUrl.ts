import { Database } from '@/database.types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export const useDownloadUrl = (
  filePath: string | undefined,
  key: 'lures' | 'avatars'
) => {
  const supabaseClient = useSupabaseClient<Database>()

  const [isLoading, setIsLoading] = useState(false)
  const [fullUrl, setFullUrl] = useState('')
  const bucketName = key === 'lures' ? 'lures' : 'avatars'
  useEffect(() => {
    if (filePath) {
      const download = async () => {
        setIsLoading(true)
        const { data, error } = await supabaseClient.storage
          .from(bucketName)
          .download(filePath)
        if (error) {
          setIsLoading(false)
          throw error
        }

        setFullUrl(URL.createObjectURL(data!))
        setIsLoading(false)
      }
      download()
    }
  }, [filePath, bucketName])
  return { isLoading, fullUrl, setFullUrl }
}
