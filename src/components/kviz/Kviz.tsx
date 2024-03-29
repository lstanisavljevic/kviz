import { useState, useEffect, useRef } from 'react'
import { kviz } from './kviz.json'

import styles from './kviz.module.scss'

const Kviz = () => {
  const [isStarted, setIsStarted] = useState(false)
  const [level, setLevel] = useState(0)
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState([])
  const [answersCount, setAnswersCount] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const kvizRef = useRef(null)

  const settings = {
    questionTimeout: 1400,
  }

  useEffect(() => {
    setTitle(kviz[level].title)
    setQuestions(kviz[level].questions)
  }, [setLevel, setTitle, setQuestions])

  function scrollToBottom() {
    const kvizElement = kvizRef.current
    kvizElement.scrollIntoViewIfNeeded({ behavior: 'smooth' })
  }

  function handleSelect(
    selectedExample: string,
    expectedOption: string,
    selectedOption: string
  ) {
    const outcome = expectedOption === selectedOption
    const matchedRow = questions.findIndex(
      (row) => row.example === selectedExample
    )
    const nextContent = questions.slice()
    nextContent[matchedRow].status = 'selected'
    nextContent[matchedRow].outcome = outcome
    setQuestions(nextContent)
    setTimeout(() => {
      setAnswersCount(answersCount + 1)
      setCurrentQuestion(currentQuestion + 1)
      scrollToBottom()
    }, settings.questionTimeout)
  }

  function handleContinueClick() {
    const nextLevel = level + 1
    setLevel(nextLevel)
    setTitle(kviz[nextLevel].title)
    setQuestions(kviz[nextLevel].questions)
    setAnswersCount(0)
    setCurrentQuestion(0)
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
  return isStarted ? (
    <div className={styles.kviz}>
      <h2 className={styles.kviz__subtitle}>
        {level + 1}. {title}
      </h2>
      {questions.map((row, rowIndex) => {
        if (rowIndex > currentQuestion) {
          return null
        }
        const { example, solution, explanation, model, status, outcome } = row
        const statusClassName = status ? 'selected' : 'unselected'
        const explanationRendered = (
          <div>
            <span>{processExplanation(row)}</span>
            <span dangerouslySetInnerHTML={{ __html: explanation }} />
          </div>
        )
        return (
          <div
            key={example}
            className={`${styles.kviz__row} ${
              currentQuestion === rowIndex && styles['kviz__row--last']
            }`}
          >
            <div
              className={`${styles.kviz__col} ${styles[`kviz__col--example`]} ${
                styles[`kviz__col--${statusClassName}`]
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: example }} />
              <div>
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
      {answersCount === questions.length && (
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
            <span className={styles.kviz__bravo} role="img" aria-label="bravo!">
              🍒
            </span>
          )}
        </div>
      )}
      <div className={styles.kviz__scrollTarget} ref={kvizRef}></div>
    </div>
  ) : (
    <button
      className={`${styles.kviz__option} ${styles[`kviz__option--continue`]}`}
      onClick={() => setIsStarted(true)}
    >
      Start kviz
    </button>
  )
}

export default Kviz
