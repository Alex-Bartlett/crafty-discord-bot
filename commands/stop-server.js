const { SlashCommandBuilder } = require('discord.js');
const { StopServer } = require('../crafty-requests.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mc-stop')
		.setDescription('Stops the Minecraft Server.'),
	async execute(interaction) {
		// Arguments

		// Code
		let content = "@silent ";

		const result = await StopServer();

		if (result == true) {
			content += "✅ Stopping server";
		}
		else {
			content += "❌ An error occured!"
		}

		await interaction.reply({ content: content, ephemeral: false });
	},
};