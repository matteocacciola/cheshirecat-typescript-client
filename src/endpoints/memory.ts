import {AbstractEndpoint} from "./abstract";
import {
    CollectionPointsDestroyOutput,
    CollectionsOutput,
    ConversationHistoryDeleteOutput,
    ConversationHistoryOutput, MemoryPointDeleteOutput, MemoryPointOutput
} from "../models/api/memories";
import {Collection} from "../enums";
import {
    MemoryPointsDeleteByMetadataOutput,
    MemoryPointsOutput,
    MemoryRecallOutput
} from "../models/api/nested/memories";

export class MemoryEndpoint extends AbstractEndpoint {
    protected prefix = "/memory";

    // -- Memory Collections API
    async getMemoryCollections(agentId?: string): Promise<CollectionsOutput> {
        return this.get(this.formatUrl("/collections"), agentId);
    }

    async deleteAllMemoryCollectionPoints(agentId?: string): Promise<CollectionPointsDestroyOutput> {
        return this.delete<CollectionPointsDestroyOutput>(this.formatUrl("/collections"), agentId);
    }

    async deleteAllSingleMemoryCollectionPoints(collection: Collection, agentId?: string): Promise<CollectionPointsDestroyOutput> {
        return this.delete<CollectionPointsDestroyOutput>(this.formatUrl("/collections/" + collection), agentId);
    }

    // END Memory Collections API --

    // -- Memory Conversation History API
    async getConversationHistory(agentId?: string, userId?: string): Promise<ConversationHistoryOutput> {
        return this.get<ConversationHistoryOutput>(this.formatUrl("/conversation_history"), agentId, userId);
    }

    async deleteConversationHistory(agentId?: string, userId?: string): Promise<ConversationHistoryDeleteOutput> {
        return this.delete<ConversationHistoryDeleteOutput>(this.formatUrl("/conversation_history"), agentId, userId);
    }

    async postConversationHistory(who: string, text: string, images?: string[], audio?: string[], why?: any, agentId?: string, userId?: string): Promise<ConversationHistoryOutput> {
        const payload = {
            who,
            text,
        };
        if (images) {
            payload["images"] = images;
        }
        if (audio) {
            payload["audio"] = audio;
        }
        if (why) {
            payload["why"] = why;
        }

        return this.postJson<ConversationHistoryOutput>(this.formatUrl("/conversation_history"), payload, agentId, userId);
    }

    // END Memory Conversation History API --

    // -- Memory Points API
    async getMemoryRecall(text: string, k?: number, metadata?: any, agentId?: string, userId?: string): Promise<MemoryRecallOutput> {
        const query = {text};
        if (k) {
            query["k"] = k;
        }
        if (metadata) {
            query["metadata"] = JSON.stringify(metadata);
        }

        return this.get<MemoryRecallOutput>(this.formatUrl("/recall"), agentId, userId, query);
    }
    
    async postMemoryPoint(collection: Collection, memoryPoint: MemoryPointOutput, agentId?: string, userId?: string): Promise<MemoryPointOutput> {
        if (userId && !memoryPoint.metadata["source"]) {
            memoryPoint.metadata["source"] = userId;
        }

        return this.postJson<MemoryPointOutput>(this.formatUrl("/collections/" + collection + "/points"), memoryPoint, agentId);
    }

    async putMemoryPoint(collection: Collection, memoryPoint: MemoryPointOutput, pointId: string, agentId?: string, userId?: string): Promise<MemoryPointOutput> {
        if (userId && !memoryPoint.metadata["source"]) {
            memoryPoint.metadata["source"] = userId;
        }

        return this.put<MemoryPointOutput>(this.formatUrl("/collections/" + collection + "/points/" + pointId), memoryPoint, agentId);
    }

    async deleteMemoryPoint(collection: Collection, pointId: string, agentId?: string): Promise<MemoryPointDeleteOutput> {
        return this.delete<MemoryPointDeleteOutput>(this.formatUrl("/collections/" + collection + "/points/" + pointId), agentId);
    }

    async deleteMemoryPointsByMetadata(collection: Collection, metadata?: any, agentId?: string): Promise<MemoryPointsDeleteByMetadataOutput> {
        return this.delete<MemoryPointsDeleteByMetadataOutput>(this.formatUrl("/collections/" + collection + "/points"), agentId, null, metadata);
    }

    async getMemoryPoints(collection: Collection, limit?: number, offset?: number, agentId?: string): Promise<MemoryPointsOutput> {
        const query = {};
        if (limit) {
            query["limit"] = limit;
        }
        if (offset) {
            query["offset"] = offset;
        }

        return this.get<MemoryPointsOutput>(this.formatUrl("/collections/" + collection + "/points"), agentId, null, query);
    }

    // END Memory Points API --
}