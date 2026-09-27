import {useState} from "react"

const Quiz = ({ quiz }) => {
    const [questions, setQuestions] = useState(quiz)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selected, setSelected] = useState(null)
    const [wrong, setWrong] = useState([])
    const [finished, setFinished] = useState(false)
    const [score, setScore] = useState(0)

    const q = questions[currentIndex]

    const handleAnswer = (option) => {
        if (selected) return; 
        
        setSelected(option)
        if (option === q.answer) {
            setScore((s) => s + 1)
        }else{
            setWrong((w) => [...w, q])
        }
    }

    const handleNext = () => {
        setSelected(null)
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setFinished(true)
        }
    }

    const handleRetryWrong = () => {
        setQuestions(wrong)
        setWrong([])
        setCurrentIndex(0)
        setSelected(null)
        setScore(0)
        setFinished(false)
    }

    if (finished) {
        return (
            <div className="quiz-result">
                <h2>Quiz complete</h2>
                <p>Score: {score} / {questions.length}</p>
                {wrong.length !== null ? (
                    <button onClick={handleRetryWrong}>Retry {wrong.length} wrong answer(s)</button>
                ) : (
                    <p>All correct - nice work!</p>
                )}
            </div>
        )
    }
        return (
            <div className="quiz">
                <h2>Quiz ({currentIndex + 1} / {questions.length})</h2>
                <p className="quiz-question">{q.question}</p>
                <div className="quiz-options">{
                    q.options.map((opt, i) => {
                        let className = "quiz-option"
                        if (selected) {
                            if (opt === q.answer) className += " correct"
                            else if(opt === selected) className += " incorrect"
                        }
                        return (
                            <button
                                key={i}
                                className={className}
                                onClick={() => handleAnswer(opt)}
                                disabled={!!selected}
                            >
                                {opt}
                            </button>
                        )
                    })
                }</div>
                {selected && <button onClick={handleNext}>Next</button>}

            </div>
        )
    
}

export default Quiz