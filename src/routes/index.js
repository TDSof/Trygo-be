"use strict";
const express = require("express");
const router = express.Router();

router.use("/tasks", require("./tasks"));
router.use("/customers", require("./customers"));
router.use("/tour_guides", require("./tourGuides"));

/* GET home page. */
router.get("/", function (req, res, next) {
	res.json({ message: "Welcome to the homepage from Trygo." });
});

/* Test Route */
router.get("/test", function (req, res, next) {
	res.json({ result: "Test success!" });
});

module.exports = router;