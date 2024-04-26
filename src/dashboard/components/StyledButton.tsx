import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Color from 'color';

const WarningButtonInner = styled.button`
    border-radius: 10000px;
    border: 1px solid black;
    margin-left: 1rem;
    margin-right: 1rem;
`;

type WarningButtonProps = {
    regColor: string;
    hoverColor?: string;
    textColor?: string;
    onClick: () => void,
    style?: React.CSSProperties,
};

export default function StyledButton(props: PropsWithChildren<WarningButtonProps>) {
    const [hovered, setHovered] = React.useState(false);
    const regColor = Color(props.regColor);
    let hoverColor = props.hoverColor ?? regColor.darken(0.2);
    let textColor = props.textColor ?? (regColor.isLight() ? "#000000" : "#FFFFFF");
    const style = props.style ?? {};

    return (
        <WarningButtonInner
            style={{
                color: textColor,
                backgroundColor: `${hovered ? hoverColor : regColor}`,
                ...style
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={props.onClick}
        >
            {props.children}
        </WarningButtonInner>
    )
}