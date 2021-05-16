import { useState, useEffect } from 'react'
import { kviz } from './kviz.json'

import styles from './kviz.module.scss'

const Kviz = () => {
  const [level, setLevel] = useState(0)
  const [content, setContent] = useState([])
  const [answersCount, setAnswersCount] = useState(0)

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
    setAnswersCount(answersCount + 1)
  }

  function processHtml(input: string) {
    return { __html: input.replace(/__(.+)__/g, '<strong>$1</strong>') }
  }

  const options = ['metaphor', 'metonymy']
  return (
    <div className={styles.kviz}>
      <div>{answersCount}</div>
      {content.map((row) => {
        const { example, solution, explanation, status, outcome } = row
        const statusClassName = status ? 'selected' : 'unselected'
        const exampleRendered = (
          <span dangerouslySetInnerHTML={processHtml(example)} />
        )
        const explanationRendered = (
          <span dangerouslySetInnerHTML={processHtml(explanation)} />
        )
        return (
          <div key={example} className={`${styles.kviz__row}`}>
            <div
              className={`${styles.kviz__col} ${styles[`kviz__col--example`]} ${
                styles[`kviz__col--${statusClassName}`]
              }`}
            >
              {exampleRendered}
              {status && (
                <div
                  className={`${styles.kviz__col} ${styles.kviz__explanation}`}
                >
                  {explanationRendered}
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
                      }--${outcome ? 'success' : 'fail'}`
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
      {answersCount === content.length && (
        <div>
          <button className={styles.kviz__option}>Ajde</button>
        </div>
      )}
    </div>
  )
}

export default Kviz
