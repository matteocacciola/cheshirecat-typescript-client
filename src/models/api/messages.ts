import {MessageBase, Why} from "../dtos";

export class MessageOutput extends MessageBase {
    type?: string | null = "chat";
    why?: Why | null = null;
    error?: boolean = false;

    toArray(): Record<string, any> {
        return {
            ...super.toArray(),
            type: this.type,
            why: this.why?.toArray(),
            error: this.error,
        };
    }
}


export interface ChatOutput {
    agent_id: string;
    user_id: string;
    chat_id: string;
    message: MessageOutput;
}
