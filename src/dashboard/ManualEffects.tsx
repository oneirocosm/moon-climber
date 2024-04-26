import React from 'react';
import PlayerButtons from './components/PlayerButtons';

export function ManualEffects() {
    return (
        <>
            <PlayerButtons id="player1" />
            <PlayerButtons id="player2" />
            <PlayerButtons id="player3" />
            <PlayerButtons id="player4" />
        </>
    );
}