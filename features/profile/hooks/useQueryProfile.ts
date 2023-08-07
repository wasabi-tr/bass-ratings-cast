import { useQuery } from 'react-query'
import { useUser } from '@supabase/auth-helpers-react'
import axios from 'axios'

export const useQueryProfile = () => {
  const user = useUser()

  const getProfile = async () => {
    const {
      data: { data, error, status },
    } = await axios.get('http://localhost:3000/api/profile')

    if (error) {
      if (status === 406) {
        try {
          const {
            data: { data: profile },
          } = await axios.get('http://localhost:3000/api/profile/updateProfile')

          return profile[0]
        } catch (error: any) {
          throw new Error(error.message)
        }
      } else {
        throw new Error(error.message)
      }
    }
    return data
  }

  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
    enabled: !!user,
  })
}
