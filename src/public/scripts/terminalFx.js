import { config, commands, drive } from "./terminal.js";
export function newLine() {
	let input = document.getElementById("input").innerHTML;
	let body;

	input = input.replace(config.cursor, "");
	if (input == "") {
		body = config.body;
		input = "<br>" + drive + config.line;
		update(input, body, true);
	} else {
		body = "<br>" + input;
		input = "<br>" + drive + config.line;
		update(input, body, false);
	}
}

export async function command(input) {
	let command;

	input.toLowerCase();
	for (const file of commands) {
		command = import(`./commands/${file}`);
		command = command.module;
		console.log(command);
	}
	// switch (input) {
	// 	case "about":
	// 		about();
	// 		break;
	// 	case "calculator":
	// 		calculator();
	// 		break;
	// 	case "help":
	// 		 help();
	// 		break;
	// 	case "style":
	// 		style();
	// 		break;
	// 	case "clear":
	// 		clear();
	// 		break;

	// 	default:
	// 		search(input);
	// 		break;
	// }
}

export function update(input, body, add) {
	let inputDiv = document.getElementById("input").innerHTML;

	inputDiv = inputDiv.replace(config.cursor, "");
	if (body != null) {
		body = document.getElementById("body").innerHTML + body;
		document.getElementById("body").innerHTML = body;
	}
	if (add) {
		input = inputDiv + input;
	}
	document.getElementById("input").innerHTML = input;
}

export function style() {
	let style = document.getElementById("terminal");
	var link;

	if (style != null) {
		style.remove();
	}
	link = document.createElement("link");
	link.id = "terminal";
	link.href = `/styles/terminal/${config.type}.css`;
	link.rel = "stylesheet";
	link.type = "text/css";
	document.body.appendChild(link);
}

setInterval(function () {
	let input = document.getElementById("input").innerHTML;

	if (input[input.length - 1] == config.cursor) {
		input = input.slice(0, -1);
		document.getElementById("input").innerHTML = input;
	} else {
		input = config.cursor;
		update(input, null, true);
	}
}, 1000);

String.prototype.splice = function (idx, rem, str) {
	return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
