import { NextApiHandler } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const handler: NextApiHandler = async (req, res) => {
  const { code } = req.query

  console.log(`コード${code}`)
  const {
    data: { session },
  } = await createPagesServerClient({ req, res }).auth.getSession()
  console.log(`セッション${session}`)

  if (code) {
    const supabase = createPagesServerClient({ req, res })
    const result = await supabase.auth.exchangeCodeForSession(String(code))
    console.log(`結果　${result}`)
  }

  res.redirect('/')
}

export default handler
