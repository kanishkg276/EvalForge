const express = require("express");

const {
  createEvaluation,
  generateAndEvaluate
} = require("../controllers/evaluationController");

const router = express.Router();

router.post("/", createEvaluation);

router.post("/generate", generateAndEvaluate);

module.exports = router;