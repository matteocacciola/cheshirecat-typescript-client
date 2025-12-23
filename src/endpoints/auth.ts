import {AbstractEndpoint} from "./abstract";
import {TokenOutput} from "../models/api/tokens";
import {Permission} from "../models/dtos";

export class AuthEndpoint extends AbstractEndpoint {
    protected prefix = "/auth";

    /**
     * This endpoint is used to get a token for the user. The token is used to authenticate the user in the system. When
     * the token expires, the user must request a new token.
     *
     * @param username The username of the user.
     * @param password The password of the user.
     * @param agentId The ID of the agent.
     *
     * @returns The token for the user.
     */
    async token(username: string, password: string, agentId?: string | null): Promise<TokenOutput> {
        const headers = agentId ? { "X-Agent-ID": agentId } : undefined;

        const response = await this.client.getHttpClient().createHttpClient().post(
            this.formatUrl("/token"),
            {
                json: {
                    username,
                    password,
                },
            },
            { headers }
        );

        const result = this.deserialize<TokenOutput>(response.data);

        this.client.addToken(result.accessToken);

        return result;
    }

    /**
     * This endpoint is used to get a list of available permissions in the system. The permissions are used to define
     * the access rights of the users in the system. The permissions are defined by the system administrator.
     *
     * @returns The available permissions in the system.
     */
    async getAvailablePermissions(): Promise<Permission> {
        const endpoint = this.formatUrl("/available-permissions");
        const response = await this.getHttpClient().get(endpoint);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`);
        }

        return this.deserialize<Permission>(response.data);
    }
}