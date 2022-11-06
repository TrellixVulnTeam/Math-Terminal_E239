function help() {
	newLine();
	update("", "<br>", true);
	for (let i = 0; i < commands.length; i++) {
		update("", "<br> &emsp; &emsp; &emsp;" + commands[i], true);
	}
}
