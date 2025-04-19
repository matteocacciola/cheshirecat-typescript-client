import { isNodeEnvironment } from "./environment";

export function createFormData(): FormData | globalThis.FormData {
    return isNodeEnvironment()
        ? new FormData()
        : new (typeof FormData !== 'undefined' ? FormData : globalThis.FormData)();
}

export function getFormDataHeaders(form: FormData): Record<string, string> | undefined {
    if (isNodeEnvironment() && typeof (form as any).getHeaders === "function") {
        return (form as any).getHeaders();
    }
    return undefined;
}
