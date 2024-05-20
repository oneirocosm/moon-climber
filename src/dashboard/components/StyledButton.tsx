import React, { PropsWithChildren } from 'react';
import Color from 'color';

type WarningButtonInnerProps = {
    children?: React.ReactNode,
    style?: React.CSSProperties,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void,
    onClick?: () => void,
}

function WarningButtonInner(props: WarningButtonInnerProps) {
    return (
        <button style={{
            ...props.style,
            borderRadius: "10000px",
            border: "1px solid black",
            marginLeft: "1rem",
            marginRight: "1rem",
        }}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

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