import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const WarningButtonInner = styled.button`
    border-radius: 10000px;
    border: 1px solid black;
    margin-left: 1rem;
    margin-right: 1rem;
`

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