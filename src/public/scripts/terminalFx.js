function newLine() {
	let input = document.getElementById("input").innerHTML;

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

 function command(input) {
	input.toLowerCase();
	switch (input) {
		case "about":
			about();
			break;
		case "calculator":
			calculator();
			break;
		case "help":
			 help();
			break;
		case "style":
			style();
			break;
		case "clear":
			clear();
			break;

		default:
			search(input);
			break;
	}
}

function update(input, body, add) {
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

function style(sheet) {
	let style = document.getElementById("terminal");
	var link;

	if (style != null) {
		style.remove();
	}
	link = document.createElement("link");
	link.id = "terminal";
	link.href = `/styles/terminal/${sheet}.css`;
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
