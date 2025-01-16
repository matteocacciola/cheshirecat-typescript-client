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

    public pluginFileManager(): FileManagerEndpoint {
        return new FileManagerEndpoint(this);
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
}