import * as Fx from "./terminalFx.js";

var lastInput = [];
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export var config, commands, drive = letters.charAt(Math.floor(Math.random() * letters.length));

window.addEventListener("load", async () => {
	config = await fetch("/config/terminal.json");
	config = await config.json();
	config = config[0]
	commands = await fetch("/config/commands.json");
	commands = await commands.json();
	Fx.style();
	Fx.newLine();
});

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
				Fx.update(input, null, false);
			}
			break;
		case "Tab":
			Fx.search();
			break;
		case "Enter":
			Fx.command(input.slice(line.length));
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
				Fx.update(event.key, null, true);
			}
			break;
	}
});
