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

  res.status(200).json({ session })
}
