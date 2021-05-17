import { useState, useEffect, useRef } from 'react'
import { kviz } from './kviz.json'

import styles from './kviz.module.scss'

const Kviz = () => {
  const [level, setLevel] = useState(0)
  const [content, setContent] = useState([])
  const [answersCount, setAnswersCount] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const kvizRef = useRef(null)

  const settings = {
    questionTimeout: 2400,
  }

  useEffect(() => {
    setContent(kviz[level])
  }, [setLevel, setContent])

  function scrollToBottom() {
    const kvizElement = kvizRef.current
    kvizElement.scrollTop = kvizElement.scrollHeight
  }

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
    scrollToBottom()
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1)
      scrollToBottom()
    }, settings.questionTimeout)
  }

  function handleContinueClick() {
    const nextLevel = level + 1
    setLevel(nextLevel)
    setContent(kviz[nextLevel])
    setAnswersCount(0)
    setCurrentQuestion(0)
  }

  function processHtml(input: string) {
    const inputArray = input.split('__')
    return inputArray.map((item, index) => {
      const key = `${item}${index}`
      if (index > 0 && index < inputArray.length - 1) {
        return <strong key={key}>{item}</strong>
      }
      return <span key={key}>{item}</span>
    })
  }

  interface Row {
    outcome: boolean
    solution: string
  }

  function processExplanation(row: Row) {
    const { outcome, solution } = row
    return `${outcome === true ? 'Yes' : 'No'}, this is a ${solution}, because `
  }

  const options = ['metaphor', 'metonymy']
  return (
    <div className={styles.kviz} ref={kvizRef}>
      {content.map((row, rowIndex) => {
        if (rowIndex > currentQuestion) {
          return null
        }
        const { example, solution, explanation, model, status, outcome } = row
        const statusClassName = status ? 'selected' : 'unselected'
        const exampleRendered = processHtml(example)
        const explanationRendered = (
          <>
            <span>{processExplanation(row)}</span> {processHtml(explanation)}
          </>
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
                <div className={`${styles.kviz__explanation}`}>
                  {explanationRendered}
                  <div className={`${styles.kviz__model}`}>
                    It is based on conceptual {solution}:{' '}
                    <span className={`${styles.kviz__model__name}`}>
                      {model}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={`${styles.kviz__col} ${
                  styles[`kviz__col--outcome`]
                }`}
              >
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
        <div className={styles.kviz__footer}>
          {level < kviz.length - 1 ? (
            <button
              className={`${styles.kviz__option} ${
                styles[`kviz__option--continue`]
              }`}
              onClick={() => handleContinueClick()}
            >
              Next
            </button>
          ) : (
            <span>Bravo</span>
          )}
        </div>
      )}
    </div>
  )
}

export default Kviz
