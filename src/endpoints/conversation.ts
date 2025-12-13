import {AbstractEndpoint} from "./abstract";
import {
    ConversationDeleteOutput,
    ConversationHistoryOutput,
    ConversationNameChangeOutput,
    ConversationsResponse,
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
     * This endpoint returns all conversation attributes for a given agent and user.
     *
     * @param agentId The agent ID.
     * @param userId The user ID to filter the conversation attributes by.
     *
     * @returns An array of conversation attributes.
     */
    async getConversations(agentId: string, userId: string): Promise<ConversationsResponse[]> {
        const response = await this.getHttpClient(agentId, userId).get(this.prefix);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch data from ${this.prefix}: ${response.statusText}`);
        }

        return response.data.map((item: any) => {
            const conversation = new ConversationsResponse();
            conversation.chat_id = item.chat_id;
            conversation.name = item.name;
            conversation.num_messages = item.num_messages;
            return conversation;
        });
    }

    /**
     * This endpoint deletes the conversation.
     *
     * @param agentId The agent ID.
     * @param userId The user ID to filter the conversation by.
     * @param chatId The chat ID to filter the conversation by.
     *
     * @returns The output of the deletion operation.
     */
    async deleteConversation(
        agentId: string,
        userId: string,
        chatId: string,
    ): Promise<ConversationDeleteOutput> {
        return this.delete<ConversationDeleteOutput>(
            this.formatUrl(chatId),
            agentId,
            userId,
        );
    }

    /**
     * This endpoint changes the name of the conversation.
     *
     * @param name The new name of the conversation.
     * @param agentId The agent ID.
     * @param userId The user ID to add the conversation history to.
     * @param chatId The chat ID to add the conversation history to.
     *
     * @returns The output of the change operation.
     */
    async postConversationName(
        name: string,
        agentId: string,
        userId: string,
        chatId: string,
    ): Promise<ConversationNameChangeOutput> {
        const payload = {name};

        return this.post<ConversationNameChangeOutput>(this.formatUrl(chatId), agentId, payload, userId);
    }
}