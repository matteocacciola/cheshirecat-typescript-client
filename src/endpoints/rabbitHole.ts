import * as fs from "fs";
import * as path from "path";
import FormData from "form-data";
import * as mime from 'mime-types';
import {AbstractEndpoint} from "./abstract";
import {AllowedMimeTypesOutput} from "../models/api/rabbitholes";

export class RabbitHoleEndpoint extends AbstractEndpoint {
    protected prefix = "/rabbithole";

    /**
     * This method posts a file to the RabbitHole API. The file is uploaded to the RabbitHole server and ingested into
     * the RAG system. The file is then processed by the RAG system and the results are stored in the RAG database.
     * The process is asynchronous and the results are returned in a batch.
     * The CheshireCat processes the injection in background and the client will be informed at the end of the process.
     *
     * @param filePath The path to the file to be uploaded.
     * @param fileName The name of the file to be uploaded. If not provided, the name of the file will be used.
     * @param chunkSize The size of the chunks to be used for the upload. If not provided, the default chunk size will be used.
     * @param chunkOverlap The size of the overlap between chunks. If not provided, the default overlap size will be used.
     * @param agentId The ID of the agent to be used for the upload. If not provided, the default agent will be used.
     * @param metadata Additional metadata to be associated with the file.
     *
     * @returns The response from the RabbitHole API.
     */
    async postFile(
        filePath: string,
        fileName?: string | null,
        chunkSize?: number | null,
        chunkOverlap?: number | null,
        agentId?: string | null,
        metadata?: Record<string, any> | null,
    ): Promise<any> {
        const form = new FormData();
        const finalFileName = fileName || path.basename(filePath);

        const fileBuffer = fs.readFileSync(filePath);
        form.append("file", fileBuffer, {
            filename: finalFileName,
            contentType: mime.contentType(finalFileName) || "application/octet-stream"
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
        const response = await this.getHttpClient(agentId).post(this.prefix, form, {
            headers: {
                ...form.getHeaders(),
                'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
            },
        });

        return response.data;
    }

    /**
     * This method posts a number of files to the RabbitHole API. The files are uploaded to the RabbitHole server and
     * ingested into the RAG system. The files are then processed by the RAG system and the results are stored in the
     * RAG database. The files are processed in a batch. The process is asynchronous.
     * The CheshireCat processes the injection in background and the client will be informed at the end of the process.
     *
     * @param filePaths The paths to the files to be uploaded.
     * @param chunkSize The size of the chunks to be used for the upload. If not provided, the default chunk size will be used.
     * @param chunkOverlap The size of the overlap between chunks. If not provided, the default overlap size will be used.
     * @param agentId The ID of the agent to be used for the upload. If not provided, the default agent will be used.
     * @param metadata Additional metadata to be associated with the files.
     *
     * @returns The response from the RabbitHole API.
     */
    async postFiles(
        filePaths: string[],
        chunkSize?: number | null,
        chunkOverlap?: number | null,
        agentId?: string | null,
        metadata?: Record<string, any> | null,
    ): Promise<any> {
        const form = new FormData();

        filePaths.forEach((filePath) => {
            const fileName = path.basename(filePath);
            const fileBuffer = fs.readFileSync(filePath);
            form.append("files", fileBuffer, {
                filename: fileName,
                contentType: mime.contentType(fileName) || "application/octet-stream"
            });
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
        const response = await this.getHttpClient(agentId).post(this.formatUrl("/batch"), form);

        return response.data;
    }

    /**
     * This method posts a web URL to the RabbitHole API. The web URL is ingested into the RAG system. The web URL is
     * processed by the RAG system by Web scraping and the results are stored in the RAG database. The process is
     * asynchronous.
     * The CheshireCat processes the injection in background and the client will be informed at the end of the process.
     *
     * @param webUrl The URL of the web page to be ingested.
     * @param chunkSize The size of the chunks to be used for the upload. If not provided, the default chunk size will be used.
     * @param chunkOverlap The size of the overlap between chunks. If not provided, the default overlap size will be used.
     * @param agentId The ID of the agent to be used for the upload. If not provided, the default agent will be used.
     * @param metadata Additional metadata to be associated with the web URL.
     *
     * @returns The response from the RabbitHole API.
     */
    async postWeb(
        webUrl: string,
        chunkSize?: number | null,
        chunkOverlap?: number | null,
        agentId?: string | null,
        metadata?: Record<string, any> | null,
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

        const response = await this.getHttpClient(agentId).post(this.formatUrl("/web"), payload);
        return response.data;
    }

    /**
     * This method posts a memory point, either for the agent identified by the agentId parameter (for multi-agent
     * installations) or for the default agent (for single-agent installations). The memory point is ingested into the
     * RAG system. The process is asynchronous. The provided file must be in JSON format.
     * The CheshireCat processes the injection in background and the client will be informed at the end of the process.
     *
     * @param filePath The path to the file to be uploaded.
     * @param fileName The name of the file to be uploaded. If not provided, the name of the file will be used.
     * @param agentId The ID of the agent to be used for the upload. If not provided, the default agent will be used.
     *
     * @returns The response from the RabbitHole API.
     */
    async postMemory(
        filePath: string,
        fileName?: string | null,
        agentId?: string | null,
    ): Promise<any> {
        const form = new FormData();
        const finalFileName = fileName || path.basename(filePath);

        const fileBuffer = fs.readFileSync(filePath);
        form.append("file", fileBuffer, {
            filename: finalFileName,
            contentType: mime.contentType(finalFileName) || "application/octet-stream"
        });

        const response = await this.getHttpClient(agentId).post(this.formatUrl("/memory"), form, {
            headers: {
                ...form.getHeaders(),
                'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
            },
        });

        return response.data;
    }

    /**
     * This method retrieves the allowed MIME types for the RabbitHole API. The allowed MIME types are the MIME types
     * that are allowed to be uploaded to the RabbitHole API. The allowed MIME types are returned in a list.
     * If the agentId parameter is provided, the allowed MIME types are retrieved for the agent identified by the
     * agentId parameter (for multi-agent installations). If the agentId parameter is not provided, the allowed MIME
     * types are retrieved for the default agent (for single-agent installations).
     *
     * @param agentId The ID of the agent to be used for the upload. If not provided, the default agent will be used.
     *
     * @returns The allowed MIME types for the RabbitHole API.
     */
    async getAllowedMimeTypes(agentId?: string | null): Promise<AllowedMimeTypesOutput> {
        return this.get<AllowedMimeTypesOutput>(this.formatUrl("/allowed-mimetypes"), agentId);
    }
}