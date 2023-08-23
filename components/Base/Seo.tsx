import Head from 'next/head'
import { FC } from 'react'
type Props = {
  pageTitle?: string
  pageDescription?: string
  pagePath?: string
  pageImg?: string
  pageImgWidth?: number
  pageImgHeight?: number
  noindex?: boolean
}
const Seo: FC<Props> = ({
  pageTitle,
  pageDescription,
  pagePath,
  pageImg,
  pageImgWidth,
  pageImgHeight,
  noindex,
}) => {
  const defaultTitle =
    'LURE CASE - 釣り人が投稿するブラックバスルアー専門のレビューサイト -'
  const defaultDescription =
    'LURE CASEはブラックバスルアー専門のレビューサイトです。釣り人が実際にレビューを投稿しているので釣れるルアーの情報やリアルな感想がよくわかる！'
  const defaultUrl = process.env.NEXT_PUBLIC_URL
  const defaultImgUrl = '/meta/ogp.jpg'

  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle
  const description = pageDescription ? pageDescription : defaultDescription
  const url = pagePath ? pagePath : defaultUrl
  const imgUrl = pageImg ? pageImg : defaultImgUrl
  const imgWidth = pageImgWidth ? pageImgWidth : 1280
  const imgHeight = pageImgHeight ? pageImgHeight : 640
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="canonical" href={url} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/meta/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="48x48"
        href="/meta/favicon.png"
      />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
    </Head>
  )
}
export default Seo
