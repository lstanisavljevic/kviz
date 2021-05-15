import { useState, useEffect } from 'react'
import { kviz } from './kviz.json'

import styles from './kviz.module.scss'

const Kviz = () => {
  const [level, setLevel] = useState(0)
  const [content, setContent] = useState([])
  const [matches, setMatches] = useState(0)

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
        const outcome = status ? (isGood ? 'correct' : 'incorrect') : 'nada'
        return (
          <div
            key={example}
            className={`${styles.kviz__row} ${styles[`kviz__row--${status}`]} ${
              styles[`kviz__row--${outcome}`]
            }`}
          >
            <div className={`${styles.kviz__col} ${styles.kviz__example}`}>
              {example}
            </div>
            {options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={`${styles.kviz__col} ${styles.kviz__option} ${
                  styles[`kviz__${option}`]
                }`}
                onClick={() =>
                  !status && handleSelect(example, solution, option)
                }
              >
                {option}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Kviz
