import {ConversationMessage} from "./nested/memories";

export interface ConversationDeleteOutput {
    deleted: boolean;
}

export class ConversationHistoryOutput {
    history: ConversationMessage[];

    public toArray(): Record<string, unknown> {
        const history = this.history.map(h => h.toArray());
        return { history };
    }
}

export class ConversationsResponse {
    chat_id: string;
    name: string;
    num_messages: number;
    metadata: Record<string, any>;
    created_at: number | null;
    updated_at: number | null;
}

export class ConversationAttributesChangeOutput {
    changed: boolean;
}