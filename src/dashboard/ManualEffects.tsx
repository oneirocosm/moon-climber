import React from 'react';
import PlayerButtons from './components/PlayerButtons';
import ControlForm from './components/ControlForm';

export function ManualEffects() {
    let [donor, setDonor] = React.useState("Anonymous");
    return (
        <>
            <ControlForm label="Donor">
                <input type="text"
                    value={donor}
                    onChange={(e) => setDonor(e.target.value)}
                />
            </ControlForm>
            <PlayerButtons id="player1" donor={donor} />
            <PlayerButtons id="player2" donor={donor} />
            <PlayerButtons id="player3" donor={donor} />
            <PlayerButtons id="player4" donor={donor} />
        </>
    );
}