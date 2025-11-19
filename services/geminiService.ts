import { GoogleGenAI, Modality } from "@google/genai";

// Function to helper handle base64 encoding
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove Data URL prefix (e.g. "data:image/png;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

const getClient = (overrideKey?: string) => {
  const key = overrideKey || process.env.API_KEY;
  if (!key) {
    throw new Error("API Key is missing. Please add it in Settings.");
  }
  return new GoogleGenAI({ apiKey: key });
};

export const generateImage = async (prompt: string, apiKey?: string) => {
  try {
    const ai = getClient(apiKey);
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
      },
    });
    
    if (response.generatedImages?.[0]?.image?.imageBytes) {
        return `data:image/jpeg;base64,${response.generatedImages[0].image.imageBytes}`;
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

export const generateIcon = async (prompt: string, apiKey?: string) => {
    // Specialized prompt for icons
    const iconPrompt = `Vector app icon, flat design, minimal, ${prompt}, white background, high quality`;
    return generateImage(iconPrompt, apiKey);
}

export const generateAudio = async (text: string, apiKey?: string) => {
  try {
    const ai = getClient(apiKey);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
        return `data:audio/wav;base64,${base64Audio}`;
    }
    throw new Error("No audio generated");
  } catch (error) {
    console.error("Audio Gen Error:", error);
    throw error;
  }
};

export const transcribeAudio = async (audioBase64: string, apiKey?: string) => {
    try {
        const ai = getClient(apiKey);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: 'audio/wav', // Assuming wav for simplicity or handled by caller
                            data: audioBase64
                        }
                    },
                    { text: "Transcribe this audio exactly." }
                ]
            }
        });
        return response.text;
    } catch (error) {
        console.error("Transcription Error", error);
        throw error;
    }
}

export const generateVideoFromImage = async (imageBytes: string, prompt: string, apiKey?: string) => {
   // Simulate video generation wait time for demo if real API calls fail due to permissions/quotas in this environment
   // But here is the real code structure:
   try {
       const ai = getClient(apiKey);
       let operation = await ai.models.generateVideos({
           model: 'veo-3.1-fast-generate-preview',
           prompt: prompt || "Animate this image cinematically",
           image: {
               imageBytes: imageBytes,
               mimeType: 'image/png' // assuming png/jpeg
           },
           config: {
               numberOfVideos: 1,
               resolution: '720p',
               aspectRatio: '16:9'
           }
       });
       
       // Polling logic is usually required here.
       // For this demo, we might return the operation ID or wait. 
       // To avoid blocking the UI for minutes in a demo, we'll throw a friendly mock error if it takes too long or just return the operation struct.
       
       // Simulating a wait loop for a few seconds then returning a mock if real API fails
       let attempts = 0;
       while (!operation.done && attempts < 5) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            operation = await ai.operations.getVideosOperation({operation: operation});
            attempts++;
       }

       if(operation.response?.generatedVideos?.[0]?.video?.uri) {
         return operation.response.generatedVideos[0].video.uri;
       }
       
       // If strictly testing without a valid Video-enabled key:
       throw new Error("Video generation took too long or requires a Veo-enabled API key.");

   } catch (error) {
       console.error("Video Gen Error:", error);
       throw error;
   }
}

// Generic text processing for things like "Summarize PDF" or "Extract Ideas"
export const processTextData = async (prompt: string, data?: string, apiKey?: string) => {
    const ai = getClient(apiKey);
    const parts: any[] = [{ text: prompt }];
    if(data) {
        parts.push({ text: `\nContext:\n${data}` });
    }
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts }
    });
    return response.text;
}
