import { isTemplateSpan } from "typescript";
import { EventCode } from "../types/event-code";
import { TiltifyEvent } from "../types/tiltify-event";

const positiveEffects: Array<EventCode> = [
    "dashes",
    "stamina",
    "invincible",
];

const negativeEffects: Array<EventCode> = [
    "oshiro",
    "oshiro_giant",
    "seeker",
    "snowballs",
    "wind",
    "laughter",
    "invisible",
    "nostamina",
    "zoom",
    "earthquake",
    "speed",
    "slow",
    "hiccups",
    "icephysics",
    "invertdpad",
    "flipscreen",
    "mirrorworld",
];

const effects: { [key: string]: EventCode } = {
    "oshiro": "oshiro",
    "giant oshiro": "oshiro_giant",
    "seeker": "seeker",
    "snowballs": "snowballs",
    "kill player": "kill",
    "wind": "wind",
    "taunting laughter": "laughter",
    "unlimited dashes": "dashes",
    "infinite stamina": "stamina",
    "invincibility": "invincible",
    "invisibility": "invisible",
    "no stamina": "nostamina",
    "zoom camera": "zoom",
    "earthquake": "earthquake",
    "speed up time": "speed",
    "slow down time": "slow",
    "hiccups": "hiccups",
    "ice physics": "icephysics",
    "invert d-pad": "invertdpad",
    "flip screen": "flipscreen",
    "mirror world": "mirrorworld",
};

function chooseRandom(arr: Array<EventCode>): EventCode {
    return arr[Math.floor(Math.random() * arr.length)];
}

function chooseRandomPositive(): EventCode {
    return chooseRandom(positiveEffects);
}

function chooseRandomNegative(): EventCode {
    return chooseRandom(negativeEffects);
}

function selectChosenCode(tiltifyComment: string): EventCode | undefined {
    const lowercaseComment = tiltifyComment.toLowerCase().trim();
    for (const key in effects) {
        if (lowercaseComment.startsWith(key)) {
            return effects[key];
        }
    }
    return undefined;
}

export function selectEvent(chosen: string, donoType: string): EventCode {
    if (donoType === "kill") {
        return "kill"
    }
    const chosenCode = selectChosenCode(chosen);
    if (chosenCode !== undefined) {
        return chosenCode;
    }
    if (donoType === "positive") {
        return chooseRandomPositive();
    } else {
        return chooseRandomNegative();
    }
}
