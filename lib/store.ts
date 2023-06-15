import { create } from 'zustand'
import { Session } from '@supabase/supabase-js'
import { EditedLure } from '@/types'

//グローバルで扱える状態の型を定義
type State = {
  session: Session | null
  setSession: (payload: Session | null) => void
  editedLure: EditedLure
  updateEditedLure: (payload: EditedLure) => void
  resetEditedLure: () => void
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
}))
