import {AbstractEndpoint} from "./abstract";
import {
    CollectionPointsDestroyOutput,
    CollectionsOutput,
    MemoryPointDeleteOutput,
    MemoryPointsDeleteByMetadataOutput,
    MemoryPointsOutput,
    MemoryPointOutput,
    MemoryRecallOutput,
} from "../models/api/memories";
import {CollectionsItem} from "../models/api/nested/memories";

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
        collection: string,
        agentId: string,
    ): Promise<CollectionPointsDestroyOutput> {
        return this.delete<CollectionPointsDestroyOutput>(
            this.formatUrl("/collections/" + collection),
            agentId,
        );
    }

    /**
     * This method create a new collection.
     *
     * @param collection The collection to create.
     * @param agentId The agent ID.
     *
     * @returns The output of the creation.
     */
    async postMemoryCollections(
        collection: string,
        agentId: string,
    ): Promise<CollectionsItem> {
        return this.post<CollectionsItem>(
            this.formatUrl("/collections/" + collection),
            agentId,
        );
    }

    // END Memory Collections API --

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
        collection: string,
        agentId: string,
        userId: string,
        memoryPoint: MemoryPointOutput,
    ): Promise<MemoryPointOutput> {
        if (userId && !memoryPoint.metadata["source"]) {
            memoryPoint.metadata["source"] = userId;
        }

        return this.post<MemoryPointOutput>(
            this.formatUrl("/collections/" + collection + "/points"),
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
        collection: string,
        agentId: string,
        userId: string,
        memoryPoint: MemoryPointOutput,
        pointId: string,
    ): Promise<MemoryPointOutput> {
        if (userId && !memoryPoint.metadata["source"]) {
            memoryPoint.metadata["source"] = userId;
        }

        return this.put<MemoryPointOutput>(
            this.formatUrl("/collections/" + collection + "/points/" + pointId),
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
        collection: string,
        pointId: string,
        agentId: string,
    ): Promise<MemoryPointDeleteOutput> {
        return this.delete<MemoryPointDeleteOutput>(
            this.formatUrl("/collections/" + collection + "/points/" + pointId),
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
        collection: string,
        agentId: string,
        metadata?: any,
    ): Promise<MemoryPointsDeleteByMetadataOutput> {
        return this.delete<MemoryPointsDeleteByMetadataOutput>(
            this.formatUrl("/collections/" + collection + "/points"),
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
        collection: string,
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
            this.formatUrl("/collections/" + collection + "/points"),
            agentId,
            null,
            query,
        );
    }

    // END Memory Points API --
}