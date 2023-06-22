import { load } from 'cheerio'
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

const OneHourAgo = (currentTimeStamp: number) => {
  const hour = 1000 * 60 * 60
  const hourago = Date.now() - hour

  return currentTimeStamp > hourago
}

// Very simple cache to limit API calls (limit: 500 calls per months max)
const CONTENT_CACHED = new Map()

async function getGoldMarketGoldApi(currency: string) {
  const url = `${API_URL}/api/XAU/${currency}`
  let contentCached = CONTENT_CACHED.get(url)
  try {
    if (!contentCached || TwoHourAgo(contentCached?.timestamp)) {
      // console.log('Data fetched')
      const response = await fetch(url, OPTIONS as any)
      const json = await response.json()
      // console.log(json)
      CONTENT_CACHED.set(url, json)
      contentCached = CONTENT_CACHED.get(url)
    } else {
      // console.log('Data from cache')
    }
    return {
      oneGram: contentCached.price_gram_24k,
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

// crawl https://www.livepriceofgold.com/
async function getGoldMarket(currency: string) {
  // console.log('currency', currency)
  const url = 'https://www.livepriceofgold.com/'
  let contentCached = CONTENT_CACHED.get(url)
  try {
    if (!contentCached || OneHourAgo(contentCached?.timestamp)) {
      // console.log('Data fetched')
      const response = await fetch(url, OPTIONS as any)
      const text = await response.text()
      const $ = load(text)
      const EUR = Number($('span[data-price="GXAUUSD_EUR"]').first().text().trim())
      const USD = Number($('span[data-price="GXAUUSD"]').first().text().trim())
      const CHF = Number($('span[data-price="GXAUUSD_CHF"]').first().text().trim())

      CONTENT_CACHED.set(url, { EUR, USD, CHF })
      contentCached = CONTENT_CACHED.get(url)
    } else {
      // console.log('Data from cache')
    }
    return {
      oneGram: contentCached[currency],
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
