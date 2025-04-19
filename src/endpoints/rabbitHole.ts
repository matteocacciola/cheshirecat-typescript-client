/**
 * @file RabbitHoleEndpoint.ts
 *
 * Isomorphic implementation of the RabbitHoleEndpoint that works in both
 * Node.js (server) and browser (client) environments. This class handles
 * file uploads to the RabbitHole API with environment-specific file handling.
 */
import {AbstractEndpoint} from "./abstract";
import FormData from "form-data";
import {isNodeEnvironment} from "../utils/environment";
import {FileSource, readFile, getFileName, getFileMimeType} from "../utils/file-reader";
import {createFormData, getFormDataHeaders} from "../utils/form-data";
import {AllowedMimeTypesOutput} from "../models/api/rabbitholes";

export class RabbitHoleEndpoint extends AbstractEndpoint {
    protected prefix = "/rabbithole";

    private throwError(fileSource: FileSource, error: any)  {
        // Provide more helpful error messages based on environment
        if (!isNodeEnvironment() && typeof fileSource === "string") {
            throw new Error("In browser environments, fileSource must be a File object, not a file path string.");
        } else if (isNodeEnvironment() && typeof fileSource !== 'string') {
            throw new Error("In Node.js environments, fileSource must be a file path string.");
        }

        // Re-throw the original error
        throw error;
    }

    private async appendFileToForm(
        form: FormData | globalThis.FormData,
        fileSource: FileSource,
        formKey: string,
        fileName?: string | null
    ) {
        // Read file content in an environment-appropriate way
        const fileBuffer = await readFile(fileSource);

        // Get appropriate filename
        const finalFileName = fileName || await getFileName(fileSource);
        const fileMimeType = await getFileMimeType(fileSource, finalFileName);

        if (isNodeEnvironment()) {
            (form as FormData).append(formKey, fileBuffer, {
                filename: finalFileName,
                contentType: fileMimeType
            });

            return;
        }

        const blob = new Blob([fileBuffer], { type: fileMimeType });
        (form as globalThis.FormData).append(formKey, blob, finalFileName);
    }

    private appendQueryDataToForm(
        form: FormData | globalThis.FormData,
        chunkSize?: number | null,
        chunkOverlap?: number | null,
        metadata?: Record<string, any> | null
    ) {
        if (chunkSize) {
            form.append("chunk_size", chunkSize.toString());
        }
        if (chunkOverlap) {
            form.append("chunk_overlap", chunkOverlap.toString());
        }
        if (metadata) {
            form.append("metadata", JSON.stringify(metadata));
        }
    }

    private async submitForm(form: FormData | globalThis.FormData, url: string, agentId?: string | null) {
        const headers = isNodeEnvironment()
            ? { ...(form as FormData).getHeaders() }
            : {};

        const response = await this.getHttpClient(agentId).post(url, form, {
            headers
        });

        return response.data;
    }

    /**
     * Posts a file to the RabbitHole API for ingestion into the RAG system.
     *
     * This method works in both Node.js and browser environments:
     * - In Node.js: Pass a file path string as `fileSource`
     * - In browser: Pass a File object as `fileSource`
     *
     * The file is uploaded to the RabbitHole server and processed asynchronously.
     * The CheshireCat processes the injection in background, and the client will be informed when processing completes.
     *
     * @param fileSource The source of the file to upload:
     *                  - In Node.js: A string path to the file
     *                  - In browser: A File object
     * @param fileName Optional custom name for the file. If not provided:
     *                - In Node.js: The basename of the file path is used
     *                - In browser: The name property of the File object is used
     * @param chunkSize Optional size of chunks for RAG processing
     * @param chunkOverlap Optional overlap between chunks
     * @param agentId Optional ID of the agent to associate with this upload
     * @param metadata Optional additional metadata to associate with the file
     *
     * @returns Promise resolving to the API response data
     *
     * @example Browser usage:
     * ```typescript
     * // In a Vue.js or React component
     * const fileInput = document.getElementById('fileInput');
     * const file = fileInput.files[0];
     * const response = await rabbitHoleEndpoint.postFile(file);
     * ```
     *
     * @example Node.js usage:
     * ```typescript
     * // In a Node.js application
     * const response = await rabbitHoleEndpoint.postFile('/path/to/document.pdf');
     * ```
     */
    async postFile(
        fileSource: FileSource,
        fileName?: string | null,
        chunkSize?: number | null,
        chunkOverlap?: number | null,
        agentId?: string | null,
        metadata?: Record<string, any> | null,
    ): Promise<any> {
        const form = createFormData();

        try {
            await this.appendFileToForm(form, fileSource, "file", fileName);
            this.appendQueryDataToForm(form, chunkSize, chunkOverlap, metadata);

            // Send the request
            return await this.submitForm(form, this.prefix, agentId);
        } catch (error) {
            this.throwError(fileSource, error)
        }
    }

    /**
     * This method posts a number of files to the RabbitHole API. The files are uploaded to the RabbitHole server and
     * ingested into the RAG system.
     *
     * This method works in both Node.js and browser environments:
     * - In Node.js: Pass an array of file path strings as `fileSource`
     * - In browser: Pass an array of File objects as `fileSource`
     *
     * The files are then processed by the RAG system, and the results are stored in the RAG database. The files are
     * processed in a batch. The process is asynchronous.
     * The CheshireCat processes the injection in the background, and the client will be informed at the end of the
     * process.
     *
     * @param fileSources The sources of the file to upload:
     *                  - In Node.js: An array of strings path to the file
     *                  - In browser: An array of File objects
     * @param chunkSize Optional size of chunks for RAG processing
     * @param chunkOverlap Optional overlap between chunks
     * @param agentId Optional ID of the agent to associate with this upload
     * @param metadata Optional additional metadata to associate with the file
     *
     * @returns Promise resolving to the API response data
     *
     * @example Browser usage:
     * ```typescript
     * // In a Vue.js or React component
     * const fileInputs = document.getElementById('fileInput');
     * const files = fileInputs.files;
     * const response = await rabbitHoleEndpoint.postFiles(files);
     * ```
     *
     * @example Node.js usage:
     * ```typescript
     * // In a Node.js application
     * const response = await rabbitHoleEndpoint.postFiles(['/path/to/first/document.pdf', '/path/to/second/document.pdf']);
     * ```
     */
    async postFiles(
        fileSources: FileSource[],
        chunkSize?: number | null,
        chunkOverlap?: number | null,
        agentId?: string | null,
        metadata?: Record<string, any> | null,
    ): Promise<any> {
        const form = new FormData();

        try {
            await Promise.all(fileSources.map(async (fileSource) => {
                await this.appendFileToForm(form, fileSource, "files");
            }));

            // Append additional query parameters
            this.appendQueryDataToForm(form, chunkSize, chunkOverlap, metadata);

            return await this.submitForm(form, this.formatUrl("/batch"), agentId);
        } catch (error) {
            this.throwError(fileSources[0], error)
        }
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
     * The CheshireCat processes the injection in the background, and the client will be informed at the end of the
     * process.
     *
     * @param fileSource The source of the file to upload:
     *                  - In Node.js: A string path to the file
     *                  - In browser: A File object
     * @param fileName The name of the file to be uploaded. If not provided, the name of the file will be used.
     * @param agentId The ID of the agent to be used for the upload. If not provided, the default agent will be used.
     *
     * @returns The response from the RabbitHole API.
     *
     * @example Browser usage:
     * ```typescript
     * // In a Vue.js or React component
     * const fileInput = document.getElementById('fileInput');
     * const file = fileInput.files[0];
     * const response = await rabbitHoleEndpoint.postMemory(file);
     * ```
     *
     * @example Node.js usage:
     * ```typescript
     * // In a Node.js application
     * const response = await rabbitHoleEndpoint.postMemory('/path/to/document.json');
     * ```
     */
    async postMemory(
        fileSource: FileSource,
        fileName?: string | null,
        agentId?: string | null,
    ): Promise<any> {
        const form = new FormData();

        try {
            await this.appendFileToForm(form, fileSource, "file", fileName);

            return this.submitForm(form, this.formatUrl("/memory"), agentId);
        } catch (error) {
            this.throwError(fileSource, error)
        }
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