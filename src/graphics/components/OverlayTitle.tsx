import React from 'react';
import { COLORS } from '../assets/constants'

import moonshotLogo from '../assets/moonshot-logo.png'

function OverlayTitleInner(props: React.PropsWithChildren) {
    return (
        <div style={{
            gridRow: 1,
            gridColumn: "1 / 3",
            backgroundColor: `${COLORS.MOONSHOT_CORE_DARK}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: `5px solid ${COLORS.MOONSHOT_CORE_PINK}`,
            borderRadius: "8px",
            margin: "1rem 1rem",
        }}
        >
            {props.children}
        </div>
    );
}

function Title(props: React.PropsWithChildren) {
    return (
        <h1 style={{
            textAlign: "center",
            fontFamily: "Audiowide",
            fontSize: "5rem",
            color: `${COLORS.MOONSHOT_CORE_YELLOW}`,
            marginRight: "2rem",
            transform: "skew(-10deg, 0deg)",
        }}
        >
            {props.children}
        </h1>
    );
}

export default function OverlayTitle() {
    return (
        <OverlayTitleInner>
            <img src={moonshotLogo} />
            <Title>CELESTE RACE</Title>
        </OverlayTitleInner>
    )

}