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
      <div className="">
        <Container>
          <nav className="py-3">
            {itemList.map((item, index) => {
              const isLastItem = index === itemList.length - 1
              return (
                <span key={index} className="text-sm ">
                  {index > 0 && ' > '}
                  {isLastItem ? (
                    item.name
                  ) : (
                    <Link
                      href={item.item}
                      className="text-sm transition-all hover:opacity-75"
                    >
                      {item.name}
                    </Link>
                  )}
                </span>
              )
            })}
          </nav>
        </Container>
      </div>
    </>
  )
}

export default Breadcrumb
