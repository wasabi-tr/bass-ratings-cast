import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { slug },
  } = req
  let revalidated = false
  try {
    await res.revalidate(`/brand/${slug}`)
    await res.revalidate('/brand')
    revalidated = true
  } catch (err) {
    return console.log(err)
  }
  res.json({
    revalidated,
  })
}

export default handler
