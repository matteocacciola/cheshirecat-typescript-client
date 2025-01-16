import {CheshireCatClient} from "../client";
import {WebSocketClient} from "../clients/wsclient";
import {AxiosInstance} from "axios";
import {MultipartItem} from "./types";

export abstract class AbstractEndpoint {
    protected client: CheshireCatClient;
    protected prefix: string;
    protected systemId: string = "system";

    constructor(client: CheshireCatClient) {
        this.client = client;
    }

    protected formatUrl(endpoint: string): string {
        return endpoint.startsWith("/") ? endpoint : `/${this.prefix}/${endpoint}`;
    }

    protected getHttpClient(agentId?: string, userId?: string): AxiosInstance {
        return this.client.getHttpClient().getClient(agentId, userId);
    }

    protected getWsClient(agentId?: string, userId?: string): WebSocketClient {
        return this.client.getWsClient().getClient(agentId, userId);
    }

    protected deserialize<T>(data: string): T {
        return this.client.getSerializer().deserialize(data);
    }

    protected async get<T>(endpoint: string, agentId?: string, userId?: string, query?: any): Promise<T> {
        const options: any = {};
        if (query) {
            options.query = query;
        }

        const response = await this.getHttpClient(agentId, userId).get(endpoint, options);
        return this.deserialize<T>(response.data);
    }

    protected async postJson<T>(endpoint: string, payload?: any, agentId?: string, userId?: string): Promise<T> {
        const options: any = {};
        if (payload) {
            options.json = payload;
        }

        const response = await this.getHttpClient(agentId, userId).post(endpoint, options);
        return this.deserialize<T>(response.data);
    }

    protected async postMultipart<T>(endpoint: string, payload?: MultipartItem[], agentId?: string, userId?: string): Promise<T> {
        const options: any = {};
        if (payload) {
            options.multipart = payload;
        }

        const response = await this.getHttpClient(agentId, userId).post(endpoint, options);
        return this.deserialize<T>(response.data);
    }

    protected async put<T>(endpoint: string, payload: any, agentId?: string, userId?: string): Promise<T> {
        const response = await this.getHttpClient(agentId, userId).put(endpoint, {json: payload});
        return this.deserialize<T>(response.data);
    }

    protected async delete<T>(endpoint: string, agentId?: string, userId?: string, payload?: any): Promise<T> {
        const options: any = {};
        if (payload) {
            options.json = payload;
        }

        const response = await this.getHttpClient(agentId, userId).delete(endpoint, options);
        return this.deserialize<T>(response.data);
    }
}