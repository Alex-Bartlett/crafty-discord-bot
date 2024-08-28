const { SlashCommandBuilder } = require('discord.js');
const { GetPlayers } = require('../crafty-requests.js');

module.exports = (server) => ({
	getData: () =>
		new SlashCommandBuilder()
			.setName('mc-players-' + server.name.toLowerCase())
			.setDescription(`Gets all the players who are currently online for ${server.name}.`),
	async execute(interaction) {
		// Arguments

		// Code
		let content;

		const result = await GetPlayers(server.id);

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
});