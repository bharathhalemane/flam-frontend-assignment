import dotenv from "dotenv"

dotenv.config();

const GROQ_API_KEY = process.env.LLM_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are a study-material generator. Given a topic or notes, return ONLY valid JSON, no prose, no markdown, no fences, matching exactly this shape: 
{
    "title" : "string",
    "flashcards": [{"question":"string", "answer":"string"}],
    "quiz":[{"question":"string", "options":["string","string","string","string"], "answer":"string"}]
}
Generate 5-8 flashcards and 3-5 quiz questions. The quiz questions should be multiple choice with 4 options each. The answer field should contain the correct answer. Do not include any additional text or explanation.`;

export const callGroq = async (userInput) => {
    const response = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userInput }
            ],
            response_format: { type: "json_object" },
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`Groq API request failed with status ${response.status}`);
    }

    const json = await response.json();
    const rawText = json.choices?.[0]?.message?.content
    if(!rawText){
        throw new Error("No content returned from Groq API");
    }
    return rawText;
}