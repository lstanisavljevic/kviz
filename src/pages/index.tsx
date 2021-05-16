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

      <main className={styles.main}>
        <Kviz />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
