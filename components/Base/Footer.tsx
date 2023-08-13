import Link from 'next/link'
import React, { FC } from 'react'
import Container from './Container'

const Footer: FC = () => {
  return (
    <footer className="bg-navy">
      <Container>
        <div className="flex gap-32 py-24 ">
          <div className="text-white font-bold">Bass Rating Cast</div>
          <nav className="w-1/4">
            <p className="text-white font-bold pb-3 border-b border-white ">
              MENU
            </p>
            <ul className="grid grid-cols-1 gap-5 mt-4">
              <li>
                <Link href={'/'} className="text-white font-bold">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href={'/lure'} className="text-white font-bold">
                  ルアー一覧
                </Link>
              </li>
              <li>
                <Link href={'/brand'} className="text-white font-bold">
                  メーカー一覧
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
