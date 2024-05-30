const { SlashCommandBuilder } = require('discord.js');
const { BackupServer } = require('../crafty-requests.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('banplayer')
		.setDescription('Takes a backup of the Minecraft Server.')
		.addStringOption(option => option.setName('player').setRequired(true).setDescription("The username of the player to ban.")),
	async execute(interaction) {
		// Arguments
		const player = interaction.options.GetString('player') ?? "";
		// Code
		let content;

		const result = await BackupServer();

		if (result == true && player !== "") {
			content = `✅ Banned ${player}`;
		}
		else {
			content = "❌ An error occured!"
		}

		await interaction.reply({ content: content, ephemeral: false });
	},
};