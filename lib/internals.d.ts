import { LoaderOptions } from './options';
export type LoaderContext = {
    partials: any
    templates: any
}

export type RenderTemplateArgs = {
    _toInsert: Object,
    raw: string,
    conf: LoaderOptions
}
export type Template = {
    path: string,
    args: RenderTemplateArgs,
    valueOf: string
}
export type TargetDirectoryTree = { path: string, files: string[] }
export type FileInputMeta = {
    path: string,
    name: string,
    rawFile: string
}

export type RenderMap = {
    todo_partials: string[],
    todo_keys: string[],
    todo_loops: string[]
}
export type ResolvedRender = {
    raw: string,
    renderMap: RenderMap,
    insertionMap: object,
    render: string
}