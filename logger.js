const fs = require('node:fs').promises;
const path = require('node:path');
const { logFolder } = require('./config.json');

async function LogCommand(commandName, username, extra = "") {
	// Format extra to include a space if present
	if (extra !== "") {
		extra = " " + extra.trimStart();
	}
	const timestamp = new Date().toLocaleTimeString();
	await WriteToLog(`${timestamp}\t${username} used ${commandName}${extra}`);
}

async function ReadLog() {
	const logFile = await GetCurrentLog();
	let contents = await fs.readFile(logFile, { encoding: 'utf-8' });
	return contents;
}

async function LogError(error) {
	WriteToLog(`Error: ${error}`);
}

async function WriteToLog(message) {
	message += '\n';
	const logFile = await GetCurrentLog();
	await fs.appendFile(logFile, message);
}

async function GetCurrentLog() {
	const date = GetCurrentDateString()
	const filePath = path.join(logFolder, date + '.txt');
	const logIsCurrent = await IsLogCurrent(filePath);
	if (!logIsCurrent) {
		await CreateLogFile(filePath);
	}
	return filePath;
}

async function IsLogCurrent(filePath) {

	try {
		await fs.access(filePath);
		return true;
	}
	catch {
		return false;
	}
}

async function CreateLogFile(filePath) {
	try {
		await fs.mkdir(logFolder, { recursive: true });
		try {
			await fs.access(filePath);
			throw new Error('Log file already exists!');
		}
		catch (err) {
			if (err.code !== 'ENOENT') {
				throw err; // rethrow if it's an actual error
			}
		}
		const date = new Date().toDateString();
		await fs.writeFile(filePath, `${date}\nBegin log: \n`);
	}
	catch (err) {
		throw err;
	}
}

function GetCurrentDateString() {
	return new Date().toLocaleDateString().replaceAll('/', '-');
}

module.exports = { LogCommand, ReadLog, LogError }