import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useStore } from '@/lib/store'
import { getProfile } from '@/features/profile/api/getProfile'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export const useMutateAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const updateEditedProfile = useStore((state) => state.updateEditedProfile)
  const resetEditedProfile = useStore((state) => state.resetEditedProfile)
  const router = useRouter()
  const [registered, setRegistered] = useState(false)

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
        setErrorMessage('メールアドレスまたはパスワードが違います')
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
          emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/callback`,
        },
      })
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: async (res) => {
        // router.push('/')
        setRegistered(true)
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const logoutMutation = useMutation(
    async () => {
      const { error } = await supabaseClient.auth.signOut()
      if (error) throw new Error(error.message)
    },
    {
      onSuccess: () => {
        resetEditedProfile()
        router.push('/')
      },
      onError: (err: any) => {
        alert(
          'ログアウトできませんでした。お手数ですがもう一度ログアウトをお願いします。'
        )

        reset()
      },
    }
  )

  const googleSignInMutation = useMutation(
    async () => {
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
      })
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
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
    errorMessage,
    setErrorMessage,
    loginMutation,
    registerMutation,
    logoutMutation,
    googleSignInMutation,
    registered,
  }
}
