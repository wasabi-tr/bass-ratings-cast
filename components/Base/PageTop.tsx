import { FC } from 'react'
import Container from './Container'

type Props = {
  title: string
}
const PageTop: FC<Props> = ({ title }) => {
  return (
    <div className="bg-primary">
      <Container>
        <div className="py-20 sm:py-10">
          <h2 className="text-white font-bold text-lg">{title}</h2>
        </div>
      </Container>
    </div>
  )
}

export default PageTop
