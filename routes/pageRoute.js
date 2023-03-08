const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");


router.get("/", pageController.getPage);

module.exports = router;
