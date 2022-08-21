const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

export async function getGoldMarket() {
  const url = `${API_URL}/market?currency=EUR&amount=1`
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
  const regex = /<span class=b>(\d*\.\d*)<\/span>/gm
  const res = regex.exec(content)
  if (!res) throw new Error('Could not get price of oneGram')
  return Number(res[1])
}
