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

  function getClassNames(status: string, outcome: string) {
    const statusClassName = status ? 'selected' : 'unselected'
    const outcomeClassName = status ? (outcome ? 'correct' : 'incorrect') : ''
    return [statusClassName, outcomeClassName]
  }

  const options = ['metaphor', 'metonymy']
  return (
    <div className={styles.kviz}>
      {content.map((row) => {
        const { example, solution, explanation, status, outcome } = row
        const [statusClassName, outcomeClassName] = getClassNames(
          status,
          outcome
        )
        return (
          <div key={example} className={`${styles.kviz__row}`}>
            <div
              className={`${styles.kviz__col} ${
                styles[`kviz__col--${statusClassName}`]
              }`}
            >
              {example}
              {status && (
                <div
                  className={`${styles.kviz__col} ${styles.kviz__outcome} ${
                    styles[`kviz__col--${outcomeClassName}`]
                  }`}
                >
                  {explanation}
                </div>
              )}
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
          </div>
        )
      })}
    </div>
  )
}

export default Kviz
