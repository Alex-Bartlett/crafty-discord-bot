const { SlashCommandBuilder } = require('discord.js');
const { RestartServer } = require('../crafty-requests.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mc-restart')
		.setDescription('Restarts the Minecraft Server.'),
	async execute(interaction) {
		// Arguments

		// Code
		let content = "🕓 Contacting server...";
		// Reply first (fetch can take > 3 sec)
		await interaction.reply({ content: content, flags: [4096], ephemeral: false });

		const result = await RestartServer();

		if (result == true) {
			content = "✅ Restarting server";
		}
		else {
			content = "❌ An error occured!"
		}

		await interaction.editReply(content);
	},
};