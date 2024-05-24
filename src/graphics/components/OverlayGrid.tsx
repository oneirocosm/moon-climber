import React, { PropsWithChildren } from 'react';
import vid from '../assets/celeste-space-loop.mp4';

function OverlayGridInner(props: React.PropsWithChildren) {
    return (
        <div style={{
            marginTop: "55px",
            display: "grid",
            gridTemplate: "4fr 13fr 13fr / 1fr 1fr",
            width: "1920px",
            height: "1025px",
            boxSizing: "border-box",
            backgroundColor: `${""}`,

        }}
        >
            {props.children}
        </div>
    );
}

export default function OverlayGrid(props: PropsWithChildren) {
    return (
        <>
            <video autoPlay={true} loop={true} muted={true} style={{
                width: "100%",
                position: "absolute",
                zIndex: -1,
            }}>
                <source src={vid} type="video/mp4" />
            </video>
            <OverlayGridInner>
                {props.children}
            </OverlayGridInner>
        </>
    )
}