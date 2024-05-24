import type NodeCG from '@nodecg/types';
import type { PlayerData } from '../types/playerdata';
import parse from 'url-parse';
import { VdoNinjaAudio } from './vdo-ninja-audio';
import { PlayerServer } from './player-server';
import { CelesteEvent } from '../types/celesteevent';
import { selectEvent } from './dono-effect';
import { TiltifyEvent } from '../types/tiltify-event';

interface RewardClaim {
	id: string;
	reward_id: string;
	quantity: number;
}

interface Donation {
	amount: { currency: string, value: string };
	campaign_id: string;
	cause_id: string;
	completed_at: string;
	created_at: string;
	donor_comment?: string;
	donor_name?: string;
	fundraising_event_id: string;
	id: string;
	legacy_id: number;
	poll_id?: string;
	poll_option_id: string;
	reward_custom_question?: string;
	reward_id?: string;
	reward_claims?: Array<RewardClaim>;
	sustained: boolean;
	target_id?: string;
	team_event_id: string;
	shown: boolean;
	read: boolean;
}

type TiltifyRewardType = {
	player: string;
	type: string;
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

	const tiltifyRewards: Record<string, TiltifyRewardType> = {};
	tiltifyRewards[nodecg.bundleConfig.p1Pos as string] = { player: "player1", type: "positive" };
	tiltifyRewards[nodecg.bundleConfig.p1Neg as string] = { player: "player1", type: "negative" };
	tiltifyRewards[nodecg.bundleConfig.p1Kill as string] = { player: "player1", type: "kill" };
	tiltifyRewards[nodecg.bundleConfig.p2Pos as string] = { player: "player2", type: "positive" };
	tiltifyRewards[nodecg.bundleConfig.p2Neg as string] = { player: "player2", type: "negative" };
	tiltifyRewards[nodecg.bundleConfig.p2Kill as string] = { player: "player2", type: "kill" };
	tiltifyRewards[nodecg.bundleConfig.p3Pos as string] = { player: "player3", type: "positive" };
	tiltifyRewards[nodecg.bundleConfig.p3Neg as string] = { player: "player3", type: "negative" };
	tiltifyRewards[nodecg.bundleConfig.p3Kill as string] = { player: "player3", type: "kill" };

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
		console.log("sending ", data);
		playerConnection.send(JSON.stringify(data));
	});

	const donations = nodecg.Replicant('donations', 'nodecg-tiltify') as unknown as NodeCG.ServerReplicant<Array<Donation>>;
	donations.on("change", (newVal, oldVal) => {
		console.log("yes ");
		if (newVal === undefined) {
			return;
		}
		if (newVal.length == 0) {
			return;
		}
		const newest = newVal[newVal.length - 1];
		if (newest === undefined) {
			return;
		}
		console.log("sdonation ", newest);
		console.log("please ");
		const chosen = newest?.donor_comment ?? "";
		const donor = newest?.donor_name ?? "Anonymous";
		const claims = newest?.reward_claims ?? [];
		claims.forEach((reward) => {
			const rewardId = reward?.reward_id ?? "";
			console.log("reward id ", rewardId);
			const rewardType = tiltifyRewards[rewardId];
			console.log("reward type ", rewardType);
			if (rewardType === undefined) {
				return;
			}
			let code = selectEvent(chosen, rewardType.type);
			console.log("game code ", code);
			let celesteEvent: CelesteEvent = {
				playerId: rewardType.player,
				code: code,
				donor: donor,
			}
			console.log("event ", celesteEvent);
			nodecg.sendMessage("celesteEvent", celesteEvent);
		});
	});
};
