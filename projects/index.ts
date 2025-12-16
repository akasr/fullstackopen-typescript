import express = require("express");
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res
      .json({
        error: "malformatted parameters",
      })
      .end();
  }

  const bmi = calculateBmi(height, weight);

  res.json({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  const {daily_exercises, target} = req.body;
  
})

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}/`);
});
