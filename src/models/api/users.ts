export interface UserOutput {
    id: string;
    username: string;
    permissions: Record<string, string[]>;
    metadata?: Record<string, any> | null;
    created_at: number | null;
    updated_at: number | null;
}