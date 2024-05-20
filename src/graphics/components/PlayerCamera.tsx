import React, { IframeHTMLAttributes } from 'react';
import { useReplicant } from '@nodecg/react-hooks'
import { PlayerData } from '../../types/playerdata';

function CameraContainer(props: React.PropsWithChildren) {
    return (
        <div style={{
            overflow: "hidden",
            borderRadius: "100%",
            backgroundColor: "black",
            width: "100%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            margin: "auto",
        }}
        >
            {props.children}
        </div>
    );
}

type PlayerCameraProps = {
    id: string,
}

export default function PlayerCamera(props: PlayerCameraProps) {
    const [player] = useReplicant<PlayerData>(props.id);
    return (
        <CameraContainer>
            <iframe
                id={`pcam-${props.id}`}
                allow="autoplay;camera"
                src={`${player?.camSource}&noaudio&hideheader=1&cleanoutput=1&fullscreen=1`}
                style={{
                    transform: `translate(-50%, -50%) scale(${player?.camScale ?? 1.0})`,
                    position: "relative",
                    top: "50%",
                    left: "50%",
                }}
            />
        </CameraContainer>
    )
}