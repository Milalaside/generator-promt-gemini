import { GoogleGenAI, GenerateImagesResponse, Image } from "@google/genai";

// IMPORTANT: API_KEY is expected to be set in the environment.
// For example, in a Node.js environment or bundler like Vite/Webpack.
// If running directly in a browser without a backend proxy (not recommended for production due to key exposure),
// this key would need to be available in `process.env` somehow, or you'd adapt this.
// For this project, we assume `process.env.API_KEY` is correctly populated.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.error(
    "Gemini API key (process.env.API_KEY) is not configured. Image generation will fail. " +
    "Please ensure the API_KEY environment variable is set."
  );
}

export const generateImageFromApi = async (prompt: string): Promise<string> => {
  if (!ai) {
    throw new Error(
      "Gemini API client is not initialized. Please configure API_KEY."
    );
  }

  try {
    const response: GenerateImagesResponse = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002', // Correct model for image generation
      prompt: prompt,
      config: { 
        numberOfImages: 1, 
        outputMimeType: 'image/jpeg' // jpeg is generally smaller
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const image: Image = response.generatedImages[0];
      // image.image.imageBytes is the base64 encoded string of the image
      if (image.image?.imageBytes) {
        return image.image.imageBytes;
      } else {
        throw new Error("Generated image data is missing in the API response.");
      }
    } else {
      // Check for specific error messages from Gemini if available
      // For instance, safety blocks or other issues might be in response.error or similar
      const detail = response?.error ? JSON.stringify(response.error) : "No image data returned.";
      throw new Error(`No image generated or unexpected response structure. Details: ${detail}`);
    }
  } catch (err) {
    console.error("Error generating image with Gemini API:", err);
    if (err instanceof Error) {
      // More specific error handling could be added here based on error types from @google/genai
      throw new Error(`Gemini API request failed: ${err.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};
