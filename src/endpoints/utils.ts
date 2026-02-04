import {AbstractEndpoint} from "./abstract";
import {
    AgentClonedOutput,
    AgentCreatedOutput,
    AgentOutput,
    AgentUpdatedOutput,
    ResetOutput
} from "../models/api/admins";

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
     * @returns A list of elements each one having the agent ID as its metadata.
     */
    async getAgents(): Promise<AgentOutput[]> {
        const endpoint = this.formatUrl("/agents/");
        const response = await this.getHttpClient(this.systemId).get(endpoint);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`);
        }

        const agents = response.data;
        return agents.map((agent: any) => this.deserialize<AgentOutput>(JSON.stringify(agent)));
    }

    /**
     * This endpoint is used to create a new agent from scratch.
     *
     * @param agentId The ID of the agent to create.
     * @param metadata Optional metadata to associate with the agent.
     *
     * @returns The output of the create operation.
     */
    async postAgentCreate(agentId: string, metadata?: Record<string, any>): Promise<AgentCreatedOutput> {
        const endpoint = this.formatUrl("/agents/create/");
        const payload = {
            "agent_id": agentId,
            ...(metadata ? {"metadata": metadata} : {})
        };

        return this.post<AgentCreatedOutput>(endpoint, this.systemId, payload);
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
    async postAgentClone(agentId: string, newAgentId: string): Promise<AgentClonedOutput> {
        return this.post<AgentClonedOutput>(
            this.formatUrl("/agents/clone/"),
            agentId,
            {"agent_id": newAgentId},
        );
    }

    /**
     * Updates an agent by its unique identifier with the provided metadata.
     *
     * @param agentId The unique identifier of the agent to be updated.
     * @param metadata A key-value pair object containing the metadata to be updated for the agent.
     *
     * @returns The output of the update operation.
     */
    async putAgent(agentId: string, metadata: Record<string, any>): Promise<AgentUpdatedOutput> {
        return this.put<AgentUpdatedOutput>(
            this.formatUrl("/agents/"),
            agentId,
            {"metadata": metadata},
        );
    }
}