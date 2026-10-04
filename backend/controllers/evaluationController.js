const { evaluateResponse } = require("../services/evaluationService");
const { generateResponse } = require("../services/llmService");
const { generateMockResponse } = require("../services/mockLlmService");
const createEvaluation = (req, res) => {
  try {
    const evaluation = evaluateResponse(req.body);

    res.status(201).json({
      success: true,
      message: "Evaluation completed successfully",
      data: evaluation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const generateAndEvaluate = async (req, res) => {
  try {
    const { prompt, provider = "mock" } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required"
      });
    }

    let result;

    if (provider === "mock") {
      result = generateMockResponse(prompt);
    } else if (provider === "openai") {
      result = await generateResponse(prompt);
    } else {
      return res.status(400).json({
        success: false,
        message: "Unsupported provider. Use mock or openai."
      });
    }

    const evaluation = evaluateResponse({
      prompt,
      response: result.response,
      latencyMs: result.latencyMs,
      tokenUsage: result.tokenUsage
    });

    res.status(201).json({
      success: true,
      message: "LLM response generated and evaluated successfully",
      data: {
        ...evaluation,
        responseId: result.responseId,
        provider
      }
    });
  } catch (error) {
    console.error("LLM Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate LLM response"
    });
  }
};

module.exports = {
  createEvaluation,
  generateAndEvaluate
};