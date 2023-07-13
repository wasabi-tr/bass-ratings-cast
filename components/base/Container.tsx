import { FC } from 'react'

type Props = {
  children: React.ReactNode
  padding?: string
}
const Container: FC<Props> = ({ children, padding = '' }) => {
  return (
    <div>
      <div className={`inner ${padding}`}>{children}</div>
    </div>
  )
}

export default Container
