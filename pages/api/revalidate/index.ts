import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let revalidated = false
  try {
    await res.revalidate('/')
    revalidated = true
  } catch (err) {
    return console.log(err)
  }
  res.json({
    revalidated,
  })
}

export default handler
