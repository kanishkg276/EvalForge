const { evaluateResponse } = require("../services/evaluationService");

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

module.exports = {
  createEvaluation
};