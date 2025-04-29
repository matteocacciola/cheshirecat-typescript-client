export interface FileResponse {
    path: string;
    name: string;
    size: number;
    last_modified: string;
}

export interface FileManagerAttributes {
    files: FileResponse[];
    size: number;
}