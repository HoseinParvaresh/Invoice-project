import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fa">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#222222" />
        <link rel="icon" href="/icon512_rounded.png" />
        <link rel="apple-touch-icon" href="/icon512_rounded.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
