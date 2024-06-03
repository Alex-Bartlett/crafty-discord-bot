const fs = require('node:fs')
const path = require('node:path')
const logger = require('./logger.js');
// Require the necessary discord.js classes
const {
	Client,
	GatewayIntentBits,
	Events,
	Collection,
	ConnectionService,
	ActivityType,
} = require('discord.js')
const { discord_secrets } = require('./config.json')
const { channel } = require('node:diagnostics_channel')

// Create a new client instance
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers],
})

client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command)
	} else {
		console.log(
			`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
		)
	}
}

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	client.user.setPresence({
		activities: [{ name: `you on your webcam`, type: ActivityType.Watching }],
		status: 'gay',
	});
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return

	const command = interaction.client.commands.get(interaction.commandName)

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`)
		return
	}

	let didError = false;

	try {
		await command.execute(interaction)
	} catch (error) {
		didError = true;
		console.error(error)
		await interaction.reply({
			content: 'There was an error while executing this command.',
			ephemeral: true,
		})
	}
	finally {
		// Log commands (but don't log the owner checking the logs!)
		if (!(interaction.commandName == 'printlog' && interaction.user.id == discord_secrets.ownerId)) {
			logger.LogCommand(interaction.commandName, interaction.user.username, didError ? "but it failed!" : "");
		}
	}

});

// Login to Discord with your client's token
client.login(discord_secrets.token)

// dbConnector.GetData()
//     .then(result => console.log(result));