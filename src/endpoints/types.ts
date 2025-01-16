import {ReadStream} from "fs";
import {AbstractEndpoint} from "./abstract";

export interface Endpoints {
    admins: () => AbstractEndpoint;
    authHandler: () => AbstractEndpoint;
    embedder: () => AbstractEndpoint;
    largeLanguageModel: () => AbstractEndpoint;
    memory: () => AbstractEndpoint;
    message: () => AbstractEndpoint;
    plugins: () => AbstractEndpoint;
    pluginFileManager: () => AbstractEndpoint;
    rabbitHole: () => AbstractEndpoint;
    settings: () => AbstractEndpoint;
    users: () => AbstractEndpoint;
}

export type MultipartItem = {
    name: string;
    contents: string | ReadStream;
    filename?: string;
};