import React, { PropsWithChildren } from 'react';

type ControlFormsProps = {
    label: string;
}

export default function ControlForm(props: PropsWithChildren<ControlFormsProps>) {
    return (
        <form>
            <label>
                {`${props.label}: `}
            </label>
            {props.children}
        </form>
    )
}