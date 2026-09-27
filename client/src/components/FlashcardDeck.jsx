import Flashcard from './Flashcard.jsx'

const FlashcardDeck = ({ flashcards }) => {
    return (
        <div className="flashcard-deck">
            <h2>Flashcards</h2>
            <div className="flashcard-grid">
                {flashcards.map((card, index) => (
                    <Flashcard key={index} question={card.question} answer={card.answer}/>
                ))}
            </div>
        </div>
    )
}

export default FlashcardDeck