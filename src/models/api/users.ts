export interface UserOutput {
    username: string;
    permissions: Record<string, string[]>;
    id: string;
}