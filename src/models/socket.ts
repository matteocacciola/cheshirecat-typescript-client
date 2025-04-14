export interface SocketRequest {
    text?: string;
    image?: string;
    [key: string]: any;
}

export interface SocketResponse extends SocketRequest {
    type: "notification" | "chat" | "chat_token";
    who: string;
    when: number;
    content?: Record<string, any>;
}

export interface SocketError {
    name: "SocketError" | "FailedRetry" | "SocketClosed";
    description: string;
}