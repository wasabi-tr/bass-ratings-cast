import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import Container from './Container'

const SideMenu: FC = () => {
  const [open, setIsOpen] = useState(false)
  const spanStyle = open ? { gridArea: '1/1' } : {}

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    // コンポーネントがアンマウントされる時にスタイルをリセット
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])
  return (
    <div>
      <button
        type="button"
        aria-controls="navigation"
        aria-expanded={open}
        aria-label="メニューを開きます"
        className={`grid relative w-11 h-11 bg-primary z-50 cursor-pointer content-center justify-items-center gap-1 rounded-md ml-3 ${
          open && 'gap-0'
        } sm:w-8 sm:h-8 sm:ml-2 `}
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
      >
        <span
          className={`bg-white block transition h-2px w-6 ${
            open && 'transform -rotate-45 '
          } sm:w-5`}
          style={spanStyle}
        ></span>
        <span
          className={`bg-white block transition h-2px w-6 ${
            open && 'opacity-0'
          } sm:w-5`}
          style={spanStyle}
        ></span>
        <span
          className={`bg-white block transition h-2px w-6 ${
            open && 'transform rotate-45'
          } sm:w-5`}
          style={spanStyle}
        ></span>
      </button>
      <nav
        id="navigation"
        aria-hidden={!open}
        className={`fixed top-0 right-0 w-full h-screen bg-navy bg-opacity-70 z-40 transition duration-300 flex justify-center items-center  ${
          !open ? 'opacity-0 invisible' : 'visible opacity-100:'
        }`}
      >
        <div className=" ">
          <Container>
            <div className="bg-white rounded-md px-8 py-11 mt-8 sm:px-5">
              <ul className="grid grid-cols-1 mt-4">
                <li>
                  <Link
                    href={'/'}
                    className="text-primary font-bold pb-4 border-b border-primary block"
                  >
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/lure'}
                    className="text-primary font-bold py-4 border-b border-primary block"
                  >
                    ルアー一覧
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/brand'}
                    className="text-primary font-bold py-4 border-b border-primary block"
                  >
                    メーカー一覧
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/genre'}
                    className="text-primary font-bold py-4 border-b border-primary block"
                  >
                    ジャンル一覧
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/search'}
                    className="text-primary font-bold py-4 border-b border-primary block"
                  >
                    ルアー検索
                  </Link>
                </li>
              </ul>
              <div className="w-64 h-12 mt-6 mx-auto sm:h-">
                <Link href={'/auth'} className="btn-primary">
                  ログイン/新規会員登録
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </nav>
    </div>
  )
}

export default SideMenu
