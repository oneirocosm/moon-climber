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

const ScreenContainer = styled.div`
    border-radius: 20px;
    align-self: stretch;
    aspect-ratio: 16 / 9;
    overflow: hidden;
`;

type GameCameraProps = {
    id: string,
}

export default function GameCamera(props: GameCameraProps) {
    const [player] = useReplicant<PlayerData>(props.id);
    return (
        <ScreenContainer>
            <ScreenIframe
                allow="autoplay;camera"
                src={`${player?.gameSource}&cleanoutput=1&fullscreen=1`}
                style={{
                    transformOrigin: "50% 91%",
                    transform: `scale(${player?.gameScale ?? 1.0})`,
                }}
            />
        </ScreenContainer>
    );
}