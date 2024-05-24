import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { useListenFor } from '@nodecg/react-hooks'

import { COLORS } from '../assets/constants'
import oshiro from '../assets/icons/oshiro.png';
import seeker from '../assets/icons/seeker.png';
import snowball from '../assets/icons/snowball.png';
import badeline from '../assets/icons/badeline.png';
import sad from '../assets/icons/sad.png';
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

type Effect = {
    name: string;
    img: string;
};

type EffectMap = { [key: string]: Effect };

const effects: EffectMap = {
    "oshiro": {
        name: "Oshiro",
        img: oshiro,
    },
    "oshiro_giant": {
        name: "Giant Oshiro",
        img: oshiroBig,
    },
    "seeker": {
        name: "Seeker",
        img: seeker,
    },
    "snowballs": {
        name: "Snowballs",
        img: snowball,
    },
    "chaser": {
        name: "Badeline",
        img: badeline,
    },
    "kill": {
        name: "Kill Player",
        img: skull,
    },
    "reset": {
        name: "Reset Level",
        img: sad,
    },
    "wind": {
        name: "Wind",
        img: wind,
    },
    "laughter": {
        name: "Taunting Laughter",
        img: laugh,
    },
    "dashes": {
        name: "Unlimited Dashes",
        img: dash,
    },
    "stamina": {
        name: "Infinite Stamina",
        img: popeye,
    },
    "invincible": {
        name: "Invincibility",
        img: powerstar,
    },
    "invisible": {
        name: "Invisibility",
        img: blank,
    },
    "nostamina": {
        name: "No Stamina",
        img: tired,
    },
    "zoom": {
        name: "Zoom Camera",
        img: zoom,
    },
    "earthquake": {
        name: "Earthquake",
        img: earthquake,
    },
    "speed": {
        name: "Speed Up Time",
        img: fast,
    },
    "slow": {
        name: "Slow Down Time",
        img: turtle,
    },
    "hiccups": {
        name: "Hiccups",
        img: hiccup,
    },
    "icephysics": {
        name: "Ice Physics",
        img: slip,
    },
    "invertdpad": {
        name: "Invert D-Pad",
        img: dpad,
    },
    "flipscreen": {
        name: "Flip Screen",
        img: uno,
    },
    "mirrorworld": {
        name: "Mirror World",
        img: mirror,
    },
};

type DonoMsgBoxProps = {
    playerId: string;
};

type MsgState = {
    id: string,
    code: string,
    donor: string,
};

type IconBoxProps = {
    src: string;
    height: string;
}

function IconBox(props: IconBoxProps) {
    return (
        <div style={{
            height: `${props.height}`,
            overflow: "visible",
        }}
        >
            <img src={props.src} style={{
                borderRadius: "50%",
                padding: 0,
                height: "100%",
                aspectRatio: "1 / 1",
                objectFit: "cover",
                backgroundColor: "white",
            }}
            />
        </div>
    );
}

type EffectDecorProps = {
    children?: React.ReactNode,
    style?: React.CSSProperties,
}

function EffectDecor(props: EffectDecorProps) {
    return (
        <h3 style={{
            ...props.style,
            fontFamily: "Audiowide",
            padding: 0,
            margin: 0,
            textShadow: "0 0 4px white, 0 0 4px white, 0 0 4px white, 0 0 4px white",
            whiteSpace: "nowrap",
        }}>
            {props.children}
        </h3>

    );
}

type MsgTextProps = {
    effect: string;
    donor: string;
}


function MsgText(props: MsgTextProps) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            textTransform: "uppercase",
            alignItems: "center",
            color: `${COLORS.MOONSHOT_CORE_PINK}`,
        }}>
            <EffectDecor style={{
                fontSize: "2rem",
                transform: "skew(-10deg, 0deg)",
            }}>{props.effect}</EffectDecor>
            <div style={{
                display: "flex",
                alignItems: "center",
            }}>
                <EffectDecor style={{
                    fontSize: "1rem",
                    verticalAlign: "middle",
                }}>from&nbsp;&nbsp;</EffectDecor>
                <EffectDecor style={{
                    fontSize: "1.5rem",
                    transform: "skew(-10deg, 0deg)",
                    textTransform: "uppercase",
                }}>{props.donor}</EffectDecor>
            </div>
        </div>

    );
}

type MsgContentProps = {
    src: string;
    effect: string;
    donor: string;
};

function MsgContent(props: MsgContentProps) {
    return (
        <div style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
        }}>
            <IconBox height="3rem" src={props.src} />
            <MsgText effect={props.effect} donor={props.donor} />
        </div>
    );
}

type EffectData = {
    playerId: string;
    time: number;
    code: string;
    donor: string;
};

export default function DonoMsgBox(props: DonoMsgBoxProps) {
    let msgsRef = React.useRef<Array<MsgState>>([]);
    let [msgs, setMsgs] = React.useState<Array<MsgState>>([]);

    React.useEffect(() => {
        msgsRef.current = msgs;
    }, [msgs]);

    useListenFor(`effectresp-${props.playerId}`, (data: EffectData) => {
        let uuid = uuidv4();
        setMsgs([...msgs, { id: uuid, code: data.code, donor: data.donor }]);

        setTimeout(() => {
            setMsgs(msgsRef.current.filter((msg) => msg.id !== uuid));
        }, 3000);
    });

    return (
        <div style={{
            zIndex: 50,
            gridColumn: "1 / span 1",
            gridRow: "1 / span 1",
            display: "flex",
            justifyContent: "center",
        }}>
            <div style={{
                marginTop: "15%",
                display: "flex",
                flexDirection: "column",
            }}>
                <AnimatePresence mode="popLayout">
                    {...msgs.map((data) => {
                        //return <IconBox src={effects[data.code].img} height="3rem" />
                        //return <MsgText effect={effects[data.code].name} donor="todo" />
                        return (
                            <motion.div
                                key={data.id}
                                layout
                                initial={{
                                    opacity: 0,
                                    transform: "translateY(-1.5rem)",
                                }}
                                animate={{
                                    opacity: 1,
                                    transform: "translateY(0)",
                                }}
                                exit={{
                                    opacity: 0,
                                    transform: "translateY(1.5rem)",
                                }}
                            >
                                <MsgContent src={effects[data.code].img}
                                    effect={effects[data.code].name}
                                    donor={data.donor}
                                />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}