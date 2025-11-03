
import { GoogleGenAI, Modality, GenerateContentResponse } from '@google/genai';

// IMPORTANT: Do NOT configure an API key in this file.
// The API key is injected automatically by the execution environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const extractBase64Image = (response: GenerateContentResponse): string => {
    for (const part of response.candidates![0].content.parts) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }
    throw new Error("No image data found in Gemini response");
};

export const generateInitialMockup = async (
    logoBase64: string,
    logoMimeType: string,
    productBase64: string,
    productMimeType: string,
    productName: string
): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { inlineData: { data: productBase64, mimeType: productMimeType } },
                { inlineData: { data: logoBase64, mimeType: logoMimeType } },
                { text: `Seamlessly place the logo (second image) onto the ${productName} (first image) in a photorealistic way. Make sure the lighting and shadows on the logo match the product.` },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    const newImageBase64 = extractBase64Image(response);
    return `data:image/png;base64,${newImageBase64}`;
};

export const editImageWithPrompt = async (
    currentImageFullDataUrl: string,
    prompt: string
): Promise<string> => {
    const mimeType = currentImageFullDataUrl.substring(currentImageFullDataUrl.indexOf(":") + 1, currentImageFullDataUrl.indexOf(";"));
    const imageData = currentImageFullDataUrl.split(',')[1];

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { inlineData: { data: imageData, mimeType: mimeType } },
                { text: prompt },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    const newImageBase64 = extractBase64Image(response);
    return `data:image/png;base64,${newImageBase64}`;
};
