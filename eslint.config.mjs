import globals from "globals";
import pluginJs from "@eslint/js";
import * as tseslint from "typescript-eslint";

export default tseslint.config(
    {
        files: ["**/*.{ts,tsx,js,jsx,mjs}"],
        extends: [
            pluginJs.configs.recommended,
            ...tseslint.configs.recommended,
        ],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.json",
                ecmaVersion: "latest",
                sourceType: "module"
            }
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off"
        }
    }
);