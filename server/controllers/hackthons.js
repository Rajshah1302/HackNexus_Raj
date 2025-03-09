const { generateAIResponse } = require("../utils/agent");
const prompts = require("../utils/prompts");
const recomendationController = async (req, res) => {
    try {
        console.log("1. Received New Guide Chat Request:");

        const { userInput, chatHistory, nearbyHacks } = req.body;

        console.log("2. Extracted request body:");
        console.log("   - userInput:", userInput);
        console.log("   - chatHistory:", chatHistory);
        console.log("   - nearbyHacks:", nearbyHacks);

        if (!userInput || !nearbyHacks) {
            console.warn("Missing required fields:", { userInput, nearbyHacks });

            return res.status(400).json({ 
                error: "Missing required fields",
                missingFields: {
                    userInput: !userInput ? "userInput is required" : undefined,
                    nearbyHacks: !nearbyHacks ? "nearbyHacks is required" : undefined
                }
            });
        }


        const systemPrompt = prompts.GUIDANCE_AGENT;

        console.log("3. Sending request to AI model...");
        const aiResponse = await generateAIResponse(
            `${nearbyHacks}\nUser Query: ${userInput}`, 
            chatHistory || [], 
            systemPrompt
        );

        console.log("4. Received AI response:", aiResponse);

        console.log("5. Sending response to client...");
        res.status(200).json({ recommendation: aiResponse });

    } catch (error) {
        console.error(" Error in recommendationController:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { recomendationController };
