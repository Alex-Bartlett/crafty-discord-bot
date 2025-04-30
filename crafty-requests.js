const { crafty } = require('./config.json');
const https = require('https');

const baseurl = `${crafty.secrets.url}/api/v2`;
const token = crafty.secrets.token;

const headers = {
	'Authorization': `Bearer ${token}`,
	'Content-Type': 'application/json'
}
const agent = new https.Agent({ rejectUnauthorized: false })

async function Fetch(url, options, body = null) {
	try {
		if (body !== null) {
			options.body = body;
		}
		const { default: fetch } = await import('node-fetch');
		const response = fetch(url, options);
		const responseBody = (await response).json();
		return responseBody;
	}
	catch (error) {
		console.error('A fetch error occured.', error);
		return null;
	}
}

async function StartServer(server) {
	try {
		const url = `${baseurl}/servers/${server}/action/start_server`;
		const options = {
			method: 'POST',
			headers: headers,
			agent: agent
		}

		const response = await Fetch(url, options);

		if (response != null && response.status === 'ok') {
			return true;
		}
		else {
			console.error("Error starting server.", response?.error, response?.info);
			return false;
		}
	}
	catch (error) {
		console.error('Error starting server.', error);
		return false;
	}
}

async function StopServer(server) {
	try {
		const url = `${baseurl}/servers/${server}/action/stop_server`;
		const options = {
			method: 'POST',
			headers: headers,
			agent: agent
		}

		const response = await Fetch(url, options);

		if (response != null && response.status === 'ok') {
			return true;
		}
		else {
			console.error("Error stopping server.", response.error, response.info);
			return false;
		}
	}
	catch (error) {
		console.error('Error stopping server.', error);
	}

}

async function RestartServer(server) {
	try {
		const url = `${baseurl}/servers/${server}/action/restart_server`;
		const options = {
			method: 'POST',
			headers: headers,
			agent: agent
		}

		const response = await Fetch(url, options);

		if (response != null && response.status === 'ok') {
			return true;
		}
		else {
			console.error("Error restarting server.", response.error, response.info);
			return false;
		}
	}
	catch (error) {
		console.error('Error restarting server.', error);
	}

}

async function BackupServer(server) {
	try {
		const url = `${baseurl}/servers/${server}/action/backup_server`;
		const options = {
			method: 'POST',
			headers: headers,
			agent: agent
		}

		const response = await Fetch(url, options);

		if (response != null && response.status === 'ok') {
			return true;
		}
		else {
			console.error("Error backing up server.", response.error, response.info);
			return false;
		}
	}
	catch (error) {
		console.error('Error backing up server.', error);
	}

}

async function BanPlayer(server, name) {
	try {
		const cmd = `ban ${name}`;
		const success = RunCommand(server, cmd);
		if (success) {
			RunCommand(`say ${name} was banned from the server.`);
		}
		return success;
	}
	catch (error) {
		console.error('Error banning player.', error);
	}
}

async function WhitelistPlayer(server, name) {
	try {
		const cmd = `whitelist add ${name}`;
		const success = RunCommand(server, cmd);
		return success;
	}
	catch (error) {
		console.error('Error whitelisting player.', error);
	}
}

async function GetPlayers(server) {
	try {
		const url = `${baseurl}/servers/${server}/stats`
		const options = {
			method: "GET",
			headers: headers,
			agent: agent,
		}
		const response = await Fetch(url, options);
		if (response.status === "ok" && response.data.players !== "False") {
			return eval(response.data.players);
		}
		else {
			console.error("Error getting players.", response.error, response.info);
			return false;
		}
	}
	catch (error) {
		console.error('Error getting players.', error);
	}
}

module.exports = {
	StartServer,
	StopServer,
	RestartServer,
	BackupServer,
	BanPlayer,
	WhitelistPlayer,
	GetPlayers,
}

async function RunCommand(server, cmdString) {
	try {
		const url = `${baseurl}/servers/${server}/stdin`
		const options = {
			method: 'POST',
			headers: headers,
			agent: agent
		}

		const body = cmdString;


		const response = await Fetch(url, options, body);

		if (response != null && response.status === 'ok') {
			console.log(cmdString);
			return true;
		}
		else {
			console.log(cmdString, response);
			return false;
		}
	}
	catch (error) {
		console.error(`Error running command ${cmdString}.`, error);
	}
}