import React from 'react';
import { useReplicant } from '@nodecg/react-hooks';
import RadioInput from './RadioInput';

export default function AudioSelection() {
    const [selectedAudio, setSelectedAudio] = useReplicant<string>("selectedAudio")

    return (
        <div style={{ marginBottom: "2rem" }}>
            <h3>Audio Select:</h3>
            <form>
                <RadioInput
                    name="None"
                    value="none"
                    checked={selectedAudio == "none"}
                    onChange={(e) => setSelectedAudio(e.target.value)}
                />
                <RadioInput
                    name="P1"
                    value="player1"
                    checked={selectedAudio == "player1"}
                    onChange={(e) => setSelectedAudio(e.target.value)}
                />
                <RadioInput
                    name="P2"
                    value="player2"
                    checked={selectedAudio == "player2"}
                    onChange={(e) => setSelectedAudio(e.target.value)}
                />
                <RadioInput
                    name="P3"
                    value="player3"
                    checked={selectedAudio == "player3"}
                    onChange={(e) => setSelectedAudio(e.target.value)}
                />
                <RadioInput
                    name="P4"
                    value="player4"
                    checked={selectedAudio == "player4"}
                    onChange={(e) => setSelectedAudio(e.target.value)}
                />
            </form>
        </div>
    )
}