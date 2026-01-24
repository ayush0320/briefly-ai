import { GoogleGenAI } from "@google/genai";

// Remove Markdown code fences if Gemini wrapped the JSON in ```json ... ```

function stripMarkdownJson(text) {
  if (!text) return text;

  // Remove triple-backtick code fences (with optional "json")
  return text
    .replace(/^```json\s*/i, '')  // remove starting ```json
    .replace(/^```\s*/i, '')      // remove starting ``` (if no json tag)
    .replace(/\s*```$/i, '')      // remove ending ```
    .trim();
}

// Summarize news content + provide credibility analysis using Gemini

export async function summarizeWithGemini(content) {
    if(!content){
        return {
            summary: "No content provided to summarize.",
            credibility: "Unable to assess credibility without content."
        }
    }

    // Initialize the Gemini AI client
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
You are an AI news analyst.
Return ONLY valid JSON with:
- "summary": 3-4 sentence summary
- "credibility": short reliability analysis

Article content:
${content}
    `
});

    const text = response.text;

  try {
    // console.log("Gemini raw response:", text);

    const cleanedText = stripMarkdownJson(text);

    return JSON.parse(cleanedText);
    
  } catch (error) {
    return {
        summary: text,
        credibility: "Gemini returned non-JSON text."
    }
  }
}