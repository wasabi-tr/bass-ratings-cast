import { supabase } from '@/lib/supabaseClient'

export const useDownloadImage = () => {
  const download = async ({
    bucketName,
    filePath,
  }: {
    bucketName: string
    filePath: string
  }) => {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .download(filePath)
    if (error) {
      throw error
    }
    const fullUrl = URL.createObjectURL(data!)

    return fullUrl
  }
  return { download }
}
