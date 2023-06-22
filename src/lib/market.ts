import { QueryFunctionContext } from 'react-query'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || ''

export async function getGoldMarket({ queryKey }: QueryFunctionContext<[string, string]>) {
  const [, queryParam] = queryKey
  const url = `${SERVER_URL}/api/gold/${queryParam}`
  // console.log(url)
  try {
    const response = await fetch(url)
    const content = await response.json()
    // console.log('content', content)
    return content
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
