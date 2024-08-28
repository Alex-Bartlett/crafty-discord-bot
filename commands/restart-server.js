const { SlashCommandBuilder } = require('discord.js');
const { RestartServer } = require('../crafty-requests.js');

module.exports = (server) => ({
	getData: () =>
		new SlashCommandBuilder()
			.setName('mc-restart-' + server.name.toLowerCase())
			.setDescription(`Restarts the ${server.name} Minecraft Server.`),
	async execute(interaction) {
		// Arguments

		// Code
		let content = "🕓 Contacting server...";
		// Reply first (fetch can take > 3 sec)
		await interaction.reply({ content: content, flags: [4096], ephemeral: false });

		const result = await RestartServer(server.id);

		if (result == true) {
			content = "✅ Restarting server";
		}
		else {
			content = "❌ An error occured!"
		}

		await interaction.editReply(content);
	},
});