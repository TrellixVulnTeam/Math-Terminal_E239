const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const error = require(path.join(__dirname, "../modules/error/error"));

router.get("/:file", (req, res) => {
	let commands;

	try {
		commands = fs.readdirSync(
			path.join(__dirname, `../public/scripts/commands`)
		);
	} catch (err) {
		error.error(1, err);
	}
	console.log(commands);
	commands = JSON.stringify(commands);
	try {
		fs.writeFileSync(
			path.join(__dirname, "../public/config/commands.json"),
			commands
		);
	} catch (err) {
		error.error(1, err);
	}

	res.sendFile(path.join(__dirname, `../config/${req.params.file}`));
});

module.exports = router;
