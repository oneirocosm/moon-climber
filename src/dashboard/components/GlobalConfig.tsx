import React from 'react';
import { useReplicant } from '@nodecg/react-hooks';
import ControlForm from './ControlForm';
import FocusTrap from 'focus-trap-react';
import WarningButton from './WarningButton';

function WarningModal(props: React.PropsWithChildren) {
    return (
        <div style={{
            zIndex: 100,
            position: "fixed",
            top: "15%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "10rem",
            minHeight: "10rem",
            display: "grid",
            gridTemplate: "4fr 1fr / 1fr 1fr",
            backgroundColor: "#1B1971",
            overflow: "visible",
            border: "2px solid #999",
            borderRadius: "0.5rem",
            padding: "1rem",
        }}
        >
            {props.children}
        </div>
    );
}

function WarningText(props: React.PropsWithChildren) {
    return (
        <span style={{
            gridRow: 1,
            gridColumn: "1 / 3",
            color: "#FFEE83",
        }}
        >

        </span>
    )
}

function randomApiKey(): string {
    let key = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
        key += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return key;
}

export default function GlobalConfig() {
    const [hostUrl, setHostUrl] = useReplicant<string>("hostUrl");
    const [modal, setModal] = React.useState(false);

    return (
        <>
            <h3>Global Config</h3>
            <button
                onClick={() => setModal((m) => !m)}
                style={{
                    marginBottom: "0.5rem",
                }}
            >
                Generate VDO Ninja Host
            </button>
            <ControlForm label="Host URL:">
                <input type="text"
                    value={hostUrl}
                    onChange={(e) => setHostUrl(e.target.value)}
                />
            </ControlForm>
            {
                modal && (
                    <FocusTrap>
                        <WarningModal>
                            <WarningText>
                                Are you sure you want to do this? (It typically should only be done once at the start unless something went very wrong.)
                            </WarningText>
                            <WarningButton
                                regColor="#D50078"
                                hoverColor="#990066"
                                textColor="white"
                                onClick={() => setModal(false)}
                            >
                                No
                            </WarningButton>
                            <WarningButton
                                regColor="#666"
                                hoverColor="#444"
                                textColor="white"
                                onClick={() => {
                                    setModal(false);
                                    setHostUrl(`https://vdo.ninja/?api=${randomApiKey()}`)
                                }}>
                                Yes
                            </WarningButton>
                        </WarningModal>
                    </FocusTrap>
                )
            }
        </>
    )
}