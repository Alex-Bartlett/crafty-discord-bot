const { SlashCommandBuilder } = require('discord.js');
const { BanPlayer } = require('../crafty-requests.js');

module.exports = (server) => ({
	getData: () =>
		new SlashCommandBuilder()
			.setName('mc-ban-' + server.name.toLowerCase())
			.setDescription(`Bans a player from the ${server.name} server. Please do not abuse.`)
			.addStringOption(option => option.setName('player').setRequired(true).setDescription("The username of the player to ban.")),
	async execute(interaction) {
		// Arguments
		const player = interaction.options.getString('player') ?? "";
		// Code
		let content;

		const result = await BanPlayer(server.id, player);

		if (result == true && player !== "") {
			content = `✅ Banned ${player}`;
		}
		else {
			content = "❌ An error occured!"
		}

		await interaction.reply({ content: content, flags: [4096], ephemeral: false });
	},
});