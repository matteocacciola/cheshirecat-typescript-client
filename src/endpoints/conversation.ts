import {AbstractEndpoint} from "./abstract";
import {
    ConversationHistoryDeleteOutput,
    ConversationHistoryOutput,
} from "../models/api/conversations";
import {Role} from "../types";
import {Why} from "../models/dtos";

export class ConversationEndpoint extends AbstractEndpoint {
    protected prefix = "/conversation";

    /**
     * This endpoint returns the conversation history.
     *
     * @param agentId The agent ID.
     * @param userId The user ID to filter the conversation history by.
     * @param chatId The chat ID to filter the conversation history by.
     *
     * @returns The conversation history.
     */
    async getConversationHistory(
        agentId: string,
        userId: string,
        chatId: string,
    ): Promise<ConversationHistoryOutput> {
        return this.get<ConversationHistoryOutput>(this.formatUrl(chatId), agentId, userId);
    }

    /**
     * This endpoint returns all conversation histories for a given agent and user.
     *
     * @param agentId The agent ID.
     * @param userId The user ID to filter the conversation histories by.
     *
     * @returns An object with keys as chat IDs and values as ConversationHistoryOutput.
     */
    async getConversationHistories(agentId: string, userId: string): Promise<object> {
        const response = await this.getHttpClient(agentId, userId).get(this.prefix);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch data from ${this.prefix}: ${response.statusText}`);
        }

        const result: Record<string, ConversationHistoryOutput> = {};
        for (const [key, item] of response.data) {
            result[key] = this.deserialize<ConversationHistoryOutput>(JSON.stringify(item))
        }

        return result;
    }

    /**
     * This endpoint deletes the conversation history.
     *
     * @param agentId The agent ID.
     * @param userId The user ID to filter the conversation history by.
     * @param chatId The chat ID to filter the conversation history by.
     *
     * @returns The output of the deletion operation.
     */
    async deleteConversationHistory(
        agentId: string,
        userId: string,
        chatId: string,
    ): Promise<ConversationHistoryDeleteOutput> {
        return this.delete<ConversationHistoryDeleteOutput>(
            this.formatUrl(chatId),
            agentId,
            userId,
        );
    }

    /**
     * This endpoint creates a new element in the conversation history.
     *
     * @param who The speaker of the conversation history.
     * @param text The text of the conversation history.
     * @param agentId The agent ID.
     * @param userId The user ID to add the conversation history to.
     * @param chatId The chat ID to add the conversation history to.
     * @param image The image of the conversation history.
     * @param why The reason for the conversation history.
     *
     * @returns The conversation history.
     */
    async postConversationHistory(
        who: Role,
        text: string,
        agentId: string,
        userId: string,
        chatId: string,
        image?: string | null,
        why?: Why | null,
    ): Promise<ConversationHistoryOutput> {
        const payload = {
            who: who,
            text,
            ...(image && {image}),
            ...(why && {why: why.toArray()}),
        };

        return this.post<ConversationHistoryOutput>(this.formatUrl(chatId), agentId, payload, userId);
    }
}