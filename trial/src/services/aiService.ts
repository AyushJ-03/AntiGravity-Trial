import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const aiService = {
  async generateContent(repoInfo: any) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a world-class developer advocate and content creator. 
      Analyze this GitHub repository and generate 3 UNIQUE DRAFTS for each of the following platforms:
      1. LinkedIn Post (Professional, technical, results-oriented)
      2. Twitter Thread (Engagement-focused, snappy, with a hook)
      3. Cold Email for a Recruiter (Personalized, highlighting technical skills)

      Repository Info:
      - Owner: ${repoInfo.owner}
      - Name: ${repoInfo.name}
      - Description: ${repoInfo.description}
      - Primary Language: ${repoInfo.language}
      - README Context: ${repoInfo.readme.substring(0, 2000)}

      Return the response in a STRICT JSON format as follows:
      {
        "linkedin": [{"content": "draft 1"}, {"content": "draft 2"}, {"content": "draft 3"}],
        "twitter": [{"content": "thread 1"}, {"content": "thread 2"}, {"content": "thread 3"}],
        "email": [{"content": "email 1"}, {"content": "email 2"}, {"content": "email 3"}]
      }
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      // Clean potential markdown blocks from the response
      const jsonStr = text.replace(/```json|```/g, "").trim();
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Error generating AI content:", error);
      throw new Error("Failed to generate content. Please try again later.");
    }
  },
};
