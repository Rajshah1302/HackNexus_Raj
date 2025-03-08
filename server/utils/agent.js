const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generateAIResponse = async (userInput, chatHistory, systemPrompt) => {
  try {
    const messages = [
      ...chatHistory,
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userInput,
      },
    ];

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: messages,
    });

    return response;
  } catch (error) {
    console.error("Error in AI response generation:", error);
    throw new Error("Failed to generate AI response");
  }
};

module.exports = { generateAIResponse };
