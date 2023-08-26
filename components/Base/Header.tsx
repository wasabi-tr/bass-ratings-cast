import Link from 'next/link'
import { FC, Suspense, memo } from 'react'
import { Spinner } from './Spinner'
import {
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import { ErrorBoundary } from 'react-error-boundary'
import dynamic from 'next/dynamic'
import { useMutateAuth } from '@/hooks/useMutateAuth'
import Image from 'next/image'
import SideMenu from './SideMenu'
import Container from './Container'
const User = dynamic(() => import('../Elements/User'), {
  ssr: false,
})

export const HeaderMemo: FC = () => {
  const { logoutMutation } = useMutateAuth()
  const logout = async () => {
    logoutMutation.mutate()
  }
  return (
    <header className="shadow bg-white fixed top-0 left-0 w-full z-10 ">
      <Container>
        <div className="flex justify-between items-center h-16 ">
          <div>
            <Link href={'/'} className="font-bold text-lg">
              LURE CASE
            </Link>
          </div>
          <nav className="ml-auto flex gap-6 items-center sm:gap-3">
            <ul className="flex items-center gap-8 sm:hidden">
              <li>
                <Link
                  href={'/lure'}
                  className=" font-bold flex items-center gap-1 hover-animation-border primary"
                >
                  <span>
                    <Image
                      src={'/icons/lure.svg'}
                      alt=""
                      width={24}
                      height={24}
                    />
                  </span>
                  ルアー一覧
                </Link>
              </li>
              <li>
                <Link
                  href={'/brand'}
                  className=" font-bold flex items-center gap-1  hover-animation-border primary"
                >
                  <span>
                    <Image
                      src={'/icons/maker.svg'}
                      alt=""
                      width={18}
                      height={1}
                    />
                  </span>
                  メーカー一覧
                </Link>
              </li>
              <li>
                <Link
                  href={'/search'}
                  className=" font-bold flex items-center gap-1  hover-animation-border primary"
                >
                  <span>
                    <MagnifyingGlassIcon className="w-6 h-6 text-gray-950 " />
                  </span>
                  検索
                </Link>
              </li>
            </ul>
            <ErrorBoundary
              fallback={
                <ExclamationCircleIcon className="h-10 w-10 text-primary" />
              }
            >
              <Suspense fallback={<Spinner />}>
                <User />
              </Suspense>
            </ErrorBoundary>
          </nav>
          <SideMenu />
        </div>
      </Container>
    </header>
  )
}

export const Header = memo(HeaderMemo)
