import {AdminsEndpoint} from "./admins";
import {AuthHandlerEndpoint} from "./authHandler";
import {EmbedderEndpoint} from "./embedder";
import {LargeLanguageModelEndpoint} from "./largeLanguageModel";
import {MemoryEndpoint} from "./memory";
import {MessageEndpoint} from "./message";
import {PluginsEndpoint} from "./plugins";
import {FileManagerEndpoint} from "./fileManager";
import {RabbitHoleEndpoint} from "./rabbitHole";
import {SettingsEndpoint} from "./settings";
import {UsersEndpoint} from "./users";

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
    settings: () => SettingsEndpoint;
    users: () => UsersEndpoint;
}