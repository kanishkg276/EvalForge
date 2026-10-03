const express = require("express");
const cors = require("cors");
require("dotenv").config();

const evaluationRoutes = require("./routes/evaluationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "EvalForge backend is running 🚀"
  });
});

app.use("/api/evaluations", evaluationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`EvalForge backend running on http://localhost:${PORT}`);
});