import type NodeCG from '@nodecg/types';
import type { PlayerData } from '../types/playerdata';
import WebSocket from 'ws';
import parse from 'url-parse';

let socket: WebSocket;
let connecting: any = undefined;
let failedCount = 0;
let callbackID = Math.random() * 1000;
let apiKey: string;


function handler(event: WebSocket.MessageEvent) {
	console.log(JSON.stringify(event.data));
}


function connect() {
	if (!apiKey) {
		return;
	}
	clearTimeout(connecting)
	if (socket) {
		//socket.removeEventListener("message", handler)
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
			socket.send(JSON.stringify({ "join": apiKey }))
		} catch (e) {
			connecting = setTimeout(function () { connect(); }, 1)
		}
		//socket.send(JSON.stringify({ "join": "nbklri9t0k5tfg" }))
		//socket.send(JSON.stringify({ "join": "45igret40tj9" }))
	}

	socket.onmessage = handler

	/*
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
	*/
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

async function muteGameScreen(playerKey: string, mute: boolean) {
	try {
		socket.send(JSON.stringify({ "target": playerKey, "action": "mic", "value": !mute }))
	} catch (e) {
		connecting = setTimeout(function () { connect(); }, 1)
	}

}

function getPlayerKey(player: PlayerData): string {
	if (!player) {
		return "";
	}
	const url = parse(player.gameSource, true);
	return url.query.view as string;
}
function getApiKey(hostUrl: string): string {
	let url = parse(hostUrl ?? "", true);
	return url.query.api as string
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

	const selectedAudio = nodecg.Replicant('selectedAudio', { defaultValue: "none" });
	const hostUrl = nodecg.Replicant('hostUrl', { defaultValue: "" });

	const playerIds = ["player1", "player2", "player3", "player4"];
	const playerReps: Map<string, NodeCG.ServerReplicantWithSchemaDefault<PlayerData>> = new Map();
	for (const playerId of playerIds) {
		const player = nodecg.Replicant(playerId) as unknown as NodeCG.ServerReplicantWithSchemaDefault<PlayerData>;
		playerReps.set(playerId, player);
		player.on("change", (newValue, oldValue) => {
			if (newValue.gameSource !== oldValue?.gameSource) {
				const playerKey = getPlayerKey(newValue);
				muteGameScreen(playerKey, selectedAudio.value !== playerId)
			}
		});
	}

	hostUrl.on('change', (newValue) => {
		apiKey = getApiKey(newValue);
		console.log(apiKey)
		connect()
	})

	selectedAudio.on('change', (newValue, oldValue) => {
		for (const playerId of playerIds) {
			const playerKey = getPlayerKey(playerReps.get(playerId)?.value as PlayerData);
			if (!playerKey) {
				return;
			}
			muteGameScreen(playerKey, selectedAudio.value !== playerId)
		}
	})

	//requestStats()
};
