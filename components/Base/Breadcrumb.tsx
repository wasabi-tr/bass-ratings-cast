import { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Container from './Container'

type BreadcrumbItem = {
  name: string
  item: string
}

type BreadcrumbProps = {
  itemList: BreadcrumbItem[]
}

const Breadcrumb: FC<BreadcrumbProps> = ({ itemList }) => {
  return (
    <>
      <Head>
        <script
          key="breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: itemList.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@id': item.item,
                  name: item.name,
                },
              })),
            }),
          }}
        />
      </Head>
      <div className="bg-navy">
        <Container>
          <nav className="py-2 flex gap-2 items-center">
            {itemList.map((item, index) => {
              const isLastItem = index === itemList.length - 1
              return (
                <div
                  key={index}
                  className="text-xs text-white flex gap-2 items-center"
                >
                  {index > 0 && <span className="text-xs">＞</span>}
                  {isLastItem ? (
                    item.name
                  ) : (
                    <Link
                      href={item.item}
                      className="text-xs transition-all hover:opacity-75  text-white flex gap-2 items-center"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>
        </Container>
      </div>
    </>
  )
}

export default Breadcrumb
