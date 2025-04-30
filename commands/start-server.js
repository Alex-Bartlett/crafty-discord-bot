const { SlashCommandBuilder } = require("discord.js");
const { StartServer } = require("../crafty-requests.js");
const { WakeAsync, PingAsync } = require("../wake-on-lan.js");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

		var serverStarted = false
		if (wakeResult == true) 
		{
			var pingResult = await PingAsync()
			var maxAttempts = 20
			while (pingResult === false && serverStarted == false && maxAttempts > 0) {
				console.log(`Pinging server... (${maxAttempts} attempts remaining)`);
				if (pingResult == false) {
					pingResult = await PingAsync();
				}
				else {
					try {
						var serverStarted = await StartServer(server.id);
					}
					catch (ex){
						continue;
					}
				}
				// 3 second delay
				await delay(3000);
				maxAttempts--;
			}
		}		

		// Start if server already awake
		if (serverStarted == false) {
			serverStarted = await StartServer(server.id);
		}

		if (serverStarted == true) {
			content = "✅ Starting server";
		} else {
			content = "❌ An error occured!";
		}

		await interaction.editReply(content);
	},
});
