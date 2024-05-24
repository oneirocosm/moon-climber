import React from 'react';
import { useListenFor } from '@nodecg/react-hooks'
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';

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

type EffectData = {
    playerId: string;
    time: number;
    code: string;
};

type IconState = {
    id: string;
    code: string;
};

type EffectContainerProps = {
    playerId: string;
}

function leftRow(id: string) {
    return id == "player1" || id == "player3";
}

export default function EffectContainer(props: EffectContainerProps) {
    let iconsRef = React.useRef<Array<IconState>>([]);
    let [icons, setIcons] = React.useState<Array<IconState>>([]);

    React.useEffect(() => {
        iconsRef.current = icons
    }, [icons])

    useListenFor(`effectresp-${props.playerId}`, (data: EffectData) => {
        // set up message here
        console.log("maybe...", data);


        if (data.time === 0) {
            return;
        }
        let uuid = uuidv4();
        let newIcons = [...icons];
        newIcons.push({ id: uuid, code: data.code });
        console.log("newicns", newIcons);
        setIcons(newIcons);

        setTimeout(() => {
            console.log("icnsfoo");
            let temp = iconsRef.current.filter((data) => data.id !== uuid);
            console.log("icns del", temp);
            setIcons(temp);
        }, data.time)
    });

    /*
    let itemIcons = Object.entries(icons).map(([key, data]) => {
        return (<span key={key} >a</span>);
    });
    */

    /*
    const itemIcons = React.useCallback(() => {
        return (Object.entries(icons).map(([key, data]) => <span style={{ color: "white" }} key={key}>a</span>))
    }, [icons])
    */

    return (
        <div style={{
            height: "2rem",
            margin: 0,
            padding: 0,
            marginLeft: "5%",
            marginRight: "5%",
            aspectRatio: "16 / 9",
            display: "flex",
            flexDirection: leftRow(props.playerId) ? "row" : "row-reverse",
            alignItems: "end",
            gap: "0.1rem",
            overflow: "visible",
        }}>
            <AnimatePresence mode="popLayout">
                {...icons.map((data: IconState) => {
                    return (
                        <motion.div style={{
                            height: "1.5rem",
                            overflow: "visible",
                        }}
                            key={data.id}
                            layout
                            initial={{
                                opacity: 0,
                                transform: "translateX(-1.5rem)",
                            }}
                            animate={{
                                opacity: 1,
                                transform: "translateX(0)",
                            }}
                            exit={{
                                opacity: 0,
                                transform: "translateX(-1.5rem)",
                            }}
                        >
                            <img src={effects[data.code].img} style={{
                                borderRadius: "50%",
                                padding: 0,
                                height: "100%",
                                aspectRatio: "1 / 1",
                                objectFit: "cover",
                                backgroundColor: "white",
                            }}
                                key={uuidv4()}
                            />
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>
    );

}