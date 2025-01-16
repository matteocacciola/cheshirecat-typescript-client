import {AbstractEndpoint} from "./abstract";
import {TokenOutput} from "../models/api/tokens";
import {UserOutput} from "../models/api/users";
import {Permission} from "../models/dtos";

export class UsersEndpoint extends AbstractEndpoint {
    protected prefix = "/users";

    async token(username: string, password: string): Promise<TokenOutput> {
        const response = await this.client.getHttpClient().createHttpClient().post("/auth/token", {
            json: {
                username,
                password,
            },
        });

        const result = this.deserialize<TokenOutput>(response.data);

        this.client.addToken(result.accessToken);

        return result;
    }
    
    async getAvailablePermissions(agentId?: string): Promise<Permission> {
        const response = await this.getHttpClient(agentId).get("/auth/available-permissions");

        return this.deserialize<Permission>(response.data);
    }

    async postUser(username: string, password: string, permissions?: string[], agentId?: string): Promise<UserOutput> {
        const payload = {
            username,
            password,
            permissions: permissions
        };
        if (permissions) {
            payload.permissions = permissions;
        }

        return this.postJson<UserOutput>(this.prefix, payload, agentId);
    }

    async getUsers(agentId?: string): Promise<UserOutput[]> {
        const response = await this.getHttpClient(agentId).get(this.prefix);

        const users = response.data;
        return users.map((user: any) => this.deserialize<UserOutput>(JSON.stringify(user)));
    }

    async getUser(userId: string, agentId?: string): Promise<UserOutput> {
        return this.get<UserOutput>(this.formatUrl(userId), agentId);
    }

    async putUser(userId: string, username?: string, password?: string, permissions?: string[], agentId?: string): Promise<UserOutput> {
        const payload: any = {};
        if (username) {
            payload.username = username;
        }
        if (password) {
            payload.password = password;
        }
        if (permissions) {
            payload.permissions = permissions;
        }

        return this.put<UserOutput>(this.formatUrl(userId), payload, agentId);
    }

    async deleteUser(userId: string, agentId?: string): Promise<UserOutput> {
        return this.delete<UserOutput>(this.formatUrl(userId), agentId);
    }
}