import fetch from 'node-fetch';
import https from 'https';

async function StartServer() {
	const response = await fetch(
		`<<url>>/api/v2/servers/<<serverId>>/stdin`,
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer <<token>>`,
				'Content-Type': 'application/json'
			},
			agent: new https.Agent({ rejectUnauthorized: false }),
			body: "say test"
		});

	const data = await response.json();
	console.log(data);
}

StartServer();