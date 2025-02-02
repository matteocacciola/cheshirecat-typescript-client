import {AbstractEndpoint} from "./abstract";
import {
    CollectionPointsDestroyOutput,
    CollectionsOutput,
    ConversationHistoryDeleteOutput,
    ConversationHistoryOutput, MemoryPointDeleteOutput, MemoryPointOutput
} from "../models/api/memories";
import {Collection, Role} from "../enums";
import {
    MemoryPointsDeleteByMetadataOutput,
    MemoryPointsOutput,
    MemoryRecallOutput
} from "../models/api/nested/memories";
import {Why} from "../models/dtos";

export class MemoryEndpoint extends AbstractEndpoint {
    protected prefix = "/memory";

    // -- Memory Collections API

    /**
     * This endpoint returns the collections of memory points, either for the agent identified by the agentId parameter
     * (for multi-agent installations) or for the default agent (for single-agent installations).
     *
     * @param agentId The agent ID for multi-agent installations.
     *
     * @returns The collections of memory points.
     */
    async getMemoryCollections(agentId?: string): Promise<CollectionsOutput> {
        return this.get(this.formatUrl("/collections"), agentId);
    }

    /**
     * This endpoint deletes the all the points in all the collections of memory, either for the agent identified by
     * the agentId parameter (for multi-agent installations) or for the default agent (for single-agent installations).
     *
     * @param agentId The agent ID for multi-agent installations.
     *
     * @returns The output of the deletion operation.
     */
    async deleteAllMemoryCollectionPoints(agentId?: string): Promise<CollectionPointsDestroyOutput> {
        return this.delete<CollectionPointsDestroyOutput>(this.formatUrl("/collections"), agentId);
    }

    /**
     * This method deletes all the points in a single collection of memory, either for the agent identified by the
     * agentId parameter (for multi-agent installations) or for the default agent (for single-agent installations).
     *
     * @param collection The collection to delete the points from.
     * @param agentId The agent ID for multi-agent installations.
     *
     * @returns The output of the deletion operation.
     */
    async deleteAllSingleMemoryCollectionPoints(collection: Collection, agentId?: string): Promise<CollectionPointsDestroyOutput> {
        return this.delete<CollectionPointsDestroyOutput>(this.formatUrl("/collections/" + collection.toString()), agentId);
    }

    // END Memory Collections API --

    // -- Memory Conversation History API

    /**
     * This endpoint returns the conversation history, either for the agent identified by the agentId parameter
     * (for multi-agent installations) or for the default agent (for single-agent installations). If the userId
     * parameter is provided, the conversation history is filtered by the user ID.
     *
     * @param agentId The agent ID for multi-agent installations.
     * @param userId The user ID to filter the conversation history by.
     *
     * @returns The conversation history.
     */
    async getConversationHistory(agentId?: string, userId?: string): Promise<ConversationHistoryOutput> {
        return this.get<ConversationHistoryOutput>(this.formatUrl("/conversation_history"), agentId, userId);
    }

    /**
     * This endpoint deletes the conversation history, either for the agent identified by the agentId parameter
     * (for multi-agent installations) or for the default agent (for single-agent installations). If the userId
     * parameter is provided, the conversation history is filtered by the user ID.
     *
     * @param agentId The agent ID for multi-agent installations.
     * @param userId The user ID to filter the conversation history by.
     *
     * @returns The output of the deletion operation.
     */
    async deleteConversationHistory(agentId?: string, userId?: string): Promise<ConversationHistoryDeleteOutput> {
        return this.delete<ConversationHistoryDeleteOutput>(this.formatUrl("/conversation_history"), agentId, userId);
    }

    /**
     * This endpoint creates a new element in the conversation history, either for the agent identified by the agentId
     * parameter (for multi-agent installations) or for the default agent (for single-agent installations). If the
     * userId parameter is provided, the conversation history is added to the user ID.
     *
     * @param who The speaker of the conversation history.
     * @param text The text of the conversation history.
     * @param images The images of the conversation history.
     * @param audio The audio of the conversation history.
     * @param why The reason for the conversation history.
     * @param agentId The agent ID for multi-agent installations.
     * @param userId The user ID to add the conversation history to.
     *
     * @returns The conversation history.
     */
    async postConversationHistory(
        who: Role,
        text: string,
        images?: string[] | null,
        audio?: string[] | null,
        why?: Why,
        agentId?: string,
        userId?: string
    ): Promise<ConversationHistoryOutput> {
        const payload = {
            who: who.toString(),
            text,
            ...(images && {images}),
            ...(audio && {audio}),
            ...(why && {why: why.toArray()}),
        };

        return this.postJson<ConversationHistoryOutput>(this.formatUrl("/conversation_history"), payload, agentId, userId);
    }

    // END Memory Conversation History API --

    // -- Memory Points API

    /**
     * This endpoint retrieves memory points based on the input text, either for the agent identified by the agentId
     * parameter (for multi-agent installations) or for the default agent (for single-agent installations). The text
     * parameter is the input text for which the memory points are retrieved. The k parameter is the number of memory
     * points to retrieve.
     * If the userId parameter is provided, the memory points are filtered by the user ID.
     *
     * @param text The input text for which the memory points are retrieved.
     * @param k The number of memory points to retrieve.
     * @param metadata The metadata to filter the memory points by.
     * @param agentId The agent ID for multi-agent installations.
     * @param userId The user ID to filter the memory points by.
     *
     * @returns The memory recall output.
     */
    async getMemoryRecall(
        text: string,
        k?: number,
        metadata?: any,
        agentId?: string,
        userId?: string
    ): Promise<MemoryRecallOutput> {
        const query = {
            text,
            ...(k && {k}),
            ...(metadata && {metadata: JSON.stringify(metadata)}),
        };

        return this.get<MemoryRecallOutput>(this.formatUrl("/recall"), agentId, userId, query);
    }

    /**
     * This method posts a memory point, either for the agent identified by the agentId parameter (for multi-agent
     * installations) or for the default agent (for single-agent installations).
     * If the userId parameter is provided, the memory point is associated with the user ID.
     *
     * @param collection The collection to post the memory point to.
     * @param memoryPoint The memory point to post.
     * @param agentId The agent ID for multi-agent installations.
     * @param userId The user ID to associate the memory point with.
     *
     * @returns The memory point output.
     */
    async postMemoryPoint(
        collection: Collection,
        memoryPoint: MemoryPointOutput,
        agentId?: string,
        userId?: string
    ): Promise<MemoryPointOutput> {
        if (userId && !memoryPoint.metadata["source"]) {
            memoryPoint.metadata["source"] = userId;
        }

        return this.postJson<MemoryPointOutput>(this.formatUrl("/collections/" + collection.toString() + "/points"), memoryPoint, agentId);
    }

    /**
     * This method puts a memory point, either for the agent identified by the agentId parameter (for multi-agent
     * installations) or for the default agent (for single-agent installations).
     * If the userId parameter is provided, the memory point is associated with the user ID.
     *
     * @param collection The collection to put the memory point to.
     * @param memoryPoint The memory point to put.
     * @param pointId The ID of the memory point to put.
     * @param agentId The agent ID for multi-agent installations.
     * @param userId The user ID to associate the memory point with.
     *
     * @returns The memory point output.
     */
    async putMemoryPoint(
        collection: Collection,
        memoryPoint: MemoryPointOutput,
        pointId: string,
        agentId?: string,
        userId?: string
    ): Promise<MemoryPointOutput> {
        if (userId && !memoryPoint.metadata["source"]) {
            memoryPoint.metadata["source"] = userId;
        }

        return this.put<MemoryPointOutput>(this.formatUrl("/collections/" + collection.toString() + "/points/" + pointId), memoryPoint, agentId);
    }

    /**
     * This endpoint deletes a memory point, either for the agent identified by the agentId parameter (for multi-agent
     * installations) or for the default agent (for single-agent installations).
     *
     * @param collection The collection to retrieve the memory point from.
     * @param pointId The ID of the memory point to retrieve.
     * @param agentId The agent ID for multi-agent installations.
     *
     * @returns The memory point output.
     */
    async deleteMemoryPoint(collection: Collection, pointId: string, agentId?: string): Promise<MemoryPointDeleteOutput> {
        return this.delete<MemoryPointDeleteOutput>(this.formatUrl("/collections/" + collection.toString() + "/points/" + pointId), agentId);
    }

    /**
     * This endpoint deletes memory points based on the metadata, either for the agent identified by the agentId
     * parameter (for multi-agent installations) or for the default agent (for single-agent installations). The metadata
     * parameter is a dictionary of key-value pairs that the memory points must match.
     *
     * @param collection The collection to retrieve the memory points from.
     * @param metadata The metadata to filter the memory points by.
     * @param agentId The agent ID for multi-agent installations.
     *
     * @returns The output of the deletion operation.
     */
    async deleteMemoryPointsByMetadata(
        collection: Collection,
        metadata?: any,
        agentId?: string
    ): Promise<MemoryPointsDeleteByMetadataOutput> {
        return this.delete<MemoryPointsDeleteByMetadataOutput>(
            this.formatUrl("/collections/" + collection.toString() + "/points"),
            agentId,
            null,
            metadata
        );
    }

    /**
     * This endpoint retrieves memory points, either for the agent identified by the agentId parameter (for multi-agent
     * installations) or for the default agent (for single-agent installations). The limit parameter is the maximum
     * number of memory points to retrieve. The offset parameter is the number of memory points to skip.
     *
     * @param collection The collection to retrieve the memory points from.
     * @param limit The maximum number of memory points to retrieve.
     * @param offset The number of memory points to skip.
     * @param agentId The agent ID for multi-agent installations.
     *
     * @returns The memory points output.
     */
    async getMemoryPoints(
        collection: Collection,
        limit?: number,
        offset?: number,
        agentId?: string
    ): Promise<MemoryPointsOutput> {
        const query = {
            ...(limit && {limit}),
            ...(offset && {offset}),
        };

        return this.get<MemoryPointsOutput>(this.formatUrl("/collections/" + collection.toString() + "/points"), agentId, null, query);
    }

    // END Memory Points API --
}