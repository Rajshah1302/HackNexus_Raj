const { generateAIResponse } = require("../utils/agent");
const { fetchProject } = require("../utils/fetchProject");

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
    const systemPrompt = `You are an AI assistant specializing in explaining GitHub projects based on their README files. 
    Use the README content to provide clear, informative, and context-aware explanations of features, usage, and key details. 
    By default, keep responses concise unless the user explicitly requests a detailed explanation. 
    Ensure technical concepts are broken down in an easy-to-understand manner while maintaining accuracy. Respond in 50 to 100 words only`;

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
