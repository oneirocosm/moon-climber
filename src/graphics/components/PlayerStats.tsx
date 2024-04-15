import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useReplicant } from '@nodecg/react-hooks';
import { PlayerData } from '../../types/playerdata';

type PlayerBlockProps = {
    top: boolean;
    left: boolean;
}

const PlayerSummary = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: start;
`;

const PlayerCamera = styled.div`
    border-radius: 100%;
    background-color: black;
    width: 100%;
    aspect-ratio: 1 / 1;
    margin: auto;
`;

type PlayerStatsProps = {
    id: string,
}

function topRow(id: string) {
    return id == "player1" || id == "player2";
}


export default function PlayerStats(props: PlayerStatsProps) {
    const [player] = useReplicant<PlayerData>(props.id);
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: topRow(props.id) ? "column" : "column-reverse",
            width: "15%",
        }}
        >
            <PlayerSummary style={{
                marginTop: topRow(props.id) ? "0" : "auto",
                marginBottom: topRow(props.id) ? "auto" : "0",
            }}>
                <h3>Chapter</h3>
                <p>####</p>
                <h3>Screen</h3>
                <p>####</p>
            </PlayerSummary>
            <PlayerCamera />
            <PlayerSummary style={{
            }}>
                <h3>{player?.name}</h3>
                <p>{player?.pronouns}</p>
            </PlayerSummary>
        </div>
    )
}