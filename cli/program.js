const defaults = require( '../dist/default' );
const { _mode } = require( './util' );
const loadStaticFiles = require( './static-loader' );
let ctx = {
    "root": defaults.rootDefault,
    "partials": defaults.partialDefault,
    "templates": defaults.templateDefault,
    "outPath": defaults.outDefault,
    "loaderFile": defaults._static_config.loaderFile,
}
module.exports = ( {...conf}, [...args] ) => {
    const mode = _mode( args );
    if( mode === 'ssg' ) {
        console.log( `Initiating ${_mode( args )} build...` );
        const _ctx = conf?._static_config ?? ctx;
        loadStaticFiles( _ctx, conf?._partialInput ?? {} );
    }
    else {
        console.log( 'No Mode Configured, exiting...' )
    }

}