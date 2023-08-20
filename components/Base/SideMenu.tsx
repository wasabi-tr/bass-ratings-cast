import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

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
        className={`hidden relative w-11 h-11 bg-primary z-50 cursor-pointer content-center justify-items-center gap-1 rounded-md ml-3 ${
          open && 'gap-0'
        } sm:grid`}
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
      >
        <span
          className={`bg-white block transition h-2px w-6 ${
            open && 'transform -rotate-45 '
          }`}
          style={spanStyle}
        ></span>
        <span
          className={`bg-white block transition h-2px w-6 ${
            open && 'opacity-0'
          }`}
          style={spanStyle}
        ></span>
        <span
          className={`bg-white block transition h-2px w-6 ${
            open && 'transform rotate-45'
          }`}
          style={spanStyle}
        ></span>
      </button>
      <nav
        id="navigation"
        aria-hidden={!open}
        className={`fixed top-0 left-0 w-full h-screen bg-navy z-40 transition duration-500 translate-x-full ${
          open && 'translate-x-0'
        }`}
      >
        <div className="py-14 px-6">
          <ul className="grid grid-cols-1 mt-4">
            <li>
              <Link
                href={'/'}
                className="text-white font-bold py-3 border-b border-white block"
              >
                ホーム
              </Link>
            </li>
            <li>
              <Link
                href={'/lure'}
                className="text-white font-bold py-3 border-b border-white block"
              >
                ルアー一覧
              </Link>
            </li>
            <li>
              <Link
                href={'/brand'}
                className="text-white font-bold py-3 border-b border-white block"
              >
                メーカー一覧
              </Link>
            </li>
          </ul>
          <div className="w-64 h-12 mt-6 mx-auto">
            <Link href={'/auth'} className="btn-primary">
              ログイン/新規会員登録
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default SideMenu
