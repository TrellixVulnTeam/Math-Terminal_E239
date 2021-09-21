var terminal = [];
var input = "";
var mode = "normal";
var config = {};
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var drive = letters
	.charAt(Math.floor(Math.random() * letters.length))
	.toUpperCase();
var path = drive + ":\\Users\\Admin>";

function init(config) {
	this.config = JSON.parse(config);
	newLine();
}

function newLine() {
	switch (mode) {
		case "normal":
			input = "";
			if ((config.terminal = "CMD")) {
				input = path;
				update(false);
			}
			break;
		case "calculator":
			input = "Calculator>";
			update(false);
			break;
		default:
			terminal.push("Fatal Error: mode error '" + mode + "'");
			break;
	}
}

function update(cursor) {
	document.getElementById("input").innerHTML = input;
	if (!cursor) {
		let text = "";
		for (let i = 0; i < terminal.length; i++) {
			text = text + terminal[i] + "<br>";
		}
		document.getElementById("text").innerHTML = text;
		while (terminal.length > 100) {
			terminal.shift();
		}
		window.scrollTo(0, document.body.scrollHeight);
	}
}

function commands() {
	input = input.split(">").pop();
	input = input.toLowerCase();
	let args = input.split(" ");
	switch (mode) {
		case "normal":
			switch (args[0]) {
				case "":
					break;
				case "calculator":
					mode = "calculator";
					break;
				case "help":
					terminal.push("lol<br>");
					break;
				case "about":
					window.location.replace("/about");
					break;
				default:
					terminal.push(
						"'" +
							input +
							"'" +
							" Is not recognized<br>Invalid command " +
							"'" +
							input +
							"'<br>"
					);
					break;
			}
			break;
		case "calculator":
			switch (args[0]) {
				case "exit":
					mode = "normal";
					break;
				default:
					calculator(input);
					break;
			}
			break;
		default:
			terminal.push("Fatal Error: mode error '" + mode + "'");
			break;
	}

	newLine();
}

function calculator(query) {
	if (mode == "calculator") {
		let equation = [];
		let test = false;
		let lastNum = 0;
		let operator = ["+", "-", "/", "<", ">", "*", "%", "(", ")", "^"];
		let operatorLength;
		query = query.split("");
		for (let i = 0; i < query.length; i++) {
			test = false;
			if (query[i] == ",") {
				query.splice(i, 1);
			}
			if ((!isNaN(query[i]) || query[i] == ".") && query[i] != " ") {
				if (lastNum == i && lastNum != 0) {
					equation[equation.length - 1] =
						equation[equation.length - 1] + query[i];
				} else {
					equation.push(query[i]);
				}
				test = true;
				lastNum = i + 1;
			} else {
				for (let index = 0; index < operator.length; index++) {
					if (query[i] == operator[index]) {
						equation.push(operator[index]);
						operator.length++;
						test = true;
					}
				}
			}
			if (!test) {
				terminal.push(
					"'" +
						input +
						"'" +
						" Is not recognized<br>Invalid equation " +
						"'" +
						input +
						"'<br>"
				);
			}
		}
		for (let index = 0; index < operatorLength; index++) {}
	}
	update(false);
}

function search(query) {
	
	let searching;
	switch (mode) {
		case "normal":
			searching = config.commands.normal;
			break;
		case "calculator":
			searching = config.commands.calculator;
			break;
	}
	let temp = [];
	query = query.split(">");
	let tempPath = query[0] + ">";
	query = query[1].toLowerCase();
	query = query.split("");
	for (let index = 0; index < query.length; index++) {
		for (let i = 0; i < searching.length; i++) {
			if (searching[i].split("")[index] == query[index]) {
				temp.push(searching[i]);console.log(temp)
			}
		}
		if (temp.length == 1 && temp[0].length >= query.length) {
			input = tempPath + temp[0];
			return;
		}
	}
}

document.addEventListener("keydown", function onEvent(event) {
	if (event.key === "Backspace" || event.key === "Delete") {
		input = input.replace(config.DefaultCMD.cursor, "");
		if (input.length != input.split(">")[0].length + 1) {
			input = input.slice(0, -1);
			update(false);
		}
	} else if (event.key === "Tab") {
		event.preventDefault();
		input = input.replace(config.DefaultCMD.cursor, "");
		search(input);
	} else if (event.key === "Enter") {
		input = input.replace(config.DefaultCMD.cursor, "");
		search(input);
		terminal.push(input);
		commands(input);
	} else if (event.key.length == 1) {
		if (input.includes(config.DefaultCMD.cursor)) {
			input = input.replace(config.DefaultCMD.cursor, "");
		}
		input = input + event.key;
		update(false);
	}
});

setInterval(function () {
	if (input.includes(config.DefaultCMD.cursor)) {
		input = input.replace(config.DefaultCMD.cursor, "");
	} else if (document.hasFocus()) {
		input = input + config.DefaultCMD.cursor;
	}
	update(true);
}, 1000);
