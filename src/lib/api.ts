
// API key for Google Gemini (normally you'd store this in an env variable)
const GEMINI_API_KEY = "AIzaSyBr0gKsyL5W4ECCKezISxxrb9Lrey9bM5E";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export async function getAIRecommendation(
  referenceString: number[],
  frameCount: number,
  fifoFaults: number,
  lruFaults: number,
  optimalFaults: number
): Promise<string> {
  try {
    const prompt = `
      As an AI assistant specializing in operating systems, analyze the following page replacement algorithm results:
      
      Reference String: ${referenceString.join(', ')}
      Number of Frames: ${frameCount}
      
      Results:
      - FIFO: ${fifoFaults} page faults
      - LRU: ${lruFaults} page faults
      - Optimal: ${optimalFaults} page faults
      
      Please provide a concise analysis (max 3 paragraphs) of:
      1. Which algorithm performed best for this specific reference string and why
      2. What characteristics of the reference string influenced the performance
      3. A recommendation for which algorithm would be most suitable in a real-world scenario with similar access patterns
      
      Keep your response under 200 words and focused on insights rather than explaining how the algorithms work.
    `;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 256,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json() as GeminiResponse;
    
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text.trim();
    } else {
      throw new Error("Invalid response structure from Gemini API");
    }
  } catch (error) {
    console.error("Error getting AI recommendation:", error);
    return "The AI recommendation is currently unavailable. Please try again later.";
  }
}
