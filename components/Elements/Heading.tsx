import { FC } from 'react'

type Props = {
  heading: string
}
const Heading: FC<Props> = ({ heading }) => {
  return (
    <h2 className="text-lg font-bold flex items-center space-x-2.5 mb-5 relative pl-4">
      {heading}
      <span className="absolute left-0 w-1 h-8 bg-primary rounded-full"></span>
    </h2>
  )
}

export default Heading
