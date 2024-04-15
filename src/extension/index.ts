import type NodeCG from '@nodecg/types';
import type { PlayerData } from '../types/playerdata';

module.exports = function (nodecg: NodeCG.ServerAPI) {
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

};
