import React from 'react';
import { useReplicant, UseReplicantOptions } from '@nodecg/react-hooks'
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
            <h2>{props.id}</h2>
            <ControlForm label="Name">
                <input type="text" onChange={(e) => setPlayer({ ...player, name: e.target.value } as PlayerData)} />
            </ControlForm>
            <ControlForm label="Pronouns">
                <input type="text" onChange={(e) => setPlayer({ ...player, pronouns: e.target.value } as PlayerData)} />
            </ControlForm>
            <ControlForm label="Game vid url">
                <input type="text" onChange={(e) => setPlayer({ ...player, gameSource: e.target.value } as PlayerData)} />
            </ControlForm>
            <ControlForm label="Camera url">
                <input type="text" onChange={(e) => setPlayer({ ...player, camSource: e.target.value } as PlayerData)} />
            </ControlForm>
        </>
    );
}