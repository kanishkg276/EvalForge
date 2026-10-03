const express = require("express");

const {
  createEvaluation
} = require("../controllers/evaluationController");

const router = express.Router();

router.post("/", createEvaluation);

module.exports = router;