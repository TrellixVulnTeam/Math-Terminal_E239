import * as Fx from "../terminalFx.js";

const name = "clear";
const description = "clears the terminal";

async function command() {
	await Fx.newLine(false);
	document.getElementById("body").innerHTML = "";
}

export { command, name, description };
