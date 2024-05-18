import React from 'react';
import PlayerStats from './PlayerStats';
import GameCamera from './GameCamera';
import EffectContainer from './EffectContainer';

type PlayerBlockProps = {
    id: string;
}

function leftRow(id: string) {
    return id == "player1" || id == "player3";
}

export default function PlayerBlock(props: PlayerBlockProps) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
        }}
        >

            <div style={{
                margin: "5%",
                marginBottom: 0,
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: leftRow(props.id) ? "row" : "row-reverse",
            }}
            >
                <GameCamera id={props.id} />
                <PlayerStats id={props.id} />
            </div >
            <EffectContainer playerId={props.id} />
        </div>
    )
}