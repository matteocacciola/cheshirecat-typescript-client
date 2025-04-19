/**
 * @file environment.ts
 *
 * Utility functions for detecting the current JavaScript environment.
 */

/**
 * Determines if the code is running in a Node.js environment.
 */
export function isNodeEnvironment(): boolean {
    return typeof process !== "undefined" &&
        process.versions != null &&
        process.versions.node != null;
}