const OpenAI = require("openai");

async function generateResponse(prompt) {
  if (!prompt) {
    throw new Error("Prompt is required");
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured");
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const startTime = Date.now();

  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: prompt
  });

  const latencyMs = Date.now() - startTime;

  const tokenUsage =
    response.usage?.total_tokens || 0;

  return {
    response: response.output_text,
    latencyMs,
    tokenUsage,
    responseId: response.id
  };
}

module.exports = {
  generateResponse
};