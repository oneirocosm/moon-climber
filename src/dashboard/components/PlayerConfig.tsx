import React from 'react';
import { useReplicant } from '@nodecg/react-hooks';
import ControlForm from './ControlForm';
import { PlayerData } from '../../types/playerdata';

type PlayerConfigProps = {
    id: string;
}

export default function PlayerConfig(props: PlayerConfigProps) {
    const [player, setPlayer] = useReplicant<PlayerData>(props.id);

    function setName(newName: string) {
        const updatedPlayer = {
            ...player,
            name: newName,
        };
        setPlayer(updatedPlayer as PlayerData)
    }
    return (
        <>
            <h3>{props.id}</h3>
            <ControlForm label="Name">
                <input type="text"
                    value={player?.name ?? ""}
                    onChange={(e) => setPlayer({ ...player, name: e.target.value } as PlayerData)}
                />
            </ControlForm>
            <ControlForm label="Pronouns">
                <input type="text"
                    value={player?.pronouns ?? ""}
                    onChange={(e) => setPlayer({ ...player, pronouns: e.target.value } as PlayerData)}
                />
            </ControlForm>
            <ControlForm label="Game vid url">
                <input type="text"
                    value={player?.gameSource ?? ""}
                    onChange={(e) => setPlayer({ ...player, gameSource: e.target.value } as PlayerData)}
                />
            </ControlForm>
            <ControlForm label="Camera url">
                <input type="text"
                    value={player?.camSource ?? ""}
                    onChange={(e) => setPlayer({ ...player, camSource: e.target.value } as PlayerData)}
                />
            </ControlForm>
            <ControlForm label="Game scale">
                <input type="number"
                    value={player?.gameScale ?? 1.0}
                    min={0.1} max={100} step={0.01}
                    onChange={(e) => setPlayer({ ...player, gameScale: Number(e.target.value) } as PlayerData)}
                />
            </ControlForm>
            <ControlForm label="Camera scale">
                <input type="number"
                    value={player?.camScale ?? 1.0}
                    min={0.1} max={100} step={0.01}
                    onChange={(e) => setPlayer({ ...player, camScale: Number(e.target.value) } as PlayerData)}
                />
            </ControlForm>
        </>
    );
}