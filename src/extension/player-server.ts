import WebSocket from "ws";
import parse from "url-parse";
import { PlayerData } from "../types/playerdata";
import NodeCG from "@nodecg/types";
import { Mutex } from "async-mutex";

export class PlayerServer {
    connections: Map<string, WebSocket>;
    server: WebSocket.Server;
    private mutex: Mutex;

    constructor(playerReps: Map<string, NodeCG.ServerReplicant<PlayerData>>, nodecg: NodeCG.ServerAPI) {
        this.connections = new Map();
        this.mutex = new Mutex();

        const ws = new WebSocket.Server({ port: 3000, path: "/playerconnect" });
        this.server = ws;

        ws.on('connection', async (connection: WebSocket, request: Request) => {
            let unlock = await this.mutex.acquire();
            const token = parse(request.url, true).query.token ?? "";
            let connPlayerId: string = "";
            console.log(token);

            for (const [playerId, player] of playerReps) {
                if (!player || !player.value) {
                    // do not register while player not established
                    continue
                }
                if (this.connections.has(playerId)) {
                    // do not reregister
                    continue
                }
                const playerToken = parse(player?.value?.gameSource ?? "", true).query.view ?? "";

                if (token == playerToken) {
                    this.connections.set(playerId, connection);
                    connPlayerId = playerId;
                    player.value.bridgeConnected == true;
                    break;
                }
            }
            unlock();

            if (connPlayerId === "") {
                connection.close();
                return
            }

            connection.on("message", (json: string) => {
                let success = JSON.parse(json);
                let msgName = `effectresp-${success.playerId}`;
                nodecg.sendMessage(msgName, success);
                console.log(success);
            });

            connection.on("close", async () => {
                let unlock = await this.mutex.acquire();
                this.connections.delete(connPlayerId)
                let player = playerReps.get(connPlayerId);
                if (player && player.value) {
                    player.value.bridgeConnected = false;
                }
                unlock();
            });

        });
    }
}
