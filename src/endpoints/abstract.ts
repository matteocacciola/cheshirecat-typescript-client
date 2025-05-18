import {CheshireCatClient} from "../client";
import {WebSocketClient} from "../clients/wsclient";
import {AxiosInstance} from "axios";

export abstract class AbstractEndpoint {
    protected client: CheshireCatClient;
    protected prefix: string;
    protected systemId: string = "system";

    constructor(client: CheshireCatClient) {
        this.client = client;
    }

    protected formatUrl(endpoint: string): string {
        return `/${this.prefix}/${endpoint}`.replace(/\/+/g, "/");
    }

    protected getHttpClient(agentId?: string | null, userId?: string | null): AxiosInstance {
        return this.client.getHttpClient().getClient(agentId, userId);
    }

    protected getWsClient(agentId: string, userId: string): WebSocketClient {
        return this.client.getWsClient().getClient(agentId, userId);
    }

    protected deserialize<T>(data: string): T {
        return this.client.getSerializer().deserialize(data);
    }

    protected async get<T>(endpoint: string, agentId: string | null, userId?: string | null, query?: any): Promise<T> {
        const options: any = {};
        if (query) {
            options.query = query;
        }

        const response = await this.getHttpClient(agentId, userId).get(endpoint, options);
        return this.deserialize<T>(response.data);
    }

    protected async post<T>(
        endpoint: string,
        agentId: string,
        payload?: any,
        userId?: string | null
    ): Promise<T> {
        const options: any = {};
        if (payload) {
            options.json = payload;
        }

        const response = await this.getHttpClient(agentId, userId).post(endpoint, options);
        return this.deserialize<T>(response.data);
    }

    protected async put<T>(
        endpoint: string,
        agentId: string,
        payload?: any,
        userId?: string | null
    ): Promise<T> {
        const options: any = {};
        if (payload) {
            options.json = payload;
        }

        const response = await this.getHttpClient(agentId, userId).put(endpoint, options);
        return this.deserialize<T>(response.data);
    }

    protected async delete<T>(
        endpoint: string,
        agentId: string,
        userId?: string | null,
        payload?: any
    ): Promise<T> {
        const options: any = {};
        if (payload) {
            options.json = payload;
        }

        const response = await this.getHttpClient(agentId, userId).delete(endpoint, options);
        return this.deserialize<T>(response.data);
    }
}