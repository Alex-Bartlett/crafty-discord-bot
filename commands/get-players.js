const { SlashCommandBuilder } = require('discord.js');
const { BanPlayer, GetPlayers } = require('../crafty-requests.js');
const res = require('express/lib/response.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mc-players')
		.setDescription('Gets all the players who are currently online.'),
	async execute(interaction) {
		// Arguments

		// Code
		let content;

		const result = await GetPlayers();

		if (result !== false) {
			const count = result.length;
			if (count > 0) {
				let players = result.join('\n- ');
				content = `${count} players online.\n- ${players}`;
			}
			else {
				content = "No one is currently online."
			}
		}
		else {
			content = "The server is currently offline."
		}

		await interaction.reply({ content: content, flags: [4096], ephemeral: true });
	},
};