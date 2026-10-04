const { v4: uuidv4 } = require("uuid");

function calculateCorrectness(response, referenceAnswer) {
  if (!referenceAnswer) {
    return null;
  }

  const responseWords = new Set(
    response
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter(Boolean)
  );

  const referenceWords = referenceAnswer
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  const uniqueReferenceWords = [...new Set(referenceWords)];

  if (uniqueReferenceWords.length === 0) {
    return 0;
  }

  const matchedWords = uniqueReferenceWords.filter((word) =>
    responseWords.has(word)
  );

  return Number(
    ((matchedWords.length / uniqueReferenceWords.length) * 100).toFixed(2)
  );
}

function evaluateResponse(data) {
  const {
    prompt,
    response,
    latencyMs = 0,
    tokenUsage = 0,
    referenceAnswer
  } = data;

  if (!prompt || !response) {
    throw new Error("Prompt and response are required");
  }

  const words = response.trim().split(/\s+/).filter(Boolean);

  const correctnessScore = calculateCorrectness(
    response,
    referenceAnswer
  );

  const evaluation = {
    evaluationId: uuidv4(),
    prompt,
    response,

    metrics: {
      responseLength: response.length,
      wordCount: words.length,
      tokenUsage,
      latencyMs,
      correctnessScore
    },

    evaluatedAt: new Date().toISOString()
  };

  return evaluation;
}

module.exports = {
  evaluateResponse
};