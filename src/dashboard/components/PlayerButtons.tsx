import React from 'react';
import styled from 'styled-components';
import StyledButton from './StyledButton';
import { COLORS } from '../assets/constants';

const ButtonsBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
`;

type PlayerButtonsProps = {
    id: string
}

const colors = [
    COLORS.MOONSHOT_CORE_PINK,
    COLORS.MOONSHOT_CORE_YELLOW,
    COLORS.MOONSHOT_EXTRA_BLUE,
    COLORS.MOONSHOT_EXTRA_BURGUNDY,
    COLORS.MOONSHOT_EXTRA_DARK_BLUE,
    COLORS.MOONSHOT_EXTRA_GOLD,
    COLORS.MOONSHOT_EXTRA_LIGHT_BLUE,
    COLORS.MOONSHOT_EXTRA_ORANGE,
    COLORS.MOONSHOT_EXTRA_PINK,
];

const effects = [
    { code: "oshiro", name: "Oshiro" },
    { code: "oshiro_giant", name: "Oshiro Giant" },
    { code: "seeker", name: "Seeker" },
    { code: "snowballs", name: "Snowballs" },
    { code: "chaser", name: "Badeline" },
    { code: "kill", name: "Kill Player" },
    { code: "wind", name: "Wind" },
    { code: "laughter", name: "Taunting Laughter" },
    { code: "dashes", name: "Unlimited Dashes" },
    { code: "stamina", name: "Infinite Stamina" },
    { code: "invincible", name: "Invincibility" },
    { code: "invisible", name: "Invisibility" },
    { code: "nostamina", name: "No Stamina" },
    { code: "zoom", name: "Zoom Camera" },
    { code: "earthquake", name: "Earthquake" },
    { code: "speed", name: "Speed Up Time" },
    { code: "slow", name: "Slow Down Time" },
    { code: "hiccups", name: "Hiccups" },
    { code: "icephysics", name: "Ice Physics" },
    { code: "invertdpad", name: "Invert D-Pad" },
    { code: "flipscreen", name: "Flip Screen" },
    { code: "mirrorworld", name: "Mirror World" },
];
function test() {
}

export default function PlayerButtons(props: PlayerButtonsProps) {
    return (
        <div>
            <h2>{props.id}</h2>
            <ButtonsBox>
                {
                    effects.map((effect, i) => <>
                        <StyledButton
                            regColor={colors[i % colors.length]}
                            onClick={() => {
                                nodecg.sendMessage(
                                    "celesteEvent",
                                    { playerId: props.id, code: effect.code }
                                );
                            }}

                            style={{ width: "40%" }}
                            key={`effectbutton-${props.id}-${effect.code}`}
                        >
                            {effect.name}
                        </StyledButton >
                    </>
                    )
                }
            </ButtonsBox>
        </div >
    );
}