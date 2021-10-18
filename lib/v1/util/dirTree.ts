import path from 'path';
import { FileInputMeta, LoaderOptions } from '../../../';
import { mapFileData, _files } from './internal/file';
import defaults from '../default';
/**
 * 
 * @param {LoaderConfig} conf Configuration to read paths from  
 * @returns {FileInputMeta} Metadata about Partials
 */
export const resolvePartials = ( conf: LoaderOptions ): FileInputMeta[] => {
    const { partials = defaults.partials,
            pathRoot = defaults.pathRoot } = conf;
    const _path = path.join( process.cwd(), pathRoot, partials );
    if( _path ) {
        try {
            const __files = _files( _path );
            const files = __files.map( mapFileData );
            return files;
        }
        catch( e ) {
            throw e;
        }
    }
    else {
        throw new Error( 'Partial Directory Resolution Failed' );
    } 
}
/**
 * 
 * @param {LoaderConfig} conf Configuration to read paths from  
 * @returns {FileInputMeta} Metadata about Templates
 */
export const resolveTemplates = ( conf: LoaderOptions ): FileInputMeta[] => {
    const { templates = defaults.templates,
        pathRoot = defaults.pathRoot } = conf;
    const _path = path.join( process.cwd(), pathRoot, templates );
    if( _path ) {
        try {
            const __files = _files( _path );
            const files = __files.map( mapFileData );
            return files;
        }
        catch( e ) {
            throw e;
        } 
    }
    else {
        throw new Error( 'Template Directory Resolution Failed' );
    }
}