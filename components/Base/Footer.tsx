import Link from 'next/link'
import React, { FC } from 'react'
import Container from './Container'

const Footer: FC = () => {
  return (
    <footer className="bg-navy">
      <Container>
        <div className="flex gap-32 py-16 ">
          <div className="text-white font-bold">LURE CASE</div>
          <nav className="w-1/4">
            <p className="text-white font-bold pb-3 border-b border-white ">
              MENU
            </p>
            <ul className="grid grid-cols-1 gap-5 mt-4">
              <li>
                <Link
                  href={'/'}
                  className="relative text-white font-bold hover-animation-border white text-sm"
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href={'/lure'}
                  className="relative text-white font-bold hover-animation-border white text-sm"
                >
                  ルアー一覧
                </Link>
              </li>
              <li>
                <Link
                  href={'/brand'}
                  className="relative text-white font-bold hover-animation-border white text-sm"
                >
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
