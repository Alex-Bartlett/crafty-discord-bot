const { SlashCommandBuilder } = require('discord.js');
const { StartServer } = require('../crafty-requests.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('startserver')
		.setDescription('Starts the Minecraft Server.'),
	async execute(interaction) {
		// Arguments
		
		// Code
		let content;
		
		const result = await StartServer();

		if (result == true) {
			content = "✅ Starting server";
		}
		else {
			content = "❌ An error occured!"
		}

		await interaction.reply({ content: content, ephemeral: false });
	},
};