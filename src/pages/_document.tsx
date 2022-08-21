import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr" className="h-screen bg-pattern text-text-and-icon">
      <Head>
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
