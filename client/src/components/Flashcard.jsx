import {useState} from "react"

const Flashcard = ({ question, answer }) => {
    const [flipped, setFlipped] = useState(false)

    return (
        <div className="flashcard" onClick={() => setFlipped(!flipped)}>    
            <p>{flipped ? answer : question}</p>
            <span className="flip-hint">{ flipped ? "Answer (click to flip back)" : "Click to reveal answer"}</span>
            
        </div>
    )
}

export default Flashcard