import { create } from 'zustand'
import { Session } from '@supabase/supabase-js'
import { EditedLure, EditedProfile, EditedReview } from '@/types'
import { stringify } from 'querystring'
import { text } from 'stream/consumers'

//グローバルで扱える状態の型を定義
type State = {
  session: Session | null
  setSession: (payload: Session | null) => void
  editedLure: EditedLure
  updateEditedLure: (payload: EditedLure) => void
  resetEditedLure: () => void
  editedReview: EditedReview
  updateEditedReview: (payload: EditedReview) => void
  resetEditedReview: () => void
  reviewedLureId: string
  updateReviewedLureId: (payload: string) => void
  resetReviewedLureId: () => void
  editedProfile: EditedProfile
  updateEditedProfile: (payload: EditedProfile) => void
  resetEditedProfile: () => void
}
export const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  editedLure: {
    id: '',
    name: '',
    brand_id: '',
    genre_id: '',
    image_url: '',
    length: '',
    weight: '',
    price: '',
  },
  updateEditedLure: (payload) =>
    set({
      editedLure: {
        id: payload.id,
        name: payload.name,
        brand_id: payload.brand_id,
        genre_id: payload.genre_id,
        image_url: payload.image_url,
        length: payload.length,
        weight: payload.weight,
        price: payload.price,
      },
    }),
  resetEditedLure: () =>
    set({
      editedLure: {
        id: '',
        name: '',
        brand_id: '',
        genre_id: '',
        image_url: '',
        length: '',
        weight: '',
        price: '',
      },
    }),
  editedReview: {
    id: '',
    user_id: '',
    lure_id: '',
    text: '',
    rating_1: 0,
    rating_2: 0,
    rating_3: 0,
    rating_4: 0,
    rating_5: 0,
  },
  updateEditedReview: (payload) =>
    set({
      editedReview: {
        id: payload.id,
        user_id: payload.user_id,
        lure_id: payload.lure_id,
        text: payload.text,
        rating_1: payload.rating_1,
        rating_2: payload.rating_2,
        rating_3: payload.rating_3,
        rating_4: payload.rating_4,
        rating_5: payload.rating_5,
      },
    }),
  resetEditedReview: () =>
    set({
      editedReview: {
        id: '',
        user_id: '',
        lure_id: '',
        text: '',
        rating_1: 0,
        rating_2: 0,
        rating_3: 0,
        rating_4: 0,
        rating_5: 0,
      },
    }),
  reviewedLureId: '',
  updateReviewedLureId: (payload) => set({ reviewedLureId: payload }),
  resetReviewedLureId: () => set({ reviewedLureId: '' }),
  editedProfile: {
    user_id: '',
    username: '',
    text: '',
    avatar_url: '',
  },
  updateEditedProfile: (payload) =>
    set({
      editedProfile: {
        user_id: payload.user_id,
        username: payload.username,
        text: payload.text,
        avatar_url: payload.avatar_url,
      },
    }),
  resetEditedProfile: () =>
    set({
      editedProfile: {
        user_id: '',
        username: '',
        text: '',
        avatar_url: '',
      },
    }),
}))
