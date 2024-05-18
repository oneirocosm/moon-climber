import type NodeCG from '@nodecg/types';
import type { PlayerData } from '../types/playerdata';
import parse from 'url-parse';
import { VdoNinjaAudio } from './vdo-ninja-audio';
import { PlayerServer } from './player-server';
import { CelesteEvent } from '../types/celesteevent';


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
	const playerReps: Map<string, NodeCG.ServerReplicant<PlayerData>> = new Map();
	for (const playerId of playerIds) {
		const player = nodecg.Replicant(playerId) as unknown as NodeCG.ServerReplicant<PlayerData>;
		playerReps.set(playerId, player);
		player.on("change", (newValue, oldValue) => {
			if (!newValue) {
				return;
			}
			if (newValue.gameSource !== oldValue?.gameSource) {
				const playerKey = getPlayerKey(newValue);
				VdoNinjaAudio.muteGameScreen(playerKey, selectedAudio.value !== playerId)
			}
		});
	}

	hostUrl.on('change', (newValue) => {
		const apiKey = getApiKey(newValue);
		VdoNinjaAudio.connect(apiKey)
	})

	selectedAudio.on('change', (newValue) => {
		for (const playerId of playerIds) {
			const playerKey = getPlayerKey(playerReps.get(playerId)?.value as PlayerData);
			if (!playerKey) {
				return;
			}
			VdoNinjaAudio.muteGameScreen(playerKey, newValue !== playerId)
		}
	});

	const playerServer = new PlayerServer(playerReps, nodecg);

	nodecg.listenFor("celesteEvent", (data: CelesteEvent) => {
		const playerConnection = playerServer.connections.get(data.playerId);
		if (!playerConnection) {
			return;
		}
		playerConnection.send(JSON.stringify(data));
	});
};
