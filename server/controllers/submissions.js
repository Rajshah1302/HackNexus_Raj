const { generateAIResponse } = require("../utils/agent");
const { fetchProject } = require("../utils/fetchProject");
const prompts = require("../utils/prompts");

const projectChatController = async (req, res) => {
  try {
    const { userInput, chatHistory, repoUrl } = req.body;

    console.log("=== Received New Project Chat Request ===");
    console.log(`Repo URL: ${repoUrl || "N/A"}`);
    console.log(`User Input: ${userInput || "N/A"}`);
    console.log(`Chat History Length: ${chatHistory?.length || 0}`);

    if (!userInput || !repoUrl) {
      console.warn("[Warning] Missing required fields in request.");
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("1. Fetching project README...");
    const projectReadme = await fetchProject(repoUrl);

    if (!projectReadme) {
      console.warn("[Warning] README not found for the given repository.");
      return res.status(404).json({ error: "README not found" });
    }

    console.log("2. Generating AI response...");
    const systemPrompt = prompts.SUBMISSION_AGENT;

    const aiResponse = await generateAIResponse(
      `${projectReadme}\nUser Query: ${userInput}`,
      chatHistory || [],
      systemPrompt
    );

    console.log("3. AI response generated successfully.");
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("[Error] Project chat failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { projectChatController };
