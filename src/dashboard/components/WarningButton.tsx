import React, { PropsWithChildren } from 'react';

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
    hoverColor: string;
    textColor: string;
    onClick: () => void,
};

export default function WarningButton(props: PropsWithChildren<WarningButtonProps>) {
    const [hovered, setHovered] = React.useState(false);
    return (
        <WarningButtonInner
            style={{
                color: props.textColor,
                backgroundColor: `${hovered ? props.hoverColor : props.regColor}`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={props.onClick}
        >
            {props.children}
        </WarningButtonInner>
    )
}