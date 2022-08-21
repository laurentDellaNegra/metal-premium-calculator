import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="h-screen bg-pattern text-text-and-icon">
      <Head>
        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="manifest.webmanifest.json" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#1b2a32" />
        <meta name="msapplication-TileColor" content="#1b2a32" />
        <meta name="theme-color" content="#1b2a32" />
        {/* Meta */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="keywords" content="Gold" />
        <meta
          name="description"
          content="
          Gold Premium Calculator is a tool that helps investors calculate the premium on a bar, coin or any form of precious metal"
        />
        {/* Font */}
        <link
          rel="preload"
          href="fonts/Inter-roman-latin-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
