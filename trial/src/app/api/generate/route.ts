import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { githubService } from "@/services/githubService";
import { aiService } from "@/services/aiService";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { userId } = await auth();

  // For Phase 1, we might allow anonymous generation, but for saving we need userId
  // Here we'll handle the user record creation if it doesn't exist

  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    // 1. Fetch GitHub Details
    const repoInfo = await githubService.getRepoDetails(url);

    // 2. Generate Content with AI
    const content = await aiService.generateContent(repoInfo);

    // 3. Save to Database if user is logged in
    if (userId) {
      // Ensure user exists in our DB
      const user = await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: { id: userId, email: "placeholder@clerk.com" }, // Clerk email handling would go here
      });

      const repository = await prisma.repository.create({
        data: {
          url,
          owner: repoInfo.owner,
          name: repoInfo.name,
          userId: user.id,
        }
      });

      // Save Generations and Drafts
      for (const platform of ["linkedin", "twitter", "email"]) {
        const platformEnum = platform.toUpperCase() as "LINKEDIN" | "TWITTER" | "EMAIL";
        const generation = await prisma.generation.create({
          data: {
            repositoryId: repository.id,
            platform: platformEnum,
            drafts: {
              create: content[platform].map((d: any) => ({ content: d.content }))
            }
          }
        });
      }
    }

    return NextResponse.json({ success: true, data: content });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
