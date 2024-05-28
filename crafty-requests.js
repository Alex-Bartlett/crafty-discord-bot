const { crafty_secrets } = require('./config.json');
const https = require('https');

const baseurl = `${crafty_secrets.url}/api/v2`;
const token = crafty_secrets.token;
const server = crafty_secrets.server;

const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
}
const agent = new https.Agent({rejectUnauthorized: false})

async function Fetch(url, options, body = {}) {
    try {
        const { default: fetch } = await import('node-fetch');
        const response = fetch(url, options, body);
        const responseBody = (await response).json();
        return responseBody;
    }
    catch (error) {
        console.error('Error requring node-fetch.', error);
        return null;
    }
}

async function StartServer() {
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

async function StopServer() {
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

async function RestartServer() {
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

async function BackupServer() {
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

StopServer().then(res => console.log(res));

module.exports = {
    StartServer,
    StopServer,
    RestartServer,
    BackupServer
}