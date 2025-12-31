export interface UserOutput {
    id: string;
    username: string;
    permissions: Record<string, string[]>;
    created_at: number | null;
    updated_at: number | null;
}