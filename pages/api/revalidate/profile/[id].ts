import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Revalidate profile')
  const {
    query: { id },
  } = req
  let revalidated = false
  try {
    await res.revalidate(`/profile/${id}`)
    revalidated = true
  } catch (err) {
    return console.log(err)
  }
  res.json({
    revalidated,
  })
}

export default handler
