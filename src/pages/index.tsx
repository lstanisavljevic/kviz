import Head from 'next/head'
import styles from 'static/scss/pages/Home.module.scss'

import Kviz from 'components/kviz/Kviz'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kviz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>Kviz</h1>
      <p className={styles.explanation}>
        Find uses of metaphor and metonymy in words and expressions written in
        bold
      </p>

      <Kviz />
    </div>
  )
}
