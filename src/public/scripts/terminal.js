var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var drive = letters.charAt(Math.floor(Math.random() * letters.length));
var config,
	commands,
	lastInput = [];

function onLoad(config, commands) {
	this.commands = commands.split(",");
	for (let i = 0; i < config.length; i++) {
		if (config[i] == "\\") {
			config = config.splice(i, 0, "\\");
			i++;
		}
	}
	config = JSON.parse(config);
	this.config = config[0];
	style(config[0].type);
	newLine();
}

document.addEventListener("keydown", function onEvent(event) {
	let input = document.getElementById("input").innerHTML;
	let line;

	input = input.replace(config.cursor, "");
	switch (config.type) {
		case "CMD":
			line = "<br>" + drive + config.line.slice(0, -1) + "&gt;";
			break;
	}
	switch (event.key) {
		case "Backspace" || "Delete":
			if (input != line) {
				input = input.slice(0, -1);
				update(input, null, false);
			}
			break;
		case "Tab":
			search();
			break;
		case "Enter":
			command(input.slice(line.length));
			lastInput.push(input);
			break;
		case "ArrowUp":
			//TODO
			break;
		case "ArrowDown":
			//TODO
			break;

		default:
			if (event.key.length == 1) {
				update(event.key, null, true);
			}
			break;
	}
});
