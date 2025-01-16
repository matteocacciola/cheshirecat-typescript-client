import {MessageBase, Why} from "../dtos";

export class MessageOutput extends MessageBase {
    type?: string = "chat";
    why: Why;
    error?: boolean = false;
    readonly content: string; // deprecated

    constructor(public text: string = "", public images: string[] | null = null, public audio: string[] | null = null) {
        super();
        this.content = text;
    }

    toArray(): Record<string, any> {
        return {
            ...super.toArray(),
            type: this.type,
            why: this.why.toArray(),
            content: this.text,
            error: this.error,
        };
    }
}