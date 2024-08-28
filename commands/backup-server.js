const { SlashCommandBuilder } = require('discord.js');
const { BackupServer } = require('../crafty-requests.js');

module.exports = (server) => ({
	getData: () =>
		new SlashCommandBuilder()
			.setName('mc-backup-' + server.name.toLowerCase())
			.setDescription(`Takes a backup of the ${server.name} Minecraft Server.`),
	async execute(interaction) {
		// Arguments

		// Code
		let content;

		const result = await BackupServer(server.id);

		if (result == true) {
			content = "✅ Starting backup";
		}
		else {
			content = "❌ An error occured!"
		}

		await interaction.reply({ content: content, flags: [4096], ephemeral: false });
	},
});