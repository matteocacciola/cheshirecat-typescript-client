import {AdminsEndpoint} from "./admins";
import {AuthHandlerEndpoint} from "./authHandler";
import {EmbedderEndpoint} from "./embedder";
import {LargeLanguageModelEndpoint} from "./largeLanguageModel";
import {MemoryEndpoint} from "./memory";
import {MessageEndpoint} from "./message";
import {PluginsEndpoint} from "./plugins";
import {FileManagerEndpoint} from "./fileManager";
import {RabbitHoleEndpoint} from "./rabbitHole";
import {UsersEndpoint} from "./users";
import {VectorDatabaseEndpoint} from "./vectorDatabase";
import {CustomEndpoint} from "./customEndpoint";

export interface Endpoints {
    admins: () => AdminsEndpoint;
    authHandler: () => AuthHandlerEndpoint;
    embedder: () => EmbedderEndpoint;
    fileManager: () => FileManagerEndpoint;
    largeLanguageModel: () => LargeLanguageModelEndpoint;
    memory: () => MemoryEndpoint;
    message: () => MessageEndpoint;
    plugins: () => PluginsEndpoint;
    rabbitHole: () => RabbitHoleEndpoint;
    users: () => UsersEndpoint;
    vectorDatabase: () => VectorDatabaseEndpoint;
    custom: () => CustomEndpoint;
}