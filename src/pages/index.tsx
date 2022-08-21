import type { NextPage } from 'next'
import Image from 'next/future/image'
import Head from 'next/head'
import { ChangeEvent, useState } from 'react'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import Card from '@/components/Card'
import GroupInput from '@/components/GroupInput'
import H1 from '@/components/H1'
import Input from '@/components/Input'
import Label from '@/components/Label'
import List from '@/components/List'
import Loader from '@/components/Loader'
import { getGoldMarket } from '@/lib/market'
import GoldLogo from '@/public/logos/gold.svg'
import SilverLogo from '@/public/logos/silver.svg'
import { currencies } from '@/types/Currencies'

const Home: NextPage = () => {
  // get this from localstorage
  const [currency, setCurrency] = useState('EUR')
  const [weight, setWeight] = useState(31.1)
  const [quality, setQuality] = useState(100)
  const [price, setPrice] = useState(0)

  const { data: marketData, isFetching } = useQuery(['gold', currency], getGoldMarket, {
    refetchInterval: 1000 * 60, // refetch all minutes
  })

  const symbol = currencies.get(currency)
  const market = marketData?.oneGram || 0
  const realWeight = (weight * quality) / 100
  const premium = ((price - realWeight * market) / (realWeight * market)) * 100
  const displayPremium = quality && premium && premium > -100 ? `${premium.toFixed(2)}%` : ''

  const handleWeight = (e: ChangeEvent<HTMLInputElement>) => setWeight(Number(e.target.value))
  const handleQuality = (e: ChangeEvent<HTMLInputElement>) => setQuality(Number(e.target.value))
  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))
  const handleCurrency = (value: string) => setCurrency(value)

  return (
    <>
      <Head>
        <title>Gold Premium Calculator</title>
      </Head>
      <div className="p-4 md:p-9 lg:p-24 xl:p-32">
        <Card.Container className=" max-w-md m-auto">
          <Card.Content>
            <H1>
              <Image src={GoldLogo} alt="Gold" className="h-16 w-auto" priority unoptimized />
            </H1>

            <div className="flex flex-col gap-4">
              <List
                values={Array.from(currencies, ([name]) => name)}
                selectedValue={currency}
                onChange={handleCurrency}
              />
              <GroupInput className="flex gap-1 flex-wrap">
                <div className="flex flex-1 items-center justify-end">
                  <Label className="mr-2">Market price :</Label>
                </div>
                <div className="flex flex-1 items-center justify-start">
                  {market ? `${market} ${symbol}` : '--'}
                  {isFetching ? <Loader className="ml-2 h-5 w-5 text-gold" /> : null}
                </div>
              </GroupInput>

              <GroupInput className="flex gap-1">
                <div className="flex flex-1 items-center justify-end">
                  <Label htmlFor="weight" className="mr-2">
                    Total weight :
                  </Label>
                </div>
                <div className="flex flex-1 items-center justify-start">
                  <Input
                    id="weight"
                    name="Weight"
                    type="number"
                    placeholder="31.1"
                    className="max-w-[128px]"
                    value={weight || ''}
                    onChange={handleWeight}
                    min={0}
                  />
                  <span className="group-focus-within:text-gold">g</span>
                </div>
              </GroupInput>

              <GroupInput className="flex gap-1">
                <div className="flex flex-1 items-center justify-end">
                  <Label htmlFor="quality" className="mr-2">
                    Purity :
                  </Label>
                </div>
                <div className="flex flex-1 items-center justify-start">
                  <Input
                    id="quality"
                    name="Quality"
                    type="number"
                    placeholder="100"
                    className="max-w-[80px]"
                    value={quality || ''}
                    onChange={handleQuality}
                    min={0}
                    max={100}
                  />
                  <span className="group-focus-within:text-gold">%</span>
                </div>
              </GroupInput>

              <GroupInput className="flex gap-1">
                <div className="flex flex-1 items-center justify-end">
                  <Label className="mr-2">Real weight :</Label>
                </div>
                <div className="flex flex-1 items-center justify-start">
                  <div>{realWeight}g</div>
                </div>
              </GroupInput>

              <GroupInput className="flex gap-1">
                <div className="flex flex-1 items-center justify-end">
                  <Label htmlFor="price" className="mr-2">
                    Price :
                  </Label>
                </div>
                <div className="flex flex-1 items-center justify-start">
                  <Input
                    id="price"
                    name="Price"
                    type="number"
                    placeholder="180"
                    className="max-w-[128px]"
                    value={price || ''}
                    onChange={handlePrice}
                    min={0}
                  />
                  <span className="group-focus-within:text-gold">{symbol}</span>
                </div>
              </GroupInput>
            </div>
          </Card.Content>

          {/* Card footer */}
          <Card.Footer className="text-center text-xl">
            Premium : <span className="text-gold">{displayPremium || '--'}</span>
          </Card.Footer>
        </Card.Container>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['gold', 'EUR'], getGoldMarket)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
