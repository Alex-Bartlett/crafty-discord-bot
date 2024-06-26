const { SlashCommandBuilder } = require('discord.js');
const { BackupServer } = require('../crafty-requests.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mc-backup')
		.setDescription('Takes a backup of the Minecraft Server.'),
	async execute(interaction) {
		// Arguments

		// Code
		let content;

		const result = await BackupServer();

		if (result == true) {
			content = "✅ Starting backup";
		}
		else {
			content = "❌ An error occured!"
		}

		await interaction.reply({ content: content, flags: [4096], ephemeral: false });
	},
};