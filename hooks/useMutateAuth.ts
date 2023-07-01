import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { userMutateProfile } from '@/features/profile/hooks/userMutateProfile'
import { create } from 'domain'

export const useMutateAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const reset = () => {
    setEmail('')
    setPassword('')
  }
  const router = useRouter()
  const { createProfileMutation } = userMutateProfile()

  const loginMutation = useMutation(
    async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw new Error(error.message)
    },
    {
      onSuccess: () => {
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
      onSuccess: (res) => {
        createProfileMutation.mutateAsync({
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
        router.push('/')
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
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
  }
}
