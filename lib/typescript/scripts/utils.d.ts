export declare const NPM_TAGS: readonly ["dev", "latest", "integration"];
export type NpmTag = (typeof NPM_TAGS)[number];
type VersionFile = `prisma-${NpmTag}` | 'engine';
export declare function ensureNpmTag(str: string): asserts str is NpmTag;
export declare function readVersionFile(file: VersionFile): Promise<string>;
export declare function writeVersionFile(file: VersionFile, version: string): Promise<void>;
export declare function downloadEngine(): Promise<void>;
export {};
//# sourceMappingURL=utils.d.ts.map