const { SlashCommandBuilder } = require('discord.js');
const { ReadLog } = require('../logger.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('printlog')
		.setDescription('Gets all the players who are currently online.'),
	async execute(interaction) {
		// Arguments

		// Code
		let content = await ReadLog();
		// Wrap the logs in a code block for monospace formatting and preserved indentation
		content = '```' + content + '```';

		await interaction.reply({ content: content, flags: [4096], ephemeral: true });
	},
};