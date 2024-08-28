# Crafty Discord Bot 

This discord bot lets you manage your minecraft servers through discord commands via the Crafty API. It is recommended for use on small friendly servers.

The bot supports managing multiple servers on Crafty.

## Commands
All commands end with the server name prefix. For this example, the name _Vanilla_ is used. If you have multiple servers, there will be commands for each.
- `/mc-players-vanilla` - Responds with the online player list.
- `/mc-start-vanilla` - Starts the server.
- `/mc-stop-vanilla` - Stops the server.
- `/mc-restart-vanilla` - Restarts the server.
- `/mc-backup-vanilla` - Triggers a backup for the server.
- `/mc-whitelist-vanilla` - Adds a player to the whitelist.
- `/mc-ban-vanilla` - Bans a player. I added this to give players a means to ban a griefer in an emergency, but you may want to remove this command.
- `/printlog` - Displays the command log (useful to see who ran a command).

## Feature Requests
If you'd like to raise a feature request, please open an issue with the tag *Enhancement*. If it's something I think I can do then I'll give it a go. Alternatively, feel free to open a pull request.

## Updates
To update the bot, stop the bot and run `git pull` in the bot directory. Then follow [step 5](#5--run-the-bot) to deploy the changes.

## Setup

This setup guide assumes you are running a Crafty instance on a local machine.

### 1. 📁 Clone the repository

1. Create a folder to store the discord bot.
2. Open a terminal to this folder.
3. Run the following:
```
git clone https://github.com/Alex-Bartlett/crafty-discord-bot.git
```

4. Open the folder and rename `config.json.template` to `config.json`
5. Open `config.json` in a text editor.

### 2. 🤖 Create a Discord Bot
1. Follow Step 1 of [this guide](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app) to create a Discord bot 'app' and invite it to your server.

2. Update `config.json` with your bot token and Application ID.
3. Update the config with your server ID (guild ID).

### 3. ⚙ Configure Crafty
1. In the Crafty dashboard, go to Settings -> Add New Role.
2. Give the role a name like _discord_.
3. For all servers you wish for it to control, select:
	- Access
	- Commands
	- Backup
4. Save, and return to settings.
5. Click Add New User.
6. Give the user a name like _discordBot_.
7. Give it the role you created and press save.
8. Return to settings, and click the pencil icon next to the user you created.
9. Click on API keys at the top. On the right, give the key a name like _discord_ and select the following permissions:
	- Commands
	- Backup
10. Click _Get A Token_ and paste this in `config.json` under crafty -> secrets -> token.
11. Copy the url of your crafty instance and paste it under crafty -> secrets -> url. The url should look like `https://yourcraftyip:8443` or `https://yourcraftyurl.com:8443`. **Include the https://** and **do not include anything after the port number**.

### 4. ✍ Finalise the config

For each server you wish the bot to control, do the following:

1. On the crafty dashboard, select the server.
2. At the top, below Server Details, copy the UUID. Do not include UUID: in the selection.
3. In the `config.json`, go to crafty -> servers. Add the following:
	```
	servers: [
		{
			name: "ServerName",
			id: "ServerId"
		}
	]
	```
	If you have multiple, it should look this this:
	```
	servers: [
		{
			name: "Vanilla",
			id: "123456789"
		},
		{
			name: "Modded"
			id: "987654321"
		}
	]
	```
	Note the comma after the first closing curly bracket and none after the last.

	Do not include special characters in the server name.

### 5. ⚡ Run the Bot
1. Install node if you do not have it installed already.
2. Open a terminal in the bot directory and run 
```
npm install
```
3. To deploy the commands, run 
```
node ./deploy-commands.js
```
4. To run the bot, run 
```
node ./index.js
```

_Note:  If you're hosting crafty on a linux server, you can run the bot in a screen so that it stays running in the background:_
 	
```
screen -S craftyBot node ./index.js
```