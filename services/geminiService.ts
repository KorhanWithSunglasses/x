
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzePrice = async (productName: string, currentPrice: number, history: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Şu ürün için fiyat analizi yap: ${productName}. Mevcut fiyat: ${currentPrice} TL. Fiyat geçmişi: ${JSON.stringify(history)}. Bu fiyat şu an almak için uygun mu? Kısa ve öz, profesyonel bir yorum yap. En sonunda "Öneri: Al/Bekle" şeklinde bitir.`,
    });
    return response.text || "Analiz yapılamadı.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Yapay zeka analizine şu an ulaşılamıyor.";
  }
};
