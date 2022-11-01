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
