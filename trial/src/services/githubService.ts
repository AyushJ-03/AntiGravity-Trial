import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface RepoDetails {
  owner: string;
  name: string;
  description: string;
  readme: string;
  stars: number;
  language: string;
}

export const githubService = {
  async getRepoDetails(url: string): Promise<RepoDetails> {
    try {
      const parts = url.replace("https://github.com/", "").split("/");
      const owner = parts[0];
      const name = parts[1];

      const { data: repo } = await octokit.rest.repos.get({
        owner,
        repo: name,
      });

      let readme = "";
      try {
        const { data: readmeData } = await octokit.rest.repos.getReadme({
          owner,
          repo: name,
          mediaType: { format: "raw" },
        });
        readme = readmeData as unknown as string;
      } catch (e) {
        console.warn("No README found for this repo.");
      }

      return {
        owner,
        name,
        description: repo.description || "",
        readme,
        stars: repo.stargazers_count,
        language: repo.language || "",
      };
    } catch (error) {
      console.error("Error fetching GitHub repo:", error);
      throw new Error("Failed to fetch repository details. Ensure the URL is correct and public.");
    }
  },
};
