const { v4: uuidv4 } = require("uuid");

function evaluateResponse(data) {
  const {
    prompt,
    response,
    latencyMs = 0,
    tokenUsage = 0
  } = data;

  if (!prompt || !response) {
    throw new Error("Prompt and response are required");
  }

  const words = response.trim().split(/\s+/).filter(Boolean);

  const evaluation = {
    evaluationId: uuidv4(),
    prompt,
    response,

    metrics: {
      responseLength: response.length,
      wordCount: words.length,
      tokenUsage,
      latencyMs
    },

    evaluatedAt: new Date().toISOString()
  };

  return evaluation;
}

module.exports = {
  evaluateResponse
};