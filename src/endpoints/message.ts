import {AbstractEndpoint} from "./abstract";
import {MessageOutput} from "../models/api/messages";
import {Message} from "../models/dtos";
import WebSocket from "ws";

export class MessageEndpoint extends AbstractEndpoint {
    async sendHttpMessage(message: Message, agentId?: string, userId?: string): Promise<MessageOutput> {
        return this.postJson<MessageOutput>(
            "/message",
            message.toJSON(),
            agentId,
            userId
        );
    }

    async sendWebsocketMessage(
        message: Message,
        agentId?: string,
        userId?: string,
        closure?: (content: string) => void
    ): Promise<MessageOutput> {
        const json = JSON.stringify(message.toJSON());
        if (!json) {
            throw new Error("Error encoding message");
        }

        const client = this.getWsClient(agentId, userId);

        return new Promise((resolve, reject) => {
            client.on("open", () => {
                client.send(json);
            });

            client.on("message", (data: WebSocket.Data) => {
                const content = typeof data === 'string' ? data : data.toString();

                // Handle non-chat messages
                if (!content.includes('"type":"chat"')) {
                    if (closure) closure(content);
                    return;
                }

                client.close();
                try {
                    const messageOutput = this.deserialize<MessageOutput>(content);
                    resolve(messageOutput);
                } catch (error) {
                    reject(new Error("Error deserializing message: " + error));
                }
            });

            client.on("error", (error) => {
                reject(new Error("WebSocket error: " + error.message));
            });

            client.on("close", () => {
                reject(new Error("WebSocket connection closed unexpectedly"));
            });
        });
    }
}