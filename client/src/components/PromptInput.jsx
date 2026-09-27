import { useState } from "react"

const PromptInput = ({ onGenerate, disabled }) => {
    const [text, setText] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim() === "") return
        onGenerate(text.trim())
    }

    return (
        <form onSubmit={handleSubmit} className="prompt-form">
            <textarea value={text} onChange={(e) => setText(e.target.value)} 
                placeholder="Paste your notes, or type a topic (e.g. 'Photosynthesis basics') and click Generate to create a study set."
                rows={4}
            />
            <button type="submit" disabled={disabled}>
                {disabled ? "Generating" : "Generate"}
            </button>
        </form>
    )
}

export default PromptInput