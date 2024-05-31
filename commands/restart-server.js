const { SlashCommandBuilder } = require('discord.js');
const { RestartServer } = require('../crafty-requests.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mc-restart')
		.setDescription('Restarts the Minecraft Server.'),
	async execute(interaction) {
		// Arguments

		// Code
		let content;

		const result = await RestartServer();

		if (result == true) {
			content = "✅ Restarting server";
		}
		else {
			content = "❌ An error occured!"
		}

		await interaction.reply({ content: content, flags: [4096], ephemeral: false });
	},
};