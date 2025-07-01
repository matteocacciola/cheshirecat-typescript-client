import {MemoryPoint} from "../../types";
import {
    CollectionsItem,
    ConversationHistoryItem,
    MemoryPointsDeleteByMetadataInfo,
    MemoryRecallQuery,
    MemoryRecallVectors,
    VectorRecord,
} from "./nested/memories";

export interface CollectionPointsDestroyOutput {
    deleted: Record<string, boolean>;
}

export interface CollectionsOutput {
    collections: CollectionsItem[];
}

export interface ConversationHistoryDeleteOutput {
    deleted: boolean;
}

export class ConversationHistoryOutput {
    history: ConversationHistoryItem[];

    public toArray(): Record<string, unknown> {
        const history = this.history.map(h => h.toArray());
        return { history };
    }
}

export interface MemoryPointDeleteOutput {
    deleted: string;
}

export interface MemoryPointOutput extends MemoryPoint {
    id: string;
    vector: number[] | number[][] | Record<string, unknown>;
}

export interface MemoryPointsDeleteByMetadataOutput {
    deleted: MemoryPointsDeleteByMetadataInfo;
}

export interface MemoryPointsOutput
{
    points: VectorRecord;
    nextOffset?: string | number | null;
}

export interface MemoryRecallOutput {
    query: MemoryRecallQuery;
    vectors: MemoryRecallVectors;
}