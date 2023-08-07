import Link from 'next/link'
import { FC, Suspense, memo } from 'react'
import { Spinner } from './Spinner'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { ErrorBoundary } from 'react-error-boundary'
import dynamic from 'next/dynamic'
const User = dynamic(() => import('../Elements/User'), {
  ssr: false,
})

export const HeaderMemo: FC = () => {
  return (
    <header className="flex justify-between w-full px-5 py-6 shadow bg-white">
      <div>
        <Link href={'/'} className="font-bold">
          Bass Ratings Cast
        </Link>
      </div>
      <nav className="ml-auto flex gap-6">
        <ul className="flex items-center gap-6">
          <li>
            <Link href={'/lure'} className=" font-bold">
              ルアー一覧
            </Link>
          </li>
          <li>
            <Link href={'/brand'} className=" font-bold">
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
    </header>
  )
}

export const Header = memo(HeaderMemo)
