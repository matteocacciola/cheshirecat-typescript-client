import * as fs from "node:fs";

export function camelToSnakeCase(str: string): string {
    if (!str || typeof str !== "string") return "";

    const withUnderscores = str.replace(/([a-z])([A-Z])/g, "$1_$2");

    const handleConsecutiveUppercase = withUnderscores.replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1_$2");

    return handleConsecutiveUppercase.toLowerCase();
}

export function snakeToCamelCase(str: string): string {
    if (!str || typeof str !== "string") return "";

    return str.toLowerCase()
        .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function camelCaseKey(str: string): string {
    return str
        .split("_")
        .map((word, index) =>
            index === 0
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");
}