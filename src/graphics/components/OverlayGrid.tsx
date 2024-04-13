import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const OverlayGridInner = styled.div`
    display: grid;
    grid-template: 4fr 13fr 13fr / 1fr 1fr;
    width: 1920px;
    height: 1080px;
    box-sizing: border-box;
    background-image: url(${""});
`;

export default function OverlayGrid(props: PropsWithChildren) {
    return (
        <OverlayGridInner>
            {props.children}
        </OverlayGridInner>
    )
}