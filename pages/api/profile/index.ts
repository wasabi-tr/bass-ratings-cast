// Creating a new supabase server client object (e.g. in API route):
import { Database } from '@/database.types'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createPagesServerClient<Database>({
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
    .select('*')
    .eq('user_id', session?.user.id)
    .single()
  res.status(200).json(data)
}
