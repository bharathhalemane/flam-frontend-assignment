import { useState, useRef } from 'react'
import PromptInput from "./components/PromptInput"
import LoadingState from "./components/LoadingState"
import ErrorState from "./components/ErrorState"
import EmptyState from "./components/EmptyState"
import Quiz from "./components/Quiz"
import FlashcardDeck from "./components/FlashcardDeck"
import { generateStudySet } from "./lib/api"
import { validateResult } from './lib/validateResult'
import "./index.css"

function App() {
  const [status, setStatus] = useState("idle")
  const [data, setData] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")
  const [lastInput, setLastInput] = useState("")
  const requestId = useRef(0)

  const handleGenerate = async (input) => {
    setLastInput(input)
    setStatus("loading")
    setErrorMsg("")

    const id = ++requestId.current
    try {
        const result = await generateStudySet(input)

      if (id !== requestId.current) return;
      
      if (!validateResult(result)) {
        setStatus("error")
        setErrorMsg("AI returned invalid data")
        return
      }
      
      setData(result)
      setStatus("success")  
    } catch (err) {
      if(id !== requestId.current) return;
      setStatus("error")
      setErrorMsg(err.message)
    }
  }


  const handleRetry = () => handleGenerate(lastInput)

  return (
    <div className="app">
      <header>
        <h1>Study Assistant</h1>
      </header>
      <PromptInput onGenerate={handleGenerate} disabled={status === "loading"} />
      {status === "idle" && <EmptyState />}
      {status === "loading" && <LoadingState />}
      {status === "error" && <ErrorState message={errorMsg} onRetry={handleRetry} />}
      {status === "success" && data && (
        <div className="results">
          <h2 className="results-title">{data.title}</h2>
          <FlashcardDeck flashcards={data.flashcards} />
          <Quiz quiz={data.quiz} />
        </div>
      )}
    </div>
  )
}

export default App
