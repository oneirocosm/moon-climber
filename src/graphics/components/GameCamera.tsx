import React from 'react';
import { useReplicant } from '@nodecg/react-hooks'
import styled from 'styled-components'
import { PlayerData } from '../../types/playerdata';

const ScreenIframe = styled.iframe`
    background-color: #222222;
    border-radius: 20px;
    height: 100%;
    aspect-ratio: 16 / 9;
`;

type GameCameraProps = {
    id: string,
}

export default function GameCamera(props: GameCameraProps) {
    const [player] = useReplicant<PlayerData>(props.id);
    return (
        <ScreenIframe allow="autoplay;camera" src={player?.gameSource}></ScreenIframe>
    );
}