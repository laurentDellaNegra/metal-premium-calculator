import { QueryFunctionContext } from 'react-query'

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

export async function getGoldMarket({ queryKey }: QueryFunctionContext<[string, string]>) {
  const [, queryParam] = queryKey
  const url = `${API_URL}/market/XAU${queryParam}:CUR`
  console.log(url)
  try {
    const response = await fetch(url)
    const content = await response.text()
    return {
      oneGram: getOneGram(content),
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

function getOneGram(content: string): number {
  const regex = /<span class=\"priceText__\w*\">((?!,$)[\d,.]+)<\/span>/gm
  const res = regex.exec(content)
  if (!res) throw new Error('Could not get price of oneGram')
  console.log('getOneGram res[1]', res[1])
  console.log('getOneGram res[1].replace(/,/g,)', res[1].replace(/,/g, ''))
  // convert to number
  const priceNumber = parseFloat(res[1].replace(/,/g, ''))
  const priceByGram: number = convertOncebyGram(priceNumber)
  return priceByGram
}

function convertOncebyGram(priceOnce: number): number {
  return priceOnce / 31.1
}
