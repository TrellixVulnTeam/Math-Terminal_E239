function newLine(drive, config) {
	let input = document.getElementById("input").innerHTML;
	if (input == "") {
		input = drive + config.line;
		body = config.body;
	}
	update(input, body);
	cursor(config);
}

function update(input, body) {
	if (body != null) {
		document.getElementById("body").innerHTML = body;
	}
	document.getElementById("input").innerHTML = input;
}

function style(sheet) {
	let style = document.getElementById("terminal");
	if (style != null) {
		style.remove();
	}
	var link = document.createElement("link");
	link.id = "terminal";
	link.href = `/styles/terminal/${sheet}.css`;
	link.rel = "stylesheet";
	link.type = "text/css";
	document.body.appendChild(link);
}

function cursor(config) {
	setInterval(function () {
		let input = document.getElementById("input").innerHTML;
		
		if (input[input.length - 1] == config.cursor) {
			input=input.slice(0, -1);
		} else {
			input = input + config.cursor;
		}
		update(input);
	}, 1000);
}

String.prototype.splice = function (idx, rem, str) {
	return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
