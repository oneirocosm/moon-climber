import React from "react";

type RadioInputProps = {
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioInput(props: RadioInputProps) {
    return (
        <label>
            <input
                type="radio"
                name={props.name}
                value={props.value}
                checked={props.checked}
                onChange={props.onChange}
            />
            <span style={{ marginRight: "1rem" }}>{props.name}</span>
        </label>

    )
}