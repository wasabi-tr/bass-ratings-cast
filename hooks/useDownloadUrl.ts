import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'

export const useDownloadUrl = (
  filePath: string | null,
  key: 'lures' | 'avatars'
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [fullUrl, setFullUrl] = useState('')
  const bucketName = key === 'lures' ? 'lures' : 'avatars'
  useEffect(() => {
    if (filePath) {
      const download = async () => {
        setIsLoading(true)
        const { data, error } = await supabase.storage
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
