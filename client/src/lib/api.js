const API_URL = "http://localhost:5000/api/generate"

export const generateStudySet = async (input) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ input })
    });
    const data = await response.json();

    if(!response.ok || !data.success){
        throw new Error(data.error || "Failed to generate study set");
    }
    return data.data;
}