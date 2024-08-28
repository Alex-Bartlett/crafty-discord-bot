const { REST, Routes } = require("discord.js");
const { discord_secrets, crafty } = require("./config.json");
const fs = require("node:fs");

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const commandFactory = require(`./commands/${file}`);
	if (typeof commandFactory === "function") {
		for (const server of crafty.servers) {
			const command = commandFactory(server)
			const data = command.getData().toJSON();
			commands.push(data);
			console.log(data);
		}
	}
	else {
		// Just for readability. A standard command isn't a factory, so let's rename it.
		const command = commandFactory;
		commands.push(command.data.toJSON());
		console.log(command.data.toJSON());
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(discord_secrets.token);

// and deploy your commands!
(async () => {
	try {
		console.log(
			`Started refreshing ${commands.length} application (/) commands.`
		);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(
				discord_secrets.clientId,
				discord_secrets.guildId
			), // for global, comment this line and uncomment next line
			//Route.applicationCommands(clientId),
			{ body: commands }
		);

		console.log(
			`Successfully reloaded ${data.length} application (/) commands.`
		);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
