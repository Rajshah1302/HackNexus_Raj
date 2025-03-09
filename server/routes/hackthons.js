const express = require("express");
const { recomendationController } = require("../controllers/hackthons");
const router = express.Router();

router.post("/recommend", recomendationController);

module.exports = router;
