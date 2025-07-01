import {MessageBase, Why} from "../../dtos";

export interface CollectionsItem {
    name: string;
    vectorsCount: number;
}

export class ConversationHistoryItemContent extends MessageBase {
    why?: Why | null = null;

    public toArray(): object {
        let data: object = {
            text: this.text,
            image: this.image,
        };

        if (this.why !== null) {
            data = {
                ...data,
                why: this.why?.toArray()
            };
        }

        return data;
    }
}

export class ConversationHistoryItem {
    who: string;
    when: number;
    content: ConversationHistoryItemContent;

    public toArray(): object {
        return {
            "who": this.who,
            "content": this.content.toArray(),
            "when": this.when,
        };
    }
}

export interface MemoryPointsDeleteByMetadataInfo {
    operationId: number;
    status: string;
}

export interface MemoryRecallQuery {
    text: string;
    vector: number[] | number[][] | Record<string, unknown>;
}

export interface MemoryRecallVectors {
    embedder: string;
    collections: Record<string, Record<string, any>[]>;
}

export interface VectorRecord {
    id: string;
    payload: Record<string, any> | null;
    vector: number[] | number[][] | Record<string, unknown> | null;
    shardKey: number | string | null;
    orderValue: number | null;
}