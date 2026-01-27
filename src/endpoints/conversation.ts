import {AbstractEndpoint} from "./abstract";
import {
    ConversationDeleteOutput,
    ConversationHistoryOutput,
    ConversationAttributesChangeOutput,
    ConversationsResponse,
} from "../models/api/conversations";

export class ConversationEndpoint extends AbstractEndpoint {
    protected prefix = "/conversations";

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
        return this.get<ConversationHistoryOutput>(this.formatUrl(`/${chatId}/history`), agentId, userId);
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

        const conversations = response.data;
        return conversations.map((conversation: any) => this.deserialize<ConversationsResponse>(
            JSON.stringify(conversation)
        ));
    }

    /**
     * This endpoint returns the attributes of a given conversation, for a given agent and user.
     *
     * @param agentId The agent ID.
     * @param userId The user ID to filter the conversation attributes by.
     * @param chatId The chat ID to filter the conversation attributes by.
     *
     * @returns The conversation attributes.
     */
    async getConversation(agentId: string, userId: string, chatId: string): Promise<ConversationsResponse> {
        return this.get<ConversationsResponse>(this.formatUrl(chatId), agentId, userId);
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
     * @param agentId The agent ID.
     * @param userId The user ID to add the conversation history to.
     * @param chatId The chat ID to add the conversation history to.
     * @param name The new name of the conversation.
     * @param metadata The metadata to associate to the conversation.
     *
     * @returns The output of the change operation.
     */
    async putConversationAttributes(
        agentId: string,
        userId: string,
        chatId: string,
        name?: string | null,
        metadata?: Record<string, any>
    ): Promise<ConversationAttributesChangeOutput> {
        if (!name && !metadata) {
            throw new Error("Either name or metadata must be provided");
        }

        const payload: any = {
            ...name && {name: name},
            ...metadata && {metadata: metadata},
        };

        return this.put<ConversationAttributesChangeOutput>(this.formatUrl(chatId), agentId, payload, userId);
    }
}
