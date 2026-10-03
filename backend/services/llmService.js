const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateResponse(prompt) {
  if (!prompt) {
    throw new Error("Prompt is required");
  }

  const startTime = Date.now();

  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: prompt
  });

  const latencyMs = Date.now() - startTime;

  return {
    response: response.output_text,
    latencyMs,
    responseId: response.id
  };
}

module.exports = {
  generateResponse
};