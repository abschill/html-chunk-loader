#!/usr/bin/env node
/**
 * @module quickstart
 */
import { DEFAULT_PATHS, FULL_DEFAULTS } from '../../../internal';
import {
	close,
	existsSync,
	mkdirSync,
	copyFileSync,
	openSync,
	writeSync,
	writeFileSync,
} from 'fs';
import {
	join,
	resolve
} from 'path';
const { log } = console;
const demoChunks = [
	{
		type: 'partial',
		filename: 'head.html',
		content: '<main><h1>My HTML Template</h1></main>'
	},
	{
		type: 'template',
		filename: 'home.html',
		content: '<head><title>Hello World</title></head>'
	}
];

function createPath( path: string ) {
	log( `Creating Directory at ${path}` );
	mkdirSync( path );
}
/**
 * @function quickstart
 * @description command line interface for quickstart template
 * @example
 * ```npx html-chunk-loader quickstart```
*/
export function quickstart() {
	const { pathRoot, partials, templates } = DEFAULT_PATHS;
	const joinedRoot = join( process.cwd(), pathRoot );
	const joinedPartials = join( joinedRoot, partials );
	const joinedTemplates = join( joinedRoot, templates );
	if( !existsSync( joinedRoot ) ) createPath( joinedRoot );
	if( !existsSync( joinedPartials ) ) createPath( joinedPartials );
	if( !existsSync( joinedTemplates ) ) createPath( joinedTemplates );

	demoChunks.forEach( chunk => {
		if( chunk.type === 'partial' ) {
			const partial = resolve( joinedPartials, chunk.filename );
			if( !existsSync( partial ) ) writeFileSync( partial, chunk.content );
		}
		else {
			const template = resolve( joinedTemplates, chunk.filename );
			if( !existsSync( template ) ) writeFileSync( template, chunk.content );
		}
	} );

	const configFile = resolve( process.cwd(), 'hcl-config.js' );

	if( !existsSync( configFile ) ) {
		const jsonString = JSON.stringify( FULL_DEFAULTS, null,  4 );
		const moduleString = `module.exports = ${jsonString}`;
		writeFileSync( configFile, moduleString );
	}

	log( 'Done.' );
}

quickstart();