const router = require("express").Router();
const fs = require("fs");

router.get("/", (req, res) => {
	let config = fs.readFileSync("src/config/config.json");
	config = JSON.parse(config);
	res.render("terminal", {
		config: config,
	});
});

module.exports = router;
