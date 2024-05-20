import React from 'react';
import { useReplicant } from '@nodecg/react-hooks'
import { PlayerData } from '../../types/playerdata';
import { COLORS } from '../assets/constants';
import parse from 'url-parse';
import DonoMsgBox from './DonoMsgBox';


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
            <div style={{
                boxSizing: "border-box",
                boxShadow: `${selectedAudio === props.id ? `0 0 0 ${loudness}px ${COLORS.MOONSHOT_CORE_PINK}` : ""}`,
                borderRadius: "20px",
                alignSelf: "stretch",
                aspectRatio: "16 / 9",
                overflow: "hidden",
                display: "grid",
                gridTemplate: "1fr /1fr",
            }}>
                <iframe
                    allow="autoplay;camera"
                    id={`${props.id}-gamecamera`}
                    src={`${player?.gameSource}&cleanoutput=1&fullscreen=1&style=3&meterstyle=4`}
                    style={{
                        transformOrigin: "50% 91%",
                        transform: `scale(${player?.gameScale ?? 1.0})`,
                        gridColumn: "1 / span 1",
                        gridRow: "1 / span 1",
                        backgroundColor: "#222222",
                        borderRadius: "20px",
                        height: "100%",
                        aspectRatio: "16 / 9",
                    }}
                >
                </iframe>
                <DonoMsgBox playerId={props.id} />
            </div>
        </>
    );
}