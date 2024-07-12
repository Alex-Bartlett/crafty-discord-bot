const { crafty_secrets } = require('./config.json');
const https = require('https');

const baseurl = `${crafty_secrets.url}/api/v2`;
const token = crafty_secrets.token;
const server = crafty_secrets.server;

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

async function StartServer() {
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
			return false;
		}
	}
	catch (error) {
		console.error('Error starting server.', error);
	}
}

async function StopServer() {
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
			return false;
		}
	}
	catch (error) {
		console.error('Error stopping server.', error);
	}

}

async function RestartServer() {
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
			return false;
		}
	}
	catch (error) {
		console.error('Error restarting server.', error);
	}

}

async function BackupServer() {
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
			return false;
		}
	}
	catch (error) {
		console.error('Error backing up server.', error);
	}

}

async function BanPlayer(name) {
	try {
		const cmd = `ban ${name}`;
		const success = RunCommand(cmd);
		if (success) {
			RunCommand(`say ${name} was banned from the server.`);
		}
		return success;
	}
	catch (error) {
		console.error('Error banning player.', error);
	}
}

async function GetPlayers() {
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
	GetPlayers
}

async function RunCommand(cmdString) {
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