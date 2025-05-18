import axios, {AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosHeaders} from "axios";
import {Uri} from "./uri";

export class HttpClient {
    protected httpClient: AxiosInstance;
    protected httpUri: Uri;
    protected apikey?: string | null;
    protected token?: string | null;
    protected userId?: string | null = null;
    protected agentId?: string | null = null;
    protected middlewares: Record<string, (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig>;

    constructor(
        host: string,
        port?: number | null,
        apikey?: string | null,
        isHTTPs: boolean = false
    ) {
        this.apikey = apikey;
        this.token = undefined;

        this.middlewares = {
            beforeSecureRequest: this.beforeSecureRequest.bind(this),
            beforeJwtRequest: this.beforeJwtRequest.bind(this),
        };

        this.httpUri = new Uri()
            .withHost(host)
            .withPort(port)
            .withScheme(isHTTPs ? "https" : "http");

        this.httpClient = this.createHttpClient();
    }

    public createHttpClient(config: AxiosRequestConfig = {}): AxiosInstance {
        const client = axios.create({
            baseURL: this.httpUri.toString(),
            ...config
        });

        // Fix per Object.values
        const middlewareEntries = Object.keys(this.middlewares).map(key => this.middlewares[key]);
        middlewareEntries.forEach(middleware => {
            client.interceptors.request.use(middleware);
        });

        return client;
    }

    public setToken(token: string): this {
        this.token = token;
        return this;
    }

    public getClient(agentId?: string | null, userId?: string | null): AxiosInstance {
        if (!this.apikey && !this.token) {
            throw new Error("You must provide an apikey or a token");
        }

        this.agentId = agentId;
        this.userId = userId;

        return this.httpClient;
    }

    public getHttpUri(): Uri {
        return this.httpUri;
    }

    protected beforeSecureRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        if (!config.headers) {
            config.headers = new AxiosHeaders();
        }

        if (this.apikey) {
            config.headers.set("Authorization", `Bearer ${this.apikey}`);
        }
        if (this.userId) {
            config.headers.set("user_id", this.userId);
        }
        if (this.agentId) {
            config.headers.set("agent_id", this.agentId);
        }

        return config;
    }

    protected beforeJwtRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        if (!config.headers) {
            config.headers = new AxiosHeaders();
        }

        if (this.token) {
            config.headers.set("Authorization", `Bearer ${this.token}`);
        }
        if (this.agentId) {
            config.headers.set("agent_id", this.agentId);
        }

        return config;
    }
}