import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req
  let revalidated = false
  try {
    await res.revalidate(`/lure/${id}`)
    await res.revalidate('/lure')
    revalidated = true
  } catch (err) {
    return console.log(err)
  }
  res.json({
    revalidated,
  })
}

export default handler
