import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''
const HEADERS = new Headers()
HEADERS.append('x-access-token', API_KEY)
HEADERS.append('Content-Type', 'application/json')

const OPTIONS = {
  method: 'GET',
  headers: HEADERS,
  redirect: 'follow',
}

const TwoHourAgo = (currentTimeStamp: number) => {
  const hour = 1000 * 60 * 120
  const hourago = Date.now() - hour

  return currentTimeStamp > hourago
}

// Very simple cache to limit API calls (limit: 500 calls per months max)
let CONTENT_CACHED: any

async function getGoldMarket(currency: string) {
  const url = `${API_URL}/api/XAU/${currency}`
  try {
    if (!CONTENT_CACHED || TwoHourAgo(CONTENT_CACHED)) {
      console.log('Data fetched')
      const response = await fetch(url, OPTIONS as any)
      CONTENT_CACHED = await response.json()
    } else {
      console.log('Data from cache')
    }
    console.log(CONTENT_CACHED)

    return {
      oneGram: CONTENT_CACHED.price_gram_24k,
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      // return { error: error.message }
    } else {
      // return { error: String(error) }
    }
    return { oneGram: 0 }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await getGoldMarket(req.query.currency as string)
  res.status(200).json(data)
}
