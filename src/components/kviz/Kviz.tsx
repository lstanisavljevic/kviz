import { useState, useEffect } from 'react'
import { kviz } from './kviz.json'

import styles from './kviz.module.scss'

const Kviz = () => {
  const [level, setLevel] = useState(0)
  const [content, setContent] = useState([])
  // const [matches, setMatches] = useState(0)

  useEffect(() => {
    setContent(Object.entries(kviz[level]))
  }, [setLevel, setContent])

  function handleSelect(
    selectedExample: string,
    expectedOption: string,
    selectedOption: string
  ) {
    const outcome = expectedOption === selectedOption
    const row = content.findIndex((example) => example[0] === selectedExample)
    const nextContent = content.slice()
    nextContent[row].push('selected')
    nextContent[row].push(outcome)
    setContent(nextContent)
    console.warn(nextContent)
  }

  const options = ['metaphor', 'metonymy']
  return (
    <div className={styles.kviz}>
      {content.map((row) => {
        const [example, solution, status, isGood] = row
        const outcome = status ? (isGood ? 'correct' : 'incorrect') : ''
        return (
          <div
            key={example}
            className={`${styles.kviz__row} ${styles[`kviz__row--${status}`]}`}
          >
            <div className={`${styles.kviz__col} ${styles.kviz__example}`}>
              {example}
            </div>
            {!status &&
              options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  className={`${styles.kviz__col} ${styles.kviz__option} ${
                    styles[`kviz__${option}`]
                  }`}
                  onClick={() =>
                    !status && handleSelect(example, solution, option)
                  }
                >
                  {option}
                </button>
              ))}
            {status && (
              <div
                className={`${styles.kviz__col} ${styles.kviz__outcome} ${
                  styles[`kviz__col--${outcome}`]
                }`}
              ></div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Kviz
