import {AbstractEndpoint} from "./abstract";

export class HealthCheckEndpoint extends AbstractEndpoint {
    /**
     * This endpoint is used to check the health of the CheshireCat server. It returns a simple message indicating that
     * the server is running.
     *
     * @returns A message indicating that the server is running.
     */
    async home(): Promise<any> {
        const response = await this.client.getHttpClient().createHttpClient().get("/");
        return response.data;
    }
}