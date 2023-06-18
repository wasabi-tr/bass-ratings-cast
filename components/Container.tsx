import { FC } from 'react'

type Props = {
  children: React.ReactNode
}
const Container: FC<Props> = ({ children }) => {
  return <div className="w-11/12 m-auto px-3 max-md:w-full">{children}</div>
}

export default Container
