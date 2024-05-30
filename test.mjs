import fetch from 'node-fetch';
import https from 'https';

async function StartServer() {
	const response = await fetch('https://2.120.153.250:8443/api/v2/servers/fd5c3caa-efa1-49d6-a45c-d3c0d3eccb81/action/start_server', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3MTY4NTQxODYsInRva2VuX2lkIjozfQ.emPipTBTaTwA7auDTSWmHkYKG_xTxwgGkrMHTf8DIj0',
			'Content-Type': 'application/json'
		},
		agent: new https.Agent({ rejectUnauthorized: false })
	});

	const data = await response.json();
	console.log(data);
}

StartServer();