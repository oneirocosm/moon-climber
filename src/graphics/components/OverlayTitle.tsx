import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../assets/constants'

import moonshotLogo from '../assets/moonshot-logo.png'


const OverlayTitleInner = styled.div`
    grid-row: 1;
    grid-column: 1 / 3 ;
    background-color: ${COLORS.MOONSHOT_CORE_DARK};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 5px solid ${COLORS.MOONSHOT_CORE_PINK};
    border-radius: 8px;
    margin: 1rem 1rem;
`;

const Title = styled.h1`
    text-align: center;
    color: white;
    font-family: Audiowide;
    font-size: 5rem;
    color: ${COLORS.MOONSHOT_CORE_YELLOW};
    margin-right: 2rem;
    transform: skew(-10deg, 0deg);
`;

export default function OverlayTitle() {
    return (
        <OverlayTitleInner>
            <img src={moonshotLogo} />
            <Title>CELESTE RACE</Title>
        </OverlayTitleInner>
    )

}