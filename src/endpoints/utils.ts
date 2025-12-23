import {AbstractEndpoint} from "./abstract";
import {ClonedOutput, CreatedOutput, ResetOutput} from "../models/api/admins";

export class UtilsEndpoint extends AbstractEndpoint {
    protected prefix = "/utils";

    /**
     * This endpoint is used to reset the system to factory settings. This will delete all data in the system.
     *
     * @returns The output of the reset operation.
     */
    async postFactoryReset(): Promise<ResetOutput> {
        return this.post<ResetOutput>(
            this.formatUrl("/factory/reset/"),
            this.systemId,
        );
    }

    /**
     * This endpoint is used to retrieve all the agents in the system.
     *
     * @returns A list of agent IDs.
     */
    async getAgents(): Promise<string[]> {
        return this.get<string[]>(
            this.formatUrl("/agents/"),
            this.systemId,
        );
    }

    /**
     * This endpoint is used to create a new agent from scratch.
     *
     * @param agentId The ID of the agent to create.
     *
     * @returns The output of the create operation.
     */
    async postAgentCreate(agentId: string): Promise<CreatedOutput> {
        const endpoint = this.formatUrl("/agents/create/");
        const payload = {
            "agent_id": agentId,
        };
        const response = await this.getHttpClient().post(endpoint, { json: payload });
        if (response.status !== 200) {
            throw new Error(`Failed to post data to ${endpoint}: ${response.statusText}`);
        }

        return this.deserialize<CreatedOutput>(response.data);
    }

    /**
     * This endpoint is used to reset the agent to factory settings. This will delete all data in the agent.
     *
     * @param agentId The ID of the agent to reset.
     *
     * @returns The output of the reset operation.
     */
    async postAgentReset(agentId: string): Promise<ResetOutput> {
        return this.post<ResetOutput>(
            this.formatUrl("/agents/reset/"),
            agentId
        );
    }

    /**
     * This endpoint is used to reset the agent to factory settings. This will delete all data in the agent.
     *
     * @param agentId The ID of the agent to reset.
     *
     * @returns The output of the reset operation.
     */
    async postAgentDestroy(agentId: string): Promise<ResetOutput> {
        return this.post<ResetOutput>(
            this.formatUrl("/agents/destroy/"),
            agentId
        );
    }

    /**
     * This endpoint is used to clone an existing agent to a new one.
     *
     * @param agentId The ID of the agent to clone.
     * @param newAgentId The ID of the new agent.
     *
     * @returns The output of the cloning operation.
     */
    async postAgentClone(agentId: string, newAgentId: string): Promise<ClonedOutput> {
        return this.post<ClonedOutput>(
            this.formatUrl("/agents/clone/"),
            agentId,
            {"agent_id": newAgentId},
        );
    }
}