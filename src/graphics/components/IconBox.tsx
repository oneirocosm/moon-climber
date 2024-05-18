import React from 'react';

type IconBoxProps = {
    src: string;
    height: string;
}

export default function IconBox(props: IconBoxProps) {
    return (
        <div style={{
            height: `${props.height}`,
            overflow: "visible",
        }}
        >
            <img src={props.src} style={{
                borderRadius: "50%",
                padding: 0,
                height: "100%",
                aspectRatio: "1 / 1",
                objectFit: "cover",
                backgroundColor: "white",
            }} />
        </div>
    );
}