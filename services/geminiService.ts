import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please set the API_KEY environment variable.");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Rewrites or summarizes the transcript using Gemini.
 */
export const processTranscriptWithAI = async (
  text: string,
  action: 'summarize' | 'rewrite' | 'translate_vi'
): Promise<string> => {
  try {
    const ai = getAiClient();
    const modelId = 'gemini-3-flash-preview'; 
    
    let prompt = "";
    
    if (action === 'summarize') {
      prompt = `Summarize the following video transcript into 5 concise bullet points in Vietnamese:\n\n${text}`;
    } else if (action === 'rewrite') {
      prompt = `Rewrite the following video transcript into a coherent, engaging blog post format in Vietnamese. Remove filler words and improve flow:\n\n${text}`;
    } else if (action === 'translate_vi') {
      prompt = `Translate the following text to Vietnamese accurately:\n\n${text}`;
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "Could not generate response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error processing text with AI. Please try again.";
  }
};

/**
 * Simulates generating a transcript from metadata if actual scraping fails (Fallback AI).
 * In a real app, this would process the audio file. Here we use the title to "hallucinate" a demo transcript
 * if the scraper mock returns empty text.
 */
export const generateSimulatedTranscript = async (videoTitle: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const modelId = 'gemini-3-flash-preview';
        
        const prompt = `Imagine you are writing a transcript for a viral video titled "${videoTitle}". 
        Generate a realistic, 200-word spoken-word script that matches this title. 
        Language: Vietnamese.`;
    
        const response = await ai.models.generateContent({
          model: modelId,
          contents: prompt,
        });
    
        return response.text || "Transcript unavailable.";
      } catch (error) {
        return "Cannot generate transcript preview.";
      }
}