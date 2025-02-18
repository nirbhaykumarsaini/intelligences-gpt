const express = require("express");
const { metrics } = require("../controllers/metricsController");
const router = express.Router();


router.get("/metrics", metrics);


module.exports = router;