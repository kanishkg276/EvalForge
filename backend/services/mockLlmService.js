function generateMockResponse(prompt) {
  if (!prompt) {
    throw new Error("Prompt is required");
  }

  const startTime = Date.now();

  const response = `This is a mock LLM response for the prompt: "${prompt}"`;

  const latencyMs = Date.now() - startTime;

  const tokenUsage = response.trim().split(/\s+/).length;

  return {
    response,
    latencyMs,
    tokenUsage,
    responseId: `mock-${Date.now()}`
  };
}

module.exports = {
  generateMockResponse
};