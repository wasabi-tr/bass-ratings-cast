import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useStore } from '@/lib/store'
import { userMutateProfile } from '@/features/profile/hooks/userMutateProfile'
import { getProfile } from '@/features/profile/api/getProfile'
import { log } from 'console'

export const useMutateAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const editedProfile = useStore((state) => state.editedProfile)
  const updateEditedProfile = useStore((state) => state.updateEditedProfile)
  const resetEditedProfile = useStore((state) => state.resetEditedProfile)
  const { createProfileMutation } = userMutateProfile()
  const router = useRouter()

  const reset = () => {
    setEmail('')
    setPassword('')
  }

  const loginMutation = useMutation(
    async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: async (res) => {
        console.log(res)

        const { profile } = await getProfile(res.user.id)
        updateEditedProfile(profile)
        console.log(editedProfile)

        router.push('/')
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  const registerMutation = useMutation(
    async () => {
      //メールで確認があるため、実在するアドレスのほうが良い
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: async (res) => {
        console.log('test')
        await createProfileMutation.mutateAsync({
          user_id: res.user?.id!,
          username: res.user?.email,
          text: '',
          avatar_url: '',
        })
        router.push('/')
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const logoutMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw new Error(error.message)
    },
    {
      onSuccess: () => {
        resetEditedProfile()
        router.push('/')
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  const googleSignInMutation = useMutation(
    async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        console.log(res)

        // router.push('/')
      },
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
    logoutMutation,
    googleSignInMutation,
  }
}
