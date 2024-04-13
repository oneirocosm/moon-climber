import React from 'react';
import PlayerStats from './PlayerStats';
import styled from 'styled-components';

type PlayerBlockProps = {
    id: string;
}

const PlayerScreen = styled.div`
    background-color: purple;
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
            <PlayerScreen>screen here</PlayerScreen>
            <PlayerStats id={props.id} />
        </div >
    )
}