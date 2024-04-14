import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { COLORS } from '../assets/constants';
import vid from '../assets/celeste-space-loop.mp4';

const OverlayGridInner = styled.div`
    display: grid;
    grid-template: 4fr 13fr 13fr / 1fr 1fr;
    width: 1920px;
    height: 1080px;
    box-sizing: border-box;
    background-color: ${""};
`;

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