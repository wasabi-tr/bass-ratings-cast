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
    bland_id: '',
    length: '',
    weight: '',
  },
  updateEditedLure: (payload) =>
    set({
      editedLure: {
        id: payload.id,
        name: payload.name,
        bland_id: payload.bland_id,
        length: payload.length,
        weight: payload.weight,
      },
    }),
  resetEditedLure: () =>
    set({
      editedLure: {
        id: '',
        name: '',
        bland_id: '',
        length: '',
        weight: '',
      },
    }),
}))
