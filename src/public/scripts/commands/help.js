import * as Fx from "../terminalFx.js";

const name = "help";
const description = "displays a list of commands";

async function command(commands) {
	let command,
		output = "<br>";

	for (const file of commands) {
		command = await import(`./${file}`);
		output = `${output}<br>&emsp;&emsp;&emsp;${command.name} ==> ${command.description}`;
	}
	Fx.update(output, null, true);
	Fx.newLine(true);
}

export { command, name, description };
