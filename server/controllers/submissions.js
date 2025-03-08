const { generateAIResponse } = require("../utils/agent");
const { fetchProject } = require("../utils/fetchProject");

const projectChatController = async (req, res) => {
  try {
    const { userInput, chatHistory, repoUrl } = req.body;

    if (!userInput || !repoUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const projectReadme = await fetchProject(repoUrl);

    if (!projectReadme) {
      return res.status(404).json({ error: "README not found" });
    }

    const systemPrompt = `You are an AI assistant specializing in explaining GitHub projects based on their README files. 
    Use the README content to provide clear, informative, and context-aware explanations of features, usage, and key details. 
    By default, keep responses concise unless the user explicitly requests a detailed explanation. 
    Ensure technical concepts are broken down in an easy-to-understand manner while maintaining accuracy. Respond in 50 to 100 words only`;
    

    const aiResponse = await generateAIResponse(
      `${projectReadme}\nUser Query: ${userInput}`,
      chatHistory || [],
      systemPrompt
    );

    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("Error in project chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { projectChatController };
