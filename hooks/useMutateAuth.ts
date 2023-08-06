import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { useStore } from '@/lib/store'
import { getProfile } from '@/features/profile/api/getProfile'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export const useMutateAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const updateEditedProfile = useStore((state) => state.updateEditedProfile)
  const resetEditedProfile = useStore((state) => state.resetEditedProfile)
  const router = useRouter()

  const reset = () => {
    setEmail('')
    setPassword('')
  }
  const supabaseClient = useSupabaseClient()

  const loginMutation = useMutation(
    async () => {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: async (res) => {
        /* ログインしたユーザー情報をグローバルステートに格納 */
        const profile = await getProfile(res.user.id)
        updateEditedProfile({
          user_id: profile.user_id,
          username: profile.username,
          text: profile.text,
          avatar_url: profile.avatar_url,
        })

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
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'http://localhost:3000//api/auth/callback',
        },
      })
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: async (res) => {
        // router.push('/')
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
