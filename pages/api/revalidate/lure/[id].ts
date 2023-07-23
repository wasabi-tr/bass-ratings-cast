import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Revalidate lure')
  const {
    query: { id },
  } = req
  let revalidated = false
  try {
    await res.revalidate(`/lure/${id}`)
    revalidated = true
  } catch (err) {
    return console.log(err)
  }
  res.json({
    revalidated,
  })
}

export default handler
