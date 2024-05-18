import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

type IconBoxProps = {
    src: string;
    height: string;
}

export default function IconBox(props: IconBoxProps) {
    return (
        <motion.div style={{
            height: `${props.height}`,
            overflow: "visible",
        }}
            key={uuidv4()}
            initial={{
                opacity: 0,
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
            <img src={props.src} style={{
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
    );
}