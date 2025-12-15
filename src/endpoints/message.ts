import {AbstractEndpoint} from "./abstract";
import {ChatOutput} from "../models/api/messages";
import {Message} from "../models/dtos";
import {SocketRequest} from "../models/socket";

export class MessageEndpoint extends AbstractEndpoint {
    /**
     * This endpoint sends a message to the agent identified by the agentId parameter. The message is sent via HTTP.
     *
     * @param message The message to send
     * @param agentId The ID of the agent to send the message to
     * @param userId The ID of the user sending the message
     * @param chatId The ID of the chat session (optional)
     *
     * @returns The response from the server
     */
    async sendHttpMessage(
        message: Message,
        agentId: string,
        userId: string,
        chatId?: string | null,
    ): Promise<ChatOutput> {
        return this.post<ChatOutput>(
            "/message",
            agentId,
            message.toJSON(),
            userId,
            chatId,
        );
    }

    /**
     * This endpoint sends a message to the agent identified by the agentId parameter. The message is sent via WebSocket.
     *
     * @param message The message to send
     * @param agentId The ID of the agent to send the message to
     * @param userId The ID of the user sending the message
     * @param chatId The ID of the chat session (optional)
     * @param closure A closure that is called when a non-chat message is received
     *
     * @returns The response from the server
     */
    async sendWebsocketMessage(
        message: Message,
        agentId: string,
        userId: string,
        chatId?: string | null,
        closure?: (content: string) => void | null
    ): Promise<ChatOutput> {
        const json = JSON.stringify(message.toJSON());
        if (!json) {
            throw new Error("Error encoding message");
        }

        const client = this.getWsClient(agentId, userId, chatId);

        return new Promise((resolve, reject) => {
            client.on("open", () => {
                client.send(json);
            });

            client.on("message", (data: SocketRequest) => {
                const content = data.toString();

                // Handle non-chat messages
                if (!content.includes('"type":"chat"')) {
                    if (closure) closure(content);
                    return;
                }

                client.close();
                try {
                    const messageOutput = this.deserialize<ChatOutput>(content);
                    resolve(messageOutput);
                } catch (error) {
                    reject(new Error("Error deserializing message: " + error));
                }
            });

            client.on("error", (error) => {
                reject(new Error("WebSocket error: " + error.description));
            });

            client.on("close", () => {
                reject(new Error("WebSocket connection closed unexpectedly"));
            });
        });
    }
}