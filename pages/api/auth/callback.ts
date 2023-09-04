import { NextApiHandler } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const handler: NextApiHandler = async (req, res) => {
  const { code } = req.query

  if (code) {
    const supabase = createPagesServerClient({ req, res })
    const result = await supabase.auth.exchangeCodeForSession(String(code))
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const { data, error } = await supabase.from('profiles').insert({
      user_id: session?.user.id,
      username: session?.user.email,
      text: '',
      avatar_url: '',
    })
  }

  res.redirect('/')
}

export default handler
