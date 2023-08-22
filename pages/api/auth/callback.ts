import { NextApiHandler } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const handler: NextApiHandler = async (req, res) => {
  const { code } = req.query

  console.log(`コード${code}`)

  if (code) {
    const supabase = createPagesServerClient({ req, res })
    const result = await supabase.auth.exchangeCodeForSession(String(code))
    //プロフィール登録の処理
    // const {
    //   data: { session },
    // } = await supabase.auth.getSession()

    // const { data, error } = await supabase.from('profiles').insert({
    //   user_id: session?.user.id,
    //   username: session?.user.email,
    //   text: '',
    //   avatar_url: '',
    // })
  }

  res.redirect('/')
}

export default handler
