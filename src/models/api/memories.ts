import {MemoryPoint} from "../../types";
import {ConversationHistoryItem} from "./nested/memories";

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

export interface CollectionsItem {
    id: string;
    name: string;
    description: string;
    created: string;
    updated: string;
}

export interface MemoryPointDeleteOutput {
    deleted: string;
}

export interface MemoryPointOutput extends MemoryPoint {
    id: string;
    vector: number[];
}