import WebSocket from "isomorphic-ws";
import {Serializer} from "./serializer";
import {WSClient} from "./clients/wsclient";
import {HttpClient} from "./clients/httpclient";
import {camelToSnakeCase} from "./helpers";
import {Endpoints} from "./endpoints/types";
import {AdminsEndpoint} from "./endpoints/admins";
import {AuthHandlerEndpoint} from "./endpoints/authHandler";
import {EmbedderEndpoint} from "./endpoints/embedder";
import {LargeLanguageModelEndpoint} from "./endpoints/largeLanguageModel";
import {MessageEndpoint} from "./endpoints/message";
import {PluginsEndpoint} from "./endpoints/plugins";
import {FileManagerEndpoint} from "./endpoints/fileManager";
import {SettingsEndpoint} from "./endpoints/settings";
import {UsersEndpoint} from "./endpoints/users";
import {RabbitHoleEndpoint} from "./endpoints/rabbitHole";
import {MemoryEndpoint} from "./endpoints/memory";
import {SocketError, SocketResponse} from "./models/socket";

export class CheshireCatClient implements Endpoints {
    private readonly wsClient: WSClient;
    private readonly httpClient: HttpClient;
    private readonly serializer: Serializer;

    constructor(wsClient: WSClient, httpClient: HttpClient, token?: string) {
        this.wsClient = wsClient;
        this.httpClient = httpClient;

        if (token) {
            this.addToken(token);
        }

        this.serializer = new Serializer({
            nameConverter: camelToSnakeCase,
            enableCircularCheck: true
        });
    }

    public addToken(token: string): this {
        this.wsClient.setToken(token);
        this.httpClient.setToken(token);
        return this;
    }

    public getHttpClient(): HttpClient {
        return this.httpClient;
    }

    public getWsClient(): WSClient {
        return this.wsClient;
    }

    public getSerializer(): Serializer {
        return this.serializer;
    }

    public admins(): AdminsEndpoint {
        return new AdminsEndpoint(this);
    }

    public authHandler(): AuthHandlerEndpoint {
        return new AuthHandlerEndpoint(this);
    }

    public embedder(): EmbedderEndpoint {
        return new EmbedderEndpoint(this);
    }

    public fileManager(): FileManagerEndpoint {
        return new FileManagerEndpoint(this);
    }

    public largeLanguageModel(): LargeLanguageModelEndpoint {
        return new LargeLanguageModelEndpoint(this);
    }

    public memory(): MemoryEndpoint {
        return new MemoryEndpoint(this);
    }

    public message(): MessageEndpoint {
        return new MessageEndpoint(this);
    }

    public plugins(): PluginsEndpoint {
        return new PluginsEndpoint(this);
    }

    public rabbitHole(): RabbitHoleEndpoint {
        return new RabbitHoleEndpoint(this);
    }

    public settings(): SettingsEndpoint {
        return new SettingsEndpoint(this);
    }

    public users(): UsersEndpoint {
        return new UsersEndpoint(this);
    }

    /**
     * Closes the WebSocket connection.
     * @returns The `CheshireCatClient` instance.
     */
    close(agentId?: string | null, userId?: string | null): CheshireCatClient {
        this.wsClient.getClient(agentId, userId).close();
        return this;
    }

    /**
     * Calls the handler when the WebSocket is connected
     * @param handler The function to call
     * @param agentId The agent ID to connect to
     * @param userId The user ID to connect to
     * @returns The current `CheshireCatClient` class instance
     */
    onConnected(handler: () => void, agentId?: string | null, userId?: string | null): CheshireCatClient {
        const wsClient = this.wsClient.getClient(agentId, userId);
        wsClient.on("open", () => {
            handler();
        });
        return this;
    }

    /**
     * Calls the handler when the WebSocket is disconnected
     * @param handler The function to call
     * @param agentId The agent ID to connect to
     * @param userId The user ID to connect to
     * @returns The current `CheshireCatClient` class instance
     */
    onDisconnected(handler: () => void, agentId?: string | null, userId?: string | null): CheshireCatClient {
        const wsClient = this.wsClient.getClient(agentId, userId);
        wsClient.on("close", () => {
            handler();
        });
        return this;
    }

    /**
     * Calls the handler when a new message arrives from the WebSocket
     * @param handler The function to call
     * @param agentId The agent ID to connect to
     * @param userId The user ID to connect to
     * @returns The current `CheshireCatClient` class instance
     */
    onMessage(handler: (data: SocketResponse) => void, agentId?: string | null, userId?: string | null): CheshireCatClient {
        const wsClient = this.wsClient.getClient(agentId, userId);
        wsClient.on("message", (data: SocketResponse) => {
            handler(data);
        });
        return this;
    }

    /**
     * Calls the handler when the WebSocket catches an exception
     * @param handler The function to call
     * @param agentId The agent ID to connect to
     * @param userId The user ID to connect to
     * @returns The current `CheshireCatClient` class instance
     */
    onError(
        handler: (error: SocketError, event?: WebSocket.ErrorEvent) => void,
        agentId?: string | null,
        userId?: string | null
    ): CheshireCatClient {
        const wsClient = this.wsClient.getClient(agentId, userId);
        wsClient.on("error", (error: SocketError, event?: WebSocket.ErrorEvent) => {
            handler(error, event);
        });
        return this;
    }
}