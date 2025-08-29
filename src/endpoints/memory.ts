import {AbstractEndpoint} from "./abstract";
import {
    CollectionPointsDestroyOutput,
    CollectionsOutput,
    ConversationHistoryDeleteOutput,
    ConversationHistoryOutput,
    MemoryPointDeleteOutput,
    MemoryPointsDeleteByMetadataOutput,
    MemoryPointsOutput,
    MemoryPointOutput,
    MemoryRecallOutput,
} from "../models/api/memories";
import {Collection} from "../enums";
import {Role} from "../types";
import {Why} from "../models/dtos";

export class MemoryEndpoint extends AbstractEndpoint {
    protected prefix = "/memory";

    // -- Memory Collections API

    /**
     * This endpoint returns the collections of memory points.
     *
     * @param agentId The agent ID
     *
     * @returns The collections of memory points.
     */
    async getMemoryCollections(agentId: string): Promise<CollectionsOutput> {
        return this.get(this.formatUrl("/collections"), agentId);
    }

    /**
     * This endpoint deletes all the points in all the collections of memory.
     *
     * @param agentId The agent ID.
     *
     * @returns The output of the deletion operation.
     */
    async deleteAllMemoryCollectionPoints(agentId: string): Promise<CollectionPointsDestroyOutput> {
        return this.delete<CollectionPointsDestroyOutput>(this.formatUrl("/collections"), agentId);
    }

    /**
     * This method deletes all the points in a single collection of memory.
     *
     * @param collection The collection to delete the points from.
     * @param agentId The agent ID.
     *
     * @returns The output of the deletion operation.
     */
    async deleteAllSingleMemoryCollectionPoints(
        collection: Collection,
        agentId: string,
    ): Promise<CollectionPointsDestroyOutput> {
        return this.delete<CollectionPointsDestroyOutput>(
            this.formatUrl("/collections/" + collection.toString()),
            agentId,
        );
    }

    // END Memory Collections API --

    // -- Memory Conversation History API

    /**
     * This endpoint returns the conversation history.
     *
     * @param agentId The agent ID.
     * @param userId The user ID to filter the conversation history by.
     *
     * @returns The conversation history.
     */
    async getConversationHistory(
        agentId: string,
        userId: string,
    ): Promise<ConversationHistoryOutput> {
        return this.get<ConversationHistoryOutput>(this.formatUrl("/conversation_history"), agentId, userId);
    }

    /**
     * This endpoint deletes the conversation history.
     *
     * @param agentId The agent ID.
     * @param userId The user ID to filter the conversation history by.
     *
     * @returns The output of the deletion operation.
     */
    async deleteConversationHistory(
        agentId: string,
        userId: string,
    ): Promise<ConversationHistoryDeleteOutput> {
        return this.delete<ConversationHistoryDeleteOutput>(
            this.formatUrl("/conversation_history"),
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
        image?: string | null,
        why?: Why | null,
    ): Promise<ConversationHistoryOutput> {
        const payload = {
            who: who,
            text,
            ...(image && {image}),
            ...(why && {why: why.toArray()}),
        };

        return this.post<ConversationHistoryOutput>(this.formatUrl("/conversation_history"), agentId, payload, userId);
    }

    // END Memory Conversation History API --

    // -- Memory Points API

    /**
     * This endpoint retrieves memory points based on the input text. The text parameter is the input text for which the
     * memory points are retrieved. The k parameter is the number of memory points to retrieve.
     *
     * @param text The input text for which the memory points are retrieved.
     * @param agentId The agent ID.
     * @param userId The user ID to filter the memory points by.
     * @param k The number of memory points to retrieve.
     * @param metadata The metadata to filter the memory points by.
     *
     * @returns The memory recall output.
     */
    async getMemoryRecall(
        text: string,
        agentId: string,
        userId: string,
        k?: number | null,
        metadata?: any,
    ): Promise<MemoryRecallOutput> {
        const query = {
            text,
            ...(k && {k}),
            ...(metadata && {metadata: JSON.stringify(metadata)}),
        };

        return this.get<MemoryRecallOutput>(this.formatUrl("/recall"), agentId, userId, query);
    }

    /**
     * This method posts a memory point.
     *
     * @param collection The collection to post the memory point to.
     * @param agentId The agent ID.
     * @param userId The user ID to associate the memory point with.
     * @param memoryPoint The memory point to post.
     *
     * @returns The memory point output.
     */
    async postMemoryPoint(
        collection: Collection,
        agentId: string,
        userId: string,
        memoryPoint: MemoryPointOutput,
    ): Promise<MemoryPointOutput> {
        if (userId && !memoryPoint.metadata["source"]) {
            memoryPoint.metadata["source"] = userId;
        }

        return this.post<MemoryPointOutput>(
            this.formatUrl("/collections/" + collection.toString() + "/points"),
            agentId,
            memoryPoint,
        );
    }

    /**
     * This method puts a memory point.
     *
     * @param collection The collection to put the memory point to.
     * @param agentId The agent ID.
     * @param userId The user ID to associate the memory point with.
     * @param memoryPoint The memory point to put.
     * @param pointId The ID of the memory point to put.
     *
     * @returns The memory point output.
     */
    async putMemoryPoint(
        collection: Collection,
        agentId: string,
        userId: string,
        memoryPoint: MemoryPointOutput,
        pointId: string,
    ): Promise<MemoryPointOutput> {
        if (userId && !memoryPoint.metadata["source"]) {
            memoryPoint.metadata["source"] = userId;
        }

        return this.put<MemoryPointOutput>(
            this.formatUrl("/collections/" + collection.toString() + "/points/" + pointId),
            agentId,
            memoryPoint,
        );
    }

    /**
     * This endpoint deletes a memory point, for the agent identified by the agentId parameter.
     *
     * @param collection The collection to retrieve the memory point from.
     * @param pointId The ID of the memory point to retrieve.
     * @param agentId The agent ID.
     *
     * @returns The memory point output.
     */
    async deleteMemoryPoint(
        collection: Collection,
        pointId: string,
        agentId: string,
    ): Promise<MemoryPointDeleteOutput> {
        return this.delete<MemoryPointDeleteOutput>(
            this.formatUrl("/collections/" + collection.toString() + "/points/" + pointId),
            agentId,
        );
    }

    /**
     * This endpoint deletes memory points based on the metadata. The metadata parameter is a dictionary of key-value
     * pairs that the memory points must match.
     *
     * @param collection The collection to retrieve the memory points from.
     * @param agentId The agent ID.
     * @param metadata The metadata to filter the memory points by.
     *
     * @returns The output of the deletion operation.
     */
    async deleteMemoryPointsByMetadata(
        collection: Collection,
        agentId: string,
        metadata?: any,
    ): Promise<MemoryPointsDeleteByMetadataOutput> {
        return this.delete<MemoryPointsDeleteByMetadataOutput>(
            this.formatUrl("/collections/" + collection.toString() + "/points"),
            agentId,
            null,
            metadata
        );
    }

    /**
     * This endpoint retrieves memory points. The limit parameter is the maximum number of memory points to retrieve.
     * The offset parameter is the number of memory points to skip.
     *
     * @param collection The collection to retrieve the memory points from.
     * @param agentId The agent ID.
     * @param limit The maximum number of memory points to retrieve.
     * @param offset The number of memory points to skip.
     * @param metadata Optional metadata to filter the memory points by.
     *
     * @returns The memory points output.
     */
    async getMemoryPoints(
        collection: Collection,
        agentId: string,
        limit?: number | null,
        offset?: number | null,
        metadata?: any,
    ): Promise<MemoryPointsOutput> {
        const query = {
            ...(limit && {limit}),
            ...(offset && {offset}),
            ...(metadata && {metadata: JSON.stringify(metadata)}),
        };

        return this.get<MemoryPointsOutput>(
            this.formatUrl("/collections/" + collection.toString() + "/points"),
            agentId,
            null,
            query,
        );
    }

    // END Memory Points API --
}