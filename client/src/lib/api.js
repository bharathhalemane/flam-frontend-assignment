const API_URL = import.meta.env.VITE_API_URL

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