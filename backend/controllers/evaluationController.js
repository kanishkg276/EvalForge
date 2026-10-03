const { evaluateResponse } = require("../services/evaluationService");
const { generateResponse } = require("../services/llmService");

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
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required"
      });
    }

    const result = await generateResponse(prompt);

    const evaluation = evaluateResponse({
      prompt,
      response: result.response,
      latencyMs: result.latencyMs
    });

    res.status(201).json({
      success: true,
      message: "LLM response generated and evaluated successfully",
      data: {
        ...evaluation,
        responseId: result.responseId
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