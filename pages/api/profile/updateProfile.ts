// Creating a new supabase server client object (e.g. in API route):
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  })
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession()

  if (!session)
    return res.status(401).json({
      error: 'not_authenticated',
      description:
        'The user does not have an active session or is not authenticated',
    })

  const data = await supabaseServerClient
    .from('profiles')
    .insert({
      user_id: session.user.id,
      username: session.user.email,
      text: '',
      avatar_url: '',
    })
    .select()
  //   if (error) throw new Error(error.message)

  res.status(200).json(data)
}
export default handler
