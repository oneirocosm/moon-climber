import React, { IframeHTMLAttributes } from 'react';
import { useReplicant } from '@nodecg/react-hooks'
import styled from 'styled-components'
import { PlayerData } from '../../types/playerdata';

const PlayerCameraInner = styled.iframe`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const CameraContainer = styled.div`
    overflow: hidden;
    border-radius: 100%;
    background-color: black;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    margin: auto;
`

type PlayerCameraProps = {
    id: string,
}

export default function PlayerCamera(props: PlayerCameraProps) {
    const [player] = useReplicant<PlayerData>(props.id);
    return (
        <CameraContainer>
            <PlayerCameraInner id={`pcam-${props.id}`} allow="autoplay;camera" src={`${player?.camSource}&mutespeaker=1&hideheader=1&cleanoutput=1&fullscreen=1`} />
        </CameraContainer>
    )
}