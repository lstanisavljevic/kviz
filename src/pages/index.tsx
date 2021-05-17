import Head from 'next/head'
import styles from 'static/scss/pages/Home.module.scss'

import Kviz from 'components/kviz/Kviz'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>A little quiz</h1>
      <p className={styles.explanation}>
        Find uses of metaphor and metonymy in underlined words and expressions
      </p>
      <main className={styles.main}>
        <Kviz />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
