const express = require("express");
const router = express.Router();
const math = require("mathjs");

router.post("/", async (req, res) => {
  try {
    const { equation } = req.body;
    let result = math.evaluate(equation);

    return res.json({ result: result });
  } catch (err) {
    return res.status(400).json({ error: "Unable to solve." });
  }
});

module.exports = router;
