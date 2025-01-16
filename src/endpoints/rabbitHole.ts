import * as fs from "fs";
import * as path from "path";
import FormData from "form-data";
import {AbstractEndpoint} from "./abstract";
import {AllowedMimeTypesOutput} from "../models/api/rabbitholes";

export class RabbitHoleEndpoint extends AbstractEndpoint {
    protected prefix = "/rabbithole";

    async postFile(
        filePath: string,
        fileName?: string,
        chunkSize?: number,
        chunkOverlap?: number,
        agentId?: string,
        metadata?: Record<string, any>,
    ): Promise<any> {
        const form = new FormData();
        const finalFileName = fileName || path.basename(filePath);
        form.append("file", fs.createReadStream(filePath), finalFileName);

        if (chunkSize) {
            form.append("chunk_size", chunkSize.toString());
        }
        if (chunkOverlap) {
            form.append("chunk_overlap", chunkOverlap.toString());
        }
        if (metadata) {
            form.append("metadata", JSON.stringify(metadata));
        }

        return this.getHttpClient(agentId).post(this.prefix, form);
    }

    async postFiles(
        filePaths: string[],
        chunkSize?: number,
        chunkOverlap?: number,
        agentId?: string,
        metadata?: Record<string, any>,
    ): Promise<any> {
        const form = new FormData();

        filePaths.forEach((filePath) => {
            const fileName = path.basename(filePath);
            form.append("files", fs.createReadStream(filePath), fileName);
        });

        if (chunkSize) {
            form.append("chunk_size", chunkSize.toString());
        }
        if (chunkOverlap) {
            form.append("chunk_overlap", chunkOverlap.toString());
        }
        if (metadata) {
            form.append("metadata", JSON.stringify(metadata));
        }

        return this.getHttpClient(agentId).post(this.formatUrl("/batch"), form);
    }

    async postWeb(
        webUrl: string,
        chunkSize?: number,
        chunkOverlap?: number,
        agentId?: string,
        metadata?: Record<string, any>,
    ): Promise<any> {
        const payload: Record<string, any> = { url: webUrl };

        if (chunkSize) {
            payload["chunk_size"] = chunkSize;
        }
        if (chunkOverlap) {
            payload["chunk_overlap"] = chunkOverlap;
        }
        if (metadata) {
            payload["metadata"] = metadata;
        }

        return this.getHttpClient(agentId).post(this.formatUrl("/web"), payload);
    }

    /**
     * Posts a memory file to the RabbitHole API.
     */
    async postMemory(
        filePath: string,
        fileName?: string,
        agentId?: string,
    ): Promise<any> {
        const form = new FormData();
        const finalFileName = fileName || path.basename(filePath);
        form.append("file", fs.createReadStream(filePath), finalFileName);

        return this.getHttpClient(agentId).post(this.formatUrl("/memory"), form);
    }

    /**
     * Retrieves the allowed MIME types from the RabbitHole API.
     */
    async getAllowedMimeTypes(agentId?: string): Promise<AllowedMimeTypesOutput> {
        return this.get<AllowedMimeTypesOutput>(this.formatUrl("/allowed-mimetypes"), agentId);
    }
}