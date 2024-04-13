import React from 'react';
import OverlayGrid from './components/OverlayGrid';
import OverlayTitle from './components/OverlayTitle';
import PlayerBlock from './components/PlayerBlock';

export function Index() {
	return (
		<OverlayGrid>
			<OverlayTitle />
			<PlayerBlock id="player1" />
			<PlayerBlock id="player2" />
			<PlayerBlock id="player3" />
			<PlayerBlock id="player4" />
		</OverlayGrid>
	);
}
