var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var drive = letters.charAt(Math.floor(Math.random() * letters.length));

function onLoad(config, commands) {
	for (let i = 0; i < config.length; i++) {
		if (config[i] == "\\") {
			config = config.splice(i,0,"\\")
            i++
		}
	}
	config = JSON.parse(config);
	style(config[0].type);
	newLine(drive, config[0]);
}

document.addEventListener("keydown", function onEvent(event) {
	switch (event.key) {
		case "Tab":
			search();
			break;
		case "Enter":
			newLine();
			break;
		default:
			break;
	}
});
