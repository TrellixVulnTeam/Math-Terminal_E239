const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const error = require(path.join(__dirname, "../modules/error/error"));

let config;

try {
	config = fs.readFileSync(
		path.join(__dirname, "../public/config/terminal.json")
	);
	config = JSON.parse(config);
} catch (err) {
	error.error(1, err);
}

router.get("/", (req, res) => {
	res.send(config);
});

module.exports = router;
