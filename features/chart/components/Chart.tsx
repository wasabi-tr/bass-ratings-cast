import { FC } from 'react'
import dynamic from 'next/dynamic'
import { Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
const RadarChart = dynamic(
  () => import('recharts').then((mod) => mod.RadarChart),
  {
    ssr: false,
  }
)
type LureData = {
  name: string
  rating_1: number | null
  rating_2: number | null
  rating_3: number | null
  rating_4: number | null
  rating_5: number | null
}
type Props = {
  lureData: LureData
}
const Chart: FC<Props> = ({ lureData }) => {
  const data = [
    {
      subject: '評価１',
      A: lureData?.rating_1,
      fullMark: 5,
    },
    {
      subject: '評価２',
      A: lureData?.rating_2,
      fullMark: 5,
    },
    {
      subject: '評価３',
      A: lureData?.rating_3,
      fullMark: 5,
    },
    {
      subject: '評価４',
      A: lureData?.rating_4,
      fullMark: 5,
    },
    {
      subject: '評価５',
      A: lureData?.rating_5,
      fullMark: 5,
    },
  ]
  return (
    <RadarChart
      outerRadius={200}
      width={500}
      height={500}
      data={data}
      className="mx-auto"
    >
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
