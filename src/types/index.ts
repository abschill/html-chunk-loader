/**
 * Config Related Types
 */
export type Defaulted<T> = Readonly<Required<T>>;

export interface CompilerArgs {
    templateName: string;
    ctx: LoaderContext;
    callData ?: object;
    debugger ?: Debugger;
}
export type ConfigStringType = 'ssr' | 'ssg';
export type ConfigType = SSROptions | SSGOptions;
// cleaned ssg cli optoins
export type SSGOptions = Defaulted<USSGOptions>;
// cleaned arguments submitted to Loader constructor, defaulted if nonexistent
export type SSROptions = Defaulted<USSROptions>;

export type UGlobalOptions = {
    pathRoot ?: string; // directory to look for relative to process.cwd() default: views
    templates ?: string; // directory to resolve templates from relative to pathRoot - default: 'pages'
    partials ?: string; // directory to resolve partials from relative to pathRoot - default 'partials'
    discoverPaths ?: boolean; // whether or not the runtime will walk the configured directory tree for chunks (default: true)
    partialInput ?: object; // constructor fallback for partial variables - default {}
    templateInput ?: object; // constructor fallback for template variables - default {}
    errorSuppression ?: boolean //whether or not to throw errors when it will affect template, or if the runtime should try to decide on a solution with what it has to work with in the given situation, even if that includes removing the chunk entirely.
    intlCode ?: string;
    debug ?: UUDebugConfig;
}

export type GlobalOptions = Defaulted<UGlobalOptions>;

// optional arguments for the createLoader factory function exclusively
export interface USSROptions extends UGlobalOptions {
    watch ?: boolean; // watches files at runtime - default false
}
// ssg cli options
export interface USSGOptions extends UGlobalOptions {
    outPath ?: string; //default public
    loaderFile ?: string; //default cwd/hcl-config.js
    cleanup ?: boolean; //whether or not to clear the outPath before writing the files
}

export type AnyLoadConfig = GlobalOptions | UGlobalOptions | USSGOptions | USSROptions | SSROptions | SSGOptions; 

/**
 * Debug Types
 */
export type DebugLogArgs = [eventSignature: DebugEventSignature, data: unknown];
export type Debugger = {
    log: ( ...DebugLogArgs ) => void;
}

export type DebugConfig = Defaulted<UDebugConfig>;
// -1 = unknown/unspecified runtime state
// 0 = runtime setup
// 1 = chunk resolving
// 2 = chunk tokenizing
// 3 = chunk rendering
export type DebugEventPhase = -1 | 0 | 1 | 2 | 3;

// 0 - verbose
// 1 - default
// 2 - critical
export type DebugEventStatus = 0 | 1 | 2;
export interface UDebugConfig {
    logFile ?: string; // file to log to
    logMode ?: LogMode; // mode for logger to run in (must be verbose with logFile)
    logStrategy ?: LogStrategy; // strategy for writing logs
}
export type UUDebugConfig = boolean | UDebugConfig;

export type DebugEventSignature = 'parser:tokenize' | 'file:change' | 'watch:init' | 'loader:init' | 'compiler:resolutions' | 'partial:load' | 'template:load';
export type DebugEventType = {
	phase: DebugEventPhase;
	signature: DebugEventSignature;
	fatal: boolean;
}

export type LogMode = 'silent' | 'verbose';
// the method by which the debugger will process logging
export type LogStrategy = 'none' | 'fs' | 'stdout' | 'both';

export interface CallerDebugArgs {
    errorSuppression: boolean;
    logMode: LogMode;
    logStrategy: LogStrategy;
    debugger: Debugger;
}

/**
 * Compiler/Parser Internals
 */
export type AST_MAP = {
    partials: Token[];
    keys: Token[];
    loops: Token[];
}
export interface DEP_TAG {
    old: string;
    new: string;
    v_change: string;
}
export type Token = {
    name: string;
    raw: string;
}

/**
 * Other Runtime Internals
 */
export type HTMLPage = string;
export type HTMLChunkContent = string;
export type HTMLChunkType = 'template' | 'partial';
export type HTMLChunk = {
    type: HTMLChunkType;
    path: string;
    name: string;
    rawFile: HTMLChunkContent;
    renderedChunk ?: HTMLChunkContent;
    isCached: boolean;
    needsRehydrate: boolean;
}
export type HTMLChunkRenderArgs = [name: string, data ?: object];
export type HTMLChunkRenderFN = ( ...HTMLChunkRenderArgs ) => HTMLPage;

export interface HTMLChunkLoader {
    ctx: LoaderContext;
    template: HTMLChunkRenderFN;
}
export type LoaderContext = {
    config: SSROptions;
    chunks: HTMLChunk[];
};

export interface MapWithPartial {
    partialInput: object;
}

/**
 * Locale Enums
 */
export { Locale, toLocale } from './locale';