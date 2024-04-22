import WebSocket from 'ws';

let socket: WebSocket;
let connecting: any = undefined;
let failedCount = 0;
let callbackID = Math.random() * 1000;
let localApiKey: string;

function handler(event: WebSocket.MessageEvent) {
	console.log(JSON.stringify(event.data));
}


export namespace VdoNinjaAudio {
	export function connect(apiKey: string) {
		if (!apiKey && !localApiKey) {
			return;
		}
		if (!apiKey) {
			apiKey = localApiKey;
		}
		localApiKey = apiKey
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
			connecting = setTimeout(function () { connect(apiKey); }, 100 * (failedCount - 1))
		}

		socket.onerror = function (e) {
			console.error(e);
			failedCount += 1;
			clearTimeout(connecting);
			connecting = setTimeout(function () { connect(apiKey); }, 100 * (failedCount - 1))
		}

		socket.onopen = function () {
			failedCount = 0;
			try {
				socket.send(JSON.stringify({ "join": apiKey }))
			} catch (e) {
				connecting = setTimeout(function () { connect(apiKey); }, 1)
			}
		}

		socket.onmessage = handler
	}

	export function muteGameScreen(playerKey: string, mute: boolean) {
		try {
			socket.send(JSON.stringify({ "target": playerKey, "action": "mic", "value": !mute, "cid": callbackID }))
		} catch (e) {
			connecting = setTimeout(function () { connect(""); }, 1)
		}
	}
}
