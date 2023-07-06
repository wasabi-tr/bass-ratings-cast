import { supabase } from '@/lib/supabaseClient'
import { Lure } from '@/types'

export const getLuresStatic = async () => {
  const { data, error } = await supabase.from('lure_detail').select('*')

  if (error) throw new Error(error.message)
  return data
}
//現状だと商品がreviewの数だけviewが生成されています。また現状ではrating_1のみを参照していますが、rating_1~rating_5まであります。これを踏まえた上で以下の条件を満たすSQL文を書いてください。
//商品にはrating_1~rating_5の平均値をrating_averageとして渡す。
//商品は一つだけ出力したいのでreviewが2件以上あった場合はrating_averageをの平均値を渡して商品は一つだけaddする
