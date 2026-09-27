export const validateResult = (data) => {
    if (!data || typeof data !== "object") return false;
    if (typeof data.title !== "string" || data.title.trim() === "") return false;

    if (!Array.isArray(data.flashcards) || data.flashcards.length === 0) return false;
    
    const flashcardsOk = data.flashcards.every(
        (c) => typeof c.question === "string" && c.question.trim() !== "" &&
               typeof c.answer === "string" && c.answer.trim() !== ""
    );
    if (!flashcardsOk) return false;

    if (!Array.isArray(data.quiz) || data.quiz.length === 0) return false;
    const quizOk = data.quiz.every(
        (q) =>
            typeof q.question === "string" && q.question.trim() !== "" &&
            Array.isArray(q.options) && q.options.length >= 2 &&
            q.options.every(opt => typeof opt === "string" && opt.trim() !== "") &&
            typeof q.answer === "string" && q.answer.trim() !== "" && q.options.includes(q.answer)
    );
    if (!quizOk) return false;

    return true
}