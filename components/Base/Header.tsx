import Link from 'next/link'
import { FC, Suspense, memo } from 'react'
import { Spinner } from './Spinner'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { ErrorBoundary } from 'react-error-boundary'
import dynamic from 'next/dynamic'
import { useMutateAuth } from '@/hooks/useMutateAuth'
import Image from 'next/image'
const User = dynamic(() => import('../Elements/User'), {
  ssr: false,
})

export const HeaderMemo: FC = () => {
  const { logoutMutation } = useMutateAuth()
  const logout = async () => {
    logoutMutation.mutate()
  }
  return (
    <header className="flex justify-between items-center px-5 h-16 shadow bg-white fixed top-0 left-0 w-full z-10">
      <div>
        <Link href={'/'} className="font-bold text-lg">
          LURE CASE
        </Link>
      </div>
      <nav className="ml-auto flex gap-6">
        <ul className="flex items-center gap-8 sm:hidden">
          <li>
            <Link
              href={'/lure'}
              className=" font-bold flex items-center gap-2 hover-animation-border"
            >
              <span>
                <Image src={'/icons/lure.svg'} alt="" width={24} height={24} />
              </span>
              ルアー一覧
            </Link>
          </li>
          <li>
            <Link
              href={'/brand'}
              className=" font-bold flex items-center gap-2  hover-animation-border"
            >
              <span>
                <Image src={'/icons/maker.svg'} alt="" width={20} height={20} />
              </span>
              メーカー一覧
            </Link>
          </li>
        </ul>
        <ErrorBoundary
          fallback={
            <ExclamationCircleIcon className="my-5 h-10 w-10 text-primary" />
          }
        >
          <Suspense fallback={<Spinner />}>
            <User />
          </Suspense>
        </ErrorBoundary>
      </nav>
      <div></div>
    </header>
  )
}

export const Header = memo(HeaderMemo)
