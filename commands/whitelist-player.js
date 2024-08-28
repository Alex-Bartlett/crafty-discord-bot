const { SlashCommandBuilder } = require('discord.js');
const { WhitelistPlayer } = require('../crafty-requests.js');

module.exports = (server) => ({
	getData: () =>
		new SlashCommandBuilder()
			.setName('mc-whitelist-' + server.name.toLowerCase())
			.setDescription(`Whitelists a player on the ${server.name} server. Please do not abuse.`)
			.addStringOption(option => option.setName('player').setRequired(true).setDescription("The username of the player to whitelist.")),
	async execute(interaction) {
		// Arguments
		const player = interaction.options.getString('player') ?? "";

		// Code
		let content = "🕓 Contacting server...";
		// Reply first (fetch can take > 3 sec)
		await interaction.reply({ content: content, flags: [4096], ephemeral: false });

		let result = false;

		if (player !== "") {
			result = await WhitelistPlayer(server.id, player);
		}

		if (result == true && player !== "") {
			content = `✅ Whitelisted ${player}`;
		}
		else {
			content = "❌ An error occured!"
		}

		await interaction.editReply(content);
	},
});