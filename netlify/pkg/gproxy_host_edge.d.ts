/* tslint:disable */
/* eslint-disable */
/**
 * The `ReadableStreamType` enum.
 *
 * *This API requires the following crate features to be activated: `ReadableStreamType`*
 */

export type ReadableStreamType = "bytes";

export class EdgeConfig {
    free(): void;
    [Symbol.dispose](): void;
    constructor(libsql_url: string, libsql_auth_token: string, secret_key: string | null | undefined, secret_key_next: string | null | undefined, secret_key_rotate: boolean, upstash_url?: string | null, upstash_token?: string | null);
}

export class EdgeHost {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    fetch(request: Request, client_source: string): Promise<EdgeReply>;
}

export class EdgeReply {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    takeResponse(): Response | undefined;
    readonly continuation: Promise<any> | undefined;
}

export class IntoUnderlyingByteSource {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cancel(): void;
    pull(controller: ReadableByteStreamController): Promise<any>;
    start(controller: ReadableByteStreamController): void;
    readonly autoAllocateChunkSize: number;
    readonly type: ReadableStreamType;
}

export class IntoUnderlyingSink {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    abort(reason: any): Promise<any>;
    close(): Promise<any>;
    write(chunk: any): Promise<any>;
}

export class IntoUnderlyingSource {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cancel(): void;
    pull(controller: ReadableStreamDefaultController): Promise<any>;
}

export function start(config: EdgeConfig): Promise<EdgeHost>;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_edgeconfig_free: (a: number, b: number) => void;
    readonly __wbg_edgehost_free: (a: number, b: number) => void;
    readonly __wbg_edgereply_free: (a: number, b: number) => void;
    readonly edgeconfig_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => number;
    readonly edgehost_fetch: (a: number, b: number, c: number, d: number) => number;
    readonly edgereply_continuation: (a: number) => number;
    readonly edgereply_takeResponse: (a: number) => number;
    readonly start: (a: number) => number;
    readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
    readonly __wbg_intounderlyingsink_free: (a: number, b: number) => void;
    readonly __wbg_intounderlyingsource_free: (a: number, b: number) => void;
    readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
    readonly intounderlyingbytesource_cancel: (a: number) => void;
    readonly intounderlyingbytesource_pull: (a: number, b: number) => number;
    readonly intounderlyingbytesource_start: (a: number, b: number) => void;
    readonly intounderlyingbytesource_type: (a: number) => number;
    readonly intounderlyingsink_abort: (a: number, b: number) => number;
    readonly intounderlyingsink_close: (a: number) => number;
    readonly intounderlyingsink_write: (a: number, b: number) => number;
    readonly intounderlyingsource_cancel: (a: number) => void;
    readonly intounderlyingsource_pull: (a: number, b: number) => number;
    readonly __wasm_bindgen_func_elem_59464: (a: number, b: number, c: number, d: number) => void;
    readonly __wasm_bindgen_func_elem_59466: (a: number, b: number, c: number, d: number) => void;
    readonly __wasm_bindgen_func_elem_1902: (a: number, b: number, c: number) => number;
    readonly __wasm_bindgen_func_elem_1902_3: (a: number, b: number, c: number) => number;
    readonly __wasm_bindgen_func_elem_8758: (a: number, b: number, c: number) => void;
    readonly __wasm_bindgen_func_elem_8499: (a: number, b: number) => void;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_export3: (a: number) => void;
    readonly __wbindgen_export4: (a: number, b: number, c: number) => void;
    readonly __wbindgen_export5: (a: number, b: number) => void;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
