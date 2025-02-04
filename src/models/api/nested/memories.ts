import {MessageBase, Why} from "../../dtos";

export interface CollectionsItem {
    name: string;
    vectorsCount: number;
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

export class ConversationHistoryItemContent extends MessageBase {
    why?: Why | null = null;

    public toArray(): object {
        let data: object = {
            text: this.text,
            images: this.images,
            audio: this.audio,
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

export interface MemoryPointsDeleteByMetadataInfo {
    operationId: number;
    status: string;
}

export interface MemoryRecallQuery {
    text: string;
    vector: number[];
}

export interface MemoryRecallVectors {
    embedder: string;
    collections: Record<string, Record<string, any>[]>;
}

export interface VectorRecord {
    id: string;
    payload: Record<string, any> | null;
    vector: number[] | null;
    shardKey: string | null;
    orderValue: number | null;
}

export interface MemoryRecallOutput {
    query: MemoryRecallQuery;
    vectors: MemoryRecallVectors;
}

export interface MemoryPointsDeleteByMetadataOutput {
    deleted: MemoryPointsDeleteByMetadataInfo;
}

export interface MemoryPointsOutput
{
    points: VectorRecord;
    nextOffset?: string | number | null;
}