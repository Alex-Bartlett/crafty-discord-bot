const { SlashCommandBuilder } = require('discord.js');
const { StopServer } = require('../crafty-requests.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mc-stop')
		.setDescription('Stops the Minecraft Server.'),
	async execute(interaction) {
		// Arguments

		// Code
		let content = "🕓 Contacting server...";
		// Reply first (fetch can take > 3 sec)
		await interaction.reply({ content: content, flags: [4096], ephemeral: false });

		const result = await StopServer();

		if (result == true) {
			content = "✅ Stopping server";
		}
		else {
			content = "❌ An error occured!"
		}

		await interaction.editReply(content);
	},
};