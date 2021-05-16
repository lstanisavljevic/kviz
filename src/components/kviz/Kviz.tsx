import { useState, useEffect } from 'react'
import { kviz } from './kviz.json'

import styles from './kviz.module.scss'

const Kviz = () => {
  const [level, setLevel] = useState(0)
  const [content, setContent] = useState([])
  // const [matches, setMatches] = useState(0)

  useEffect(() => {
    setContent(kviz[level])
  }, [setLevel, setContent])

  function handleSelect(
    selectedExample: string,
    expectedOption: string,
    selectedOption: string
  ) {
    const outcome = expectedOption === selectedOption
    const matchedRow = content.findIndex(
      (row) => row.example === selectedExample
    )
    const nextContent = content.slice()
    nextContent[matchedRow].status = 'selected'
    nextContent[matchedRow].outcome = outcome
    setContent(nextContent)
    console.warn(nextContent)
  }

  const options = ['metaphor', 'metonymy']
  return (
    <div className={styles.kviz}>
      {content.map((row) => {
        const { example, solution, explanation, status } = row
        const statusClassName = status ? 'selected' : 'unselected'
        return (
          <div key={example} className={`${styles.kviz__row}`}>
            <div
              className={`${styles.kviz__col} ${styles[`kviz__col--example`]} ${
                styles[`kviz__col--${statusClassName}`]
              }`}
            >
              {example}
              {status && (
                <div
                  className={`${styles.kviz__col} ${styles.kviz__explanation}`}
                >
                  {explanation}
                </div>
              )}
            </div>
            {options.map((option, optionIndex) => (
              <div key={optionIndex} className={styles.kviz__col}>
                <button
                  className={`${styles.kviz__option} ${
                    styles[`kviz__option--${statusClassName}`]
                  } ${styles[`kviz__${option}`]} ${
                    status &&
                    styles[
                      `kviz__option--${
                        solution === option ? 'correct' : 'incorrect'
                      }`
                    ]
                  }`}
                  onClick={() =>
                    !status && handleSelect(example, solution, option)
                  }
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Kviz
