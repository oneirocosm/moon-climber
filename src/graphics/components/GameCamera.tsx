import React from 'react';
import { useReplicant } from '@nodecg/react-hooks'
import styled from 'styled-components'
import { PlayerData } from '../../types/playerdata';
import { COLORS } from '../assets/constants';
import parse from 'url-parse';

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
    const [selectedAudio] = useReplicant<string>("selectedAudio")
    const [loudness, setLoudness] = React.useState(0);

    const getGuestId = React.useCallback((): string => {
        let url = parse(player?.gameSource ?? "", true);
        return url.query.view as string
    }, [player?.gameSource]);

    React.useEffect(() => {
        const iframe = document.getElementById(`${props.id}-gamecamera`) as HTMLIFrameElement;
        let timeout: ReturnType<typeof setTimeout>

        const requestLoudness = () => {
            if (!iframe || !iframe.contentWindow) {
                return;
            }
            iframe.contentWindow.postMessage({ "getLoudness": true }, "*");
            timeout = setTimeout(() => {
                console.log("timeout")
                requestLoudness()
            }, 100)
        }

        const handler = (event: MessageEvent<any>) => {
            console.log(JSON.stringify(event.data));
            if ("loudness" in event.data) {
                const loudnessVal = Number(event.data.loudness[getGuestId()]);
                const minSat = 5;
                const maxSat = 18;
                const minBorder = 2;
                const maxBorder = 7;
                const scaledLoudness = minBorder + (loudnessVal - minSat) * (maxBorder - minBorder) / (maxSat - minSat);
                const boundedLoudness = Math.min(Math.max(scaledLoudness, minBorder), maxBorder)
                setLoudness(boundedLoudness);
            }
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                requestLoudness()
            }, 50)
        }

        console.log("foo")
        window.addEventListener("message", handler);

        return () => {
            clearTimeout(timeout)
            window.removeEventListener("message", handler);
        }
    }, [getGuestId]);

    return (
        <>
            <ScreenContainer style={{
                boxSizing: "border-box",
                boxShadow: `${selectedAudio === props.id ? `0 0 0 ${loudness}px ${COLORS.MOONSHOT_CORE_PINK}` : ""}`,
            }}>
                <ScreenIframe
                    allow="autoplay;camera"
                    id={`${props.id}-gamecamera`}
                    src={`${player?.gameSource}&cleanoutput=1&fullscreen=1&style=3&meterstyle=4`}
                    style={{
                        transformOrigin: "50% 91%",
                        transform: `scale(${player?.gameScale ?? 1.0})`,
                    }}
                />
            </ScreenContainer>
        </>
    );
}