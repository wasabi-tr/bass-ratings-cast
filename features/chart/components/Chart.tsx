import { FC } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'

type LureData = {
  name: string
  rating_1: number
  rating_2: number
  rating_3: number
  rating_4: number
  rating_5: number
}
type Props = {
  lureData: LureData
}
const Chart: FC<Props> = ({ lureData }) => {
  const data = [
    {
      subject: '評価１',
      A: lureData.rating_1,
      fullMark: 5,
    },
    {
      subject: '評価２',
      A: lureData.rating_2,
      fullMark: 5,
    },
    {
      subject: '評価３',
      A: lureData.rating_3,
      fullMark: 5,
    },
    {
      subject: '評価４',
      A: lureData.rating_4,
      fullMark: 5,
    },
    {
      subject: '評価５',
      A: lureData.rating_5,
      fullMark: 5,
    },
  ]
  return (
    <RadarChart outerRadius={200} width={500} height={500} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis
        domain={[0, 5]}
        tickCount={6}
        axisLine={false}
        tickLine={false}
        angle={90}
        // tick={false}
      />

      <Radar
        name="test"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      ></Radar>
    </RadarChart>
  )
}

export default Chart
