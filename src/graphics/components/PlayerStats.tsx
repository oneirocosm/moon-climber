import React, { PropsWithChildren } from 'react';
import { useReplicant } from '@nodecg/react-hooks';
import { PlayerData } from '../../types/playerdata';
import PlayerCamera from './PlayerCamera';
import { COLORS } from "../assets/constants";


type PlayerSummaryProps = {
    children?: React.ReactNode,
    style?: React.CSSProperties,
};

function PlayerSummary(props: PlayerSummaryProps) {
    return (
        <div style={{
            ...props.style,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
        }}
        >
            {props.children}
        </div>
    );
}

type PlayerStatsProps = {
    id: string,
    style?: React.CSSProperties
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
            fontFamily: "Exo2",
            color: `${COLORS.MOONSHOT_CORE_YELLOW}`,
            ...props.style,
        }}
        >
            <PlayerSummary style={{
                marginTop: topRow(props.id) ? "0" : "auto",
                marginBottom: topRow(props.id) ? "auto" : "0",
                opacity: 0,
            }}>
                <h3>Chapter</h3>
                <p>####</p>
                <h3>Screen</h3>
                <p>####</p>
            </PlayerSummary>
            <PlayerCamera id={props.id} />
            <PlayerSummary style={{
            }}>
                <h3 style={{ fontSize: "2rem" }}>{player?.name}</h3>
                <p style={{ fontSize: "1.2rem" }}>{player?.pronouns}</p>
            </PlayerSummary>
        </div>
    )
}