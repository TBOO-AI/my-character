//@delete:file
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getUserCetos(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // GET contract address
  const { birthdate, birthtime, gender } = req.query
  if (!birthdate || !birthtime || !gender) {
    res.status(400).json({ error: 'birthdate, birthtime, gender is required' })
    return
  }

  // fetch saju
  const saju = await fetch(
    `https://api.tboo.ai/saju?birth_date=${birthdate}&birth_time=${birthtime}&gender=${gender}`,
    {
      headers: {
        'X-API-KEY': process.env.X_API_KEY || '',
      },
    },
  )
  console.log(saju)
  const sajuData = await saju.json()
  res.status(200).json(sajuData)
}
