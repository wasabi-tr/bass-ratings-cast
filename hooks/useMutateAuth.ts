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
      onSuccess: () => {},
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
  const registerMutation = useMutation(
    async () => {
      //メールで確認があるため、実在するアドレスのほうが良い
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {},
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
      onSuccess: () => {},
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
    googleSignInMutation,
  }
}
