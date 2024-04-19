import React from "react";

type SpeakerIconProps = {
    color: string;
    visible: boolean;
}

export default function SpeakerIcon(props: SpeakerIconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="500" height="500" viewBox="0 0 75 75">
            <path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
                style={{
                    stroke: `${props.color}`,
                    strokeWidth: 5,
                    strokeLinejoin: "round",
                    fill: `${props.color}`,
                    visibility: `${props.visible ? "visible" : "hidden"}`,
                }}
            />
            <path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
                style={{
                    fill: "none",
                    stroke: `${props.color}`,
                    strokeWidth: 5,
                    strokeLinecap: "round",
                    visibility: `${props.visible ? "visible" : "hidden"}`,
                }}
            />
        </svg>
    )
}