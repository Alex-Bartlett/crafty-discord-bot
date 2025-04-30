const { SlashCommandBuilder } = require("discord.js");
const { StartServer } = require("../crafty-requests.js");
const { WakeAsync, PingAsync } = require("../wake-on-lan.js");

module.exports = (server) => ({
	getData: () =>
		new SlashCommandBuilder()
			.setName("mc-start-" + server.name.toLowerCase())
			.setDescription(`Starts the ${server.name} Minecraft Server.`),
	async execute(interaction) {
		// Arguments

		// Code
		let content = "🕓 Contacting server...";
		// Reply first (fetch can take > 3 sec)
		await interaction.reply({
			content: content,
			flags: [4096],
			ephemeral: false,
		});

		const wakeResult = await WakeAsync();
		
		if (wakeResult === null){ 
			content = "❌ An error occured!"
		}
		else if (wakeResult == true) {
			content = "⏰ Awaking server.."
		}

		await interaction.editReply(content);

		if (wakeResult == true) 
		{
			var pingResult = await PingAsync()
			var maxAttempts = 20
			while (pingResult === false && maxAttempts > 0) {
				console.log(`Pinging server... (${maxAttempts} attempts remaining)`);
				pingResult = await PingAsync()
				maxAttempts--;
			}
		}		

		const result = await StartServer(server.id);

		if (result == true) {
			content = "✅ Starting server";
		} else {
			content = "❌ An error occured!";
		}

		await interaction.editReply(content);
	},
});
