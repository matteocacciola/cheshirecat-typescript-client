import {MessageBase, Why} from "../dtos";

export class MessageOutput extends MessageBase {
    type?: string | null = "chat";
    why?: Why | null = null;
    error?: boolean = false;
    readonly content: string; // deprecated

    constructor(public text: string = "", public image: string | null = null) {
        super(text, image);
        this.content = text;
    }

    toArray(): Record<string, any> {
        return {
            ...super.toArray(),
            type: this.type,
            why: this.why?.toArray(),
            content: this.text,
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