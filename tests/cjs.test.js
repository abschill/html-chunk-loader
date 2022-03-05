// test cjs import in def
const Loader = require( '../dist' );
const partialData = require( './partialData.json' );
const templateData = require( './templateData.json' );

const myLoader = Loader( {
    pathRoot: "test-pkg/def",
    templates: "templates",
    partialInput: partialData,
    templateInput: templateData
} );
const home = myLoader.template( 'home' );

describe( 'Example Home Page Tests | CJS', () => {

    it( 'Loads page_title *', () => {
        expect( home ).toMatch( `<title>${partialData.page_title}</title>` );
    } );

    it( 'Loads Styles 1d array', () => {
        expect( home ).toMatch( '<link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">');
    } );

    it( 'Loads page_description', () => {
        expect( home ).toMatch( `<meta name="description" content="${partialData.page_description}"/>` );
    } );
} );