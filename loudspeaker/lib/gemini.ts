import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ 
  model: "gemini-3.1-flash-lite-preview",
  generationConfig: {
    temperature: 0.8,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 4096,
  },
});

export const PROMPTS = {
  analyze: (content: string, isUrl: boolean) => `
    You are a world-class PR Agent and Developer Advocate specializing in helping students land dream roles at top tech companies.
    
    TASK:
    ${isUrl ? `Analyze this GitHub repository: ${content}` : `Analyze this project description: ${content}`}
    
    Generate three "show-stopping" PR assets that will make any recruiter stop scrolling:

    1. A Viral & Detailed LinkedIn Post (Ideal Length: 200-400 words):
       - Follow this exact 5-part structure:
         - 1️⃣ Hook: A powerful 1-2 line opener that grabs attention immediately.
         - 2️⃣ Project Overview: 2-3 lines explaining what the project is and the specific problem it solves.
         - 3️⃣ What you did (Deep Dive): Use bullet points to list specific technologies, key features, and technical tasks. Be descriptive and move beyond simple lists.
         - 4️⃣ Challenges & Learning: A dedicated section showing problem-solving. Describe a specific technical hurdle and how overcoming it strengthened your skills in [relevant technologies].
         - 5️⃣ Closing + Call to Action: Invite feedback, suggestions, or technical discussion.
       - Tone: Energetic, professional, and confident.
       - Visuals: Suggest where to add screenshots or demo videos to increase engagement.
       - Include 5-7 high-reach hashtags and relevant emojis.

    2. An Engaging Twitter/X Thread (5-7 Tweets):
       - Tweet 1: The "What" and the "Why" with a massive hook to encourage a click-through.
       - Tweets 2-4: Deep dive into the most interesting technical parts (the "How"). Mention specific libraries, patterns, or clever logic used.
       - Tweet 5: A specific challenge you faced (the "Hard part") and how you architected the solution.
       - Tweet 6: Key takeaway or what you learned through building this.
       - Tweet 7: Future roadmap and a call to action (e.g., link to repo, "RT if this helped").
       - Use active, punchy language and code/tech-related emojis.

    3. A High-Conversion Cold Email to a Recruiter:
       - A compelling subject line (e.g., "Student Dev: How I solved [Problem] using [Tech]").
       - Personalized and professional opening. 
       - 2-3 impact-driven sentences on the project's core value proposition.
       - Mention why your skills on this project make you a great fit for [Company Name].
       - Link to the live demo or repository.
       - Clear, low-friction call to action (e.g., "I'd love to share my technical process on a quick call").
       - Use placeholders like [Recruiter Name], [Your Name], [Company Name].

    CRITICAL INSTRUCTION: 
    - Be descriptive, specific, and technically accurate. 
    - Output should be substantially detailed and high-effort.
    - If a GitHub URL is provided, infer the tech stack and complexity from the content, otherwise use general best-practices for that type of project.
    - Format your response as a JSON object with keys: "linkedin", "twitter", "email".
    - The "twitter" value MUST be a single string (not an object). Separate each tweet in the thread with two newlines (\n\n).
    - Return ONLY the raw JSON object. No markdown, no backticks, no "json" label.
  `,
};
