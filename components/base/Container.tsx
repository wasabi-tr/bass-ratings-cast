import { FC } from 'react'

type Props = {
  children: React.ReactNode
}
const Container: FC<Props> = ({ children }) => {
  return (
    <div>
      <div className="inner">{children}</div>
    </div>
  )
}

export default Container
