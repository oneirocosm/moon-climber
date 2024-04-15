import React from 'react';
import PlayerStats from './PlayerStats';
import styled from 'styled-components';

import GameCamera from './GameCamera';

type PlayerBlockProps = {
    id: string;
}

const PlayerScreen = styled.div`
    background-color: #222222;
    border-radius: 20px;
    height: 100%;
    aspect-ratio: 16 / 9;
`;


function leftRow(id: string) {
    return id == "player1" || id == "player3";
}

export default function PlayerBlock(props: PlayerBlockProps) {
    return (
        <div style={{
            margin: "5%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: leftRow(props.id) ? "row" : "row-reverse",
        }}
        >
            <GameCamera id={props.id} />
            <PlayerStats id={props.id} />
        </div >
    )
}