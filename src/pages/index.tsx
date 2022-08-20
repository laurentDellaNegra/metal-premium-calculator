import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'

import Card from '@/components/Card'
import GroupInput from '@/components/GroupInput'
import H1 from '@/components/H1'
import Input from '@/components/Input'
import Label from '@/components/Label'

const Home: NextPage = () => {
  const [market, setMarket] = useState(55.83)
  const [weight, setWeight] = useState(31.1)
  const [quality, setQuality] = useState(100)
  const [price, setPrice] = useState(0)

  const realWeight = (weight * quality) / 100
  const premium = ((price - realWeight * market) / (realWeight * market)) * 100
  const displayPremium = premium && premium > -100 ? `${premium.toFixed(2)}%` : ''

  const handleMarket = (e: ChangeEvent<HTMLInputElement>) => setMarket(Number(e.target.value))
  const handleWeight = (e: ChangeEvent<HTMLInputElement>) => setWeight(Number(e.target.value))
  const handleQuality = (e: ChangeEvent<HTMLInputElement>) => setQuality(Number(e.target.value))
  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))

  return (
    <div className="p-4">
      <Card.Container className="max-w-md m-auto">
        <Card.Content>
          <H1>Gold Calculator</H1>

          <div className="flex flex-col gap-4">
            <GroupInput className="flex gap-1 flex-wrap">
              <div className="flex flex-1 items-center justify-end">
                <Label htmlFor="market" className="mr-2">
                  Cours de l&apos;or :
                </Label>
              </div>
              <div className="flex flex-1 items-center justify-start">
                <Input
                  id="market"
                  name="Market"
                  type="number"
                  placeholder="55.83"
                  className="w-28"
                  value={market || ''}
                  onChange={handleMarket}
                  min={0}
                />
                <span className="group-focus-within:text-input-value">€</span>
              </div>
            </GroupInput>

            <GroupInput className="flex gap-1">
              <div className="flex flex-1 items-center justify-end">
                <Label htmlFor="weight" className="mr-2">
                  Poids brut :
                </Label>
              </div>
              <div className="flex flex-1 items-center justify-start">
                <Input
                  id="weight"
                  name="Weight"
                  type="number"
                  placeholder="31.1"
                  className="w-32"
                  value={weight || ''}
                  onChange={handleWeight}
                  min={0}
                />
                <span className="group-focus-within:text-input-value">g</span>
              </div>
            </GroupInput>

            <GroupInput className="flex gap-1">
              <div className="flex flex-1 items-center justify-end">
                <Label htmlFor="quality" className="mr-2">
                  Quality :
                </Label>
              </div>
              <div className="flex flex-1 items-center justify-start">
                <Input
                  id="quality"
                  name="Quality"
                  type="number"
                  placeholder="100"
                  className="w-20"
                  value={quality || ''}
                  onChange={handleQuality}
                  min={0}
                  max={100}
                />
                <span className="group-focus-within:text-input-value">%</span>
              </div>
            </GroupInput>

            <GroupInput className="flex gap-1">
              <div className="flex flex-1 items-center justify-end">
                <Label htmlFor="quality" className="mr-2">
                  Poids fin :
                </Label>
              </div>
              <div className="flex flex-1 items-center justify-start">
                <div>{realWeight}g</div>
              </div>
            </GroupInput>

            <GroupInput className="flex gap-1">
              <div className="flex flex-1 items-center justify-end">
                <Label htmlFor="weight" className="mr-2">
                  Prix de vente :
                </Label>
              </div>
              <div className="flex flex-1 items-center justify-start">
                <Input
                  id="price"
                  name="Price"
                  type="number"
                  placeholder="180"
                  className="w-32"
                  value={price || ''}
                  onChange={handlePrice}
                  min={0}
                />
                <span className="group-focus-within:text-input-value">€</span>
              </div>
            </GroupInput>
          </div>
        </Card.Content>

        {/* Card footer */}
        <Card.Footer>Prime: {displayPremium}</Card.Footer>
      </Card.Container>
    </div>
  )
}

export default Home
