import {ConversationHistoryItem} from "./nested/memories";

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