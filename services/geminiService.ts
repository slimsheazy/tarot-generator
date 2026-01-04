import { GoogleGenAI, Type } from "@google/genai";
import type { TarotSpread } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SPREAD_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    spreadName: {
      type: Type.STRING,
      description: "A clear and descriptive name for the tarot spread.",
    },
    description: {
      type: Type.STRING,
      description: "A summary of what this spread covers and how it helps the user.",
    },
    positions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          position: {
            type: Type.INTEGER,
          },
          meaning: {
            type: Type.STRING,
            description: "The specific meaning or focus of this position (e.g., 'Past Influences', 'Immediate Challenge').",
          },
        },
        required: ["position", "meaning"],
      },
    },
  },
  required: ["spreadName", "description", "positions"],
};

export const generateTarotSpread = async (query: string, cardCount: string): Promise<TarotSpread> => {
  try {
    let positionConstraint = "Provide 4 to 6 positions that are relevant to the user's question.";
    if (cardCount !== 'auto') {
      const count = parseInt(cardCount, 10);
      positionConstraint = `The spread must have exactly ${count} positions.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Create a custom tarot spread for this question: "${query}". ${positionConstraint}`,
      config: {
        systemInstruction: `You are a professional tarot expert. Your goal is to design a logical and helpful tarot spread tailored to the user's specific inquiry. 
        Focus on providing clear, practical position meanings that help the user gain insight into their situation.
        DO NOT pull specific cards. Only provide the layout and the meaning of each position.
        The response must be in JSON format matching the provided schema.`,
        responseMimeType: "application/json",
        responseSchema: SPREAD_SCHEMA,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const spreadData = JSON.parse(jsonText);
    return spreadData as TarotSpread;
  } catch (error) {
    console.error("API error:", error);
    throw new Error("Unable to generate spread at this time.");
  }
};