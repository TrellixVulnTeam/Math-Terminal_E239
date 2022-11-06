const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const error = require(path.join(__dirname, "../modules/error/error"));
const general = require(path.join(__dirname, "../modules/general"));

let config,
	commands = [],
	files;

console.log(`${general.time}Commands Loading...`);

try {
	config = fs.readFileSync(
		path.join(__dirname, "../config/terminal.json")
	);
	config = JSON.parse(config);
} catch (err) {
	error.error(1, err);
}
try {
	files = fs.readdirSync(path.join(__dirname, "../public/scripts/commands"));
} catch (err) {
	error.error(1, err);
}
for (let i = 0; i < files.length; i++) {
	commands[i] = files[i].split(".")[0];
	console.log(`${general.time} | \x1b[34m${commands[i]}.js\x1b[0m`);
}

console.log(`${general.time}Commands Loaded`);

router.get("/", (req, res) => {
	res.render("terminal", {
		config: config,
		commands: commands,
		files: files,
	});
});

module.exports = router;
