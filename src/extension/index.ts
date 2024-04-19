import type NodeCG from '@nodecg/types';
import type { PlayerData } from '../types/playerdata';
import WebSocket from 'ws';

let socket: WebSocket;
let connecting: any = undefined;
let failedCount = 0;
let callbackID = Math.random() * 1000;
function connect() {
	clearTimeout(connecting)
	if (socket) {
		if (socket.readyState === socket.OPEN) { return; }
		try {
			socket.close();
		} catch (e) { };
	}

	socket = new WebSocket("wss://api.vdo.ninja:443");

	socket.onclose = function () {
		failedCount += 1;
		clearTimeout(connecting);
		connecting = setTimeout(function () { connect(); }, 100 * (failedCount - 1))
	}

	socket.onerror = function (e) {
		console.error(e);
		failedCount += 1;
		clearTimeout(connecting);
		connecting = setTimeout(function () { connect(); }, 100 * (failedCount - 1))
	}

	socket.onopen = function () {
		failedCount = 0;
		try {
			socket.send(JSON.stringify({ "join": "8ss5J7EyNC" }))
		} catch (e) {
			connecting = setTimeout(function () { connect(); }, 1)
		}
		//socket.send(JSON.stringify({ "join": "nbklri9t0k5tfg" }))
		//socket.send(JSON.stringify({ "join": "45igret40tj9" }))
	}

	socket.addEventListener('message', function (event) {
		if (event.data) {
			var data = JSON.parse(event.data as string);
			//console.log(data);
			if ("callback" in data) {
				if (data.callback.value == callbackID) {
					console.log("Received response. See developer console for the message.");
				} else {
					console.log(`other: ${JSON.stringify(data)}`)
				}
			}
		}
	});
}

async function requestStats() {
	let count = 0;
	while (true) {
		if (count < 10 && socket.readyState == socket.OPEN) {
			socket.send(JSON.stringify({ "action": "getDetails", "cid": callbackID }));
			count += 1;
		}
		await new Promise(r => setTimeout(r, 2000));
	}
}


module.exports = async function (nodecg: NodeCG.ServerAPI) {
	nodecg.log.info("Hello, from your bundle's extension!");
	nodecg.log.info("I'm where you put all your server-side code.");
	nodecg.log.info(
		`To edit me, open "${__filename.replace(
			'build/extension',
			'src/extension',
		)}" in your favorite text editor or IDE.`,
	);
	nodecg.log.info('You can use any libraries, frameworks, and tools you want. There are no limits.');
	nodecg.log.info('Visit https://nodecg.dev for full documentation.');
	nodecg.log.info('Good luck!');

	const player1 = nodecg.Replicant('player1') as unknown as NodeCG.ServerReplicantWithSchemaDefault<PlayerData>;
	const player2 = nodecg.Replicant('player2') as unknown as NodeCG.ServerReplicantWithSchemaDefault<PlayerData>;
	const player3 = nodecg.Replicant('player3') as unknown as NodeCG.ServerReplicantWithSchemaDefault<PlayerData>;
	const player4 = nodecg.Replicant('player4') as unknown as NodeCG.ServerReplicantWithSchemaDefault<PlayerData>;
	const selectedAudio = nodecg.Replicant('selectedAudio', { defaultValue: "none" });

	//connect()
	//requestStats()
};

async function testApi() {

}