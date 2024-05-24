import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";
import { wrap } from "@motionone/utils";
import { COLORS } from '../assets/constants';

import oshiro from '../assets/icons/oshiro.png';
import seeker from '../assets/icons/seeker.png';
import snowball from '../assets/icons/snowball.png';
import life from '../assets/icons/life.png';
import wind from '../assets/icons/wind.png';
import laugh from '../assets/icons/laugh.png';
import infinite from '../assets/icons/infinity.png';
import popeye from '../assets/icons/popeye.png';
import powerstar from '../assets/icons/powerstar.png';
import blank from '../assets/icons/blank.png';
import tired from '../assets/icons/tired.png';
import zoom from '../assets/icons/zoom.png';
import earthquake from '../assets/icons/earthquake.png';
import slip from '../assets/icons/slip.png';
import dpad from '../assets/icons/dpad.png';
import mirror from '../assets/icons/mirror.png';
import fast from '../assets/icons/clock-fast.png';
import turtle from '../assets/icons/turtle.png';
import hiccup from '../assets/icons/hiccup.png';

import "./HostBox.css";

interface EventType {
    icon: string;
    code: string;
    group: string;
}

const eventTypes: Array<EventType> = [
    {
        icon: infinite,
        code: "unlimited dashes",
        group: "help",
    },
    {
        icon: popeye,
        code: "infinite stamina",
        group: "help",
    },
    {
        icon: powerstar,
        code: "invincibility",
        group: "help",
    },
    {
        icon: oshiro,
        code: "oshiro",
        group: "hinder",
    },
    {
        icon: oshiro,
        code: "giant oshiro",
        group: "hinder",
    },
    {
        icon: seeker,
        code: "seeker",
        group: "hinder",
    },
    {
        icon: snowball,
        code: "snowballs",
        group: "hinder",
    },
    {
        icon: wind,
        code: "wind",
        group: "hinder",
    },
    {
        icon: laugh,
        code: "taunting laughter",
        group: "hinder",
    },
    {
        icon: blank,
        code: "invisibility",
        group: "hinder",
    },
    {
        icon: tired,
        code: "no stamina",
        group: "hinder",
    },
    {
        icon: zoom,
        code: "zoom camera",
        group: "hinder",
    },
    {
        icon: earthquake,
        code: "earthquake",
        group: "hinder",
    },
    {
        icon: fast,
        code: "speed up time",
        group: "hinder",
    },
    {
        icon: turtle,
        code: "slow down time",
        group: "hinder",
    },
    {
        icon: hiccup,
        code: "hiccups",
        group: "hinder",
    },
    {
        icon: slip,
        code: "ice physics",
        group: "hinder",
    },
    {
        icon: dpad,
        code: "invert d-pad",
        group: "hinder",
    },
    {
        icon: mirror,
        code: "flip screen",
        group: "hinder",
    },
    {
        icon: mirror,
        code: "mirror world",
        group: "hinder",
    },
    {
        icon: life,
        code: "kill player",
        group: "n/a",
    },
];

function ScrollBox() {
    return (
        <table style={{
            overflowY: "hidden",
            display: "flex",
            flexDirection: "column",
            flexShrink: 2,
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            border: `3px solid ${COLORS.MOONSHOT_CORE_PINK}`,
        }}>
            <tr>
                <th></th>
                <th>Code</th>
                <th>Group</th>
            </tr>

            {
                eventTypes.map((data) => (
                    <tr className="table-row" style={{
                        display: "flex",
                    }} key={uuidv4()}>
                        <td style={{
                            height: "2rem",
                            overflow: "visible",
                        }}
                            key={uuidv4()}
                        >
                            <img src={data.icon} style={{
                                borderRadius: "50%",
                                padding: 0,
                                height: "100%",
                                aspectRatio: "1 / 1",
                                objectFit: "cover",
                                backgroundColor: "white",
                            }}
                                key={uuidv4()}
                            />
                        </td>
                        <td style={{

                        }}
                            key={uuidv4()}
                        >
                            {data.code}
                        </td>
                        <td style={{

                        }}
                            key={uuidv4()}
                        >
                            {data.group}
                        </td>
                    </tr>
                ))
            }
        </table>
    );
}

function InfoBox() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
        }}>
            <ScrollBox />
            <span style={{
                flex: "1 0 auto",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
                border: `3px solid ${COLORS.MOONSHOT_CORE_PINK}`,
                borderTop: `0px solid ${COLORS.MOONSHOT_CORE_PINK}`,
                background: `${COLORS.MOONSHOT_CORE_DARK}`,
                color: `${COLORS.MOONSHOT_CORE_YELLOW}`,
                padding: "0.4rem",
            }}>
                To affect the game, go to <b>https://moonshotpods.com/donate</b> and select a reward that starts with "Celeste:".  "Kill" donations always kill, but you can specify a type of effect with "help" and "hinder" types by putting one of the codes above at the start of your comment. If you do this, please only select one reward per donation.
            </span>
        </div>
    )
}


export default function HostBox() {
    return (
        <div style={{
            display: "flex",
            height: 0,
            minHeight: "85%",
            margin: "5%",
        }}>
            <InfoBox />
            <div style={{
                background: "limegreen",
                alignSelf: "stretch",
                flex: "auto",
            }}>
            </div>

        </div>
    );
}