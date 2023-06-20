import { create } from 'zustand'
import { Session } from '@supabase/supabase-js'
import { EditedLure, EditedReview } from '@/types'

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
    rating_1: null,
    rating_2: null,
    rating_3: null,
    rating_4: null,
    rating_5: null,
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
        rating_1: null,
        rating_2: null,
        rating_3: null,
        rating_4: null,
        rating_5: null,
      },
    }),
}))
