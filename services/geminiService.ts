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
 */
export const generateSimulatedTranscript = async (videoTitle: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const modelId = 'gemini-3-flash-preview';
        
        // Revised prompt to handle generic titles better
        const prompt = `You are an AI simulating a video transcript.
        The user provided a video with the title: "${videoTitle}".
        
        If the title contains specific keywords (like "cooking", "news", "coding"), generate a realistic 150-word transcript about that topic in Vietnamese.
        
        If the title is generic (like "Facebook Video ID:..." or "TikTok Video"), generate a polite message in Vietnamese explaining that:
        "Because this is a demo app without a backend server, we cannot extract the specific audio content of this video ID directly from the browser due to security restrictions. In a production environment, the real audio would be processed here."
        
        Do NOT invent a fake story if the ID is generic. Be helpful and technical.`;
    
        const response = await ai.models.generateContent({
          model: modelId,
          contents: prompt,
        });
    
        return response.text || "Transcript unavailable.";
      } catch (error) {
        return "Cannot generate transcript preview.";
      }
}