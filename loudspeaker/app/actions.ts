"use server";

import { model, PROMPTS } from "@/lib/gemini";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function generatePRAssets(data: { type: "url" | "description"; content: string }) {
  try {
    const prompt = PROMPTS.analyze(data.content, data.type === "url");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini Raw Response:", text);

    // Clean up potential markdown formatting if Gemini includes it despite instructions
    const jsonString = text.replace(/```json|```/g, "").trim();
    try {
      const parsed = JSON.parse(jsonString);

      // Defensive check: If AI returned an object for twitter/linkedin/email instead of string, flatten it
      for (const key in parsed) {
        if (typeof parsed[key] === 'object' && parsed[key] !== null) {
          parsed[key] = Object.values(parsed[key]).join('\n\n');
        }
      }

      // Save to database
      await prisma.generation.create({
        data: {
          type: data.type,
          content: data.content,
          linkedin: parsed.linkedin,
          twitter: parsed.twitter,
          email: parsed.email,
        },
      });

      revalidatePath("/");
      return parsed;
    } catch (e) {
      console.error("JSON Parse Error. Raw Text:", text);
      throw new Error("AI returned an invalid format. Please try again.");
    }
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    const message = error.message || "Unknown error occurred";
    throw new Error(`Failed to generate PR assets: ${message}`);
  }
}

export async function getHistory() {
  try {
    return await prisma.generation.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
  } catch (error) {
    console.error("Failed to fetch history:", error);
    return [];
  }
}
