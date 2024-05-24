import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";
import { wrap } from "@motionone/utils";
import { COLORS } from '../assets/constants';
import PlayerStats from "./PlayerStats";

import oshiro from '../assets/icons/oshiro.png';
import seeker from '../assets/icons/seeker.png';
import snowball from '../assets/icons/snowball.png';
import wind from '../assets/icons/wind.png';
import laugh from '../assets/icons/laugh.png';
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
import uno from '../assets/icons/uno.png';
import skull from '../assets/icons/skull.png';
import dash from '../assets/icons/dash.png';
import oshiroBig from '../assets/icons/oshiro-big.png';

import "./HostBox.css";

interface EventType {
    icon: string;
    code: string;
    group: string;
}

const eventTypes: Array<EventType> = [
    {
        icon: dash,
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
        icon: oshiroBig,
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
        icon: uno,
        code: "flip screen",
        group: "hinder",
    },
    {
        icon: mirror,
        code: "mirror world",
        group: "hinder",
    },
    {
        icon: skull,
        code: "kill player",
        group: "n/a",
    },
];

function ScrollBox() {
    const speed = -2;
    const baseY = useMotionValue(0);
    const y = useTransform(baseY, (v) => `${wrap(-50.05, 0, v)}%`)
    useAnimationFrame((t, delta) => {
        let move: number = 1 * speed * (delta / 1000);
        baseY.set(baseY.get() + move);
    })

    return (
        <table style={{
            overflowY: "hidden",
            display: "flex",
            flexDirection: "column",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            border: `3px solid ${COLORS.MOONSHOT_CORE_PINK}`,
            color: `${COLORS.MOONSHOT_CORE_YELLOW}`,
        }}>
            <div>
                <div className="table-row" style={{
                    borderBottom: `3px solid ${COLORS.MOONSHOT_CORE_PINK}`,
                    fontWeight: "bold",
                }}>
                    <div style={{
                        height: "2rem",
                        overflow: "visible",
                        marginRight: "2rem",
                        marginLeft: "0.3rem",
                        opacity: 0,
                    }}
                        key={uuidv4()}
                    >
                        <img src={popeye} style={{
                            borderRadius: "50%",
                            padding: 0,
                            height: "100%",
                            aspectRatio: "1 / 1",
                            objectFit: "cover",
                            backgroundColor: "white",
                        }}
                            key={uuidv4()}
                        />
                    </div>
                    <span className="cell-code">Code</span>
                    <span>Group</span>
                </div>
            </div>
            <div className="scroll-container">
                <motion.div className="table-body" style={{ y }}>
                    {
                        eventTypes.map((data) => (
                            <div className="table-row" style={{
                                display: "flex",
                            }} key={uuidv4()}>
                                <div style={{
                                    height: "2rem",
                                    overflow: "visible",
                                    marginRight: "2rem",
                                    marginLeft: "0.3rem",
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
                                </div>
                                <span className="cell-code"
                                    key={uuidv4()}
                                >
                                    {data.code}
                                </span>
                                <span style={{

                                }}
                                    key={uuidv4()}
                                >
                                    {data.group}
                                </span>
                            </div>
                        ))
                    }
                    {
                        eventTypes.map((data) => (
                            <div className="table-row" style={{
                                display: "flex",
                            }} key={uuidv4()}>
                                <div style={{
                                    height: "2rem",
                                    overflow: "visible",
                                    marginRight: "2rem",
                                    marginLeft: "0.3rem",
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
                                </div>
                                <span className="cell-code"
                                    key={uuidv4()}
                                >
                                    {data.code}
                                </span>
                                <span
                                    key={uuidv4()}
                                >
                                    {data.group}
                                </span>
                            </div>
                        ))
                    }
                </motion.div>
            </div >
        </table >
    );
}

function InfoBox() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
            fontFamily: "Exo2",
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
                To affect the game, go to <b>https://moonshotpods.com/donate</b> and select a reward that starts with "Celeste."  "Kill" donations always kill, but you can specify a type of effect for "help" and "hinder" donations by putting one of the codes above at the start of your comment. If you do this, please only select one reward per donation.
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
                alignSelf: "stretch",
                flex: "auto",
                display: "flex",
                justifyContent: "center",
            }}>
                <PlayerStats id="player4" style={{ width: "37.5%" }} />
            </div>
        </div>
    );
}