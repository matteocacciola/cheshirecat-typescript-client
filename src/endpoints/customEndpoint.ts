import {AbstractEndpoint} from "./abstract";

export class CustomEndpoint extends AbstractEndpoint {
    /**
     * This method is used to trigger a custom endpoint with a GET method
     */
    async getCustom(url: string, agentId: string, userId?: string | null): Promise<any> {
        return this.get<any>(url, agentId, userId);
    }

    /**
     * This method is used to trigger a custom endpoint with a POST method
     */
    async postCustom(url: string, agentId: string, payload?: any, userId?: string | null): Promise<any> {
        return this.post<any>(url, agentId, payload, userId);
    }

    /**
     * This method is used to trigger a custom endpoint with a PUT method
     */
    async putCustom(url: string, agentId: string, payload?: any, userId?: string | null): Promise<any> {
        return this.put<any>(url, payload, agentId, userId);
    }

    /**
     * This method is used to trigger a custom endpoint with a DELETE method
     */
    async deleteCustom(url: string, agentId: string, userId?: string | null, payload?: any): Promise<any> {
        return this.delete<any>(url, agentId, userId, payload);
    }
}