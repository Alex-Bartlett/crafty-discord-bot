const { SlashCommandBuilder } = require('discord.js');
const { BanPlayer } = require('../crafty-requests.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('banplayer')
		.setDescription('Bans a player from the server. Please do not abuse.')
		.addStringOption(option => option.setName('player').setRequired(true).setDescription("The username of the player to ban.")),
	async execute(interaction) {
		// Arguments
		const player = interaction.options.getString('player') ?? "";
		// Code
		let content;

		const result = await BanPlayer(player);

		if (result == true && player !== "") {
			content = `✅ Banned ${player}`;
		}
		else {
			content = "❌ An error occured!"
		}

		await interaction.reply({ content: content, ephemeral: false });
	},
};