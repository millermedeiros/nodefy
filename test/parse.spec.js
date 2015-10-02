
var nodefy = require('../index');
var _helpers = require('./helpers');

var readIn = _helpers.readIn;
var readOut = _helpers.readOut;


describe('parse', function () {

    it('should convert standard AMD', function () {
        var output = nodefy.parse( readIn('basic') );
        expect( output ).toMatch( /require\(['"]\w/ );
        expect( output ).toEqual( readOut('basic') );
    });

    it('should work properly with magic AMD dependencies', function () {
        var output = nodefy.parse( readIn('magic') );
        expect( output ).toMatch( /require\(['"]\w/ );
        expect( output ).toEqual( readOut('magic') );
    });

    it('should convert simplified CJS modules', function () {
        var output = nodefy.parse( readIn('simplified_cjs') );
        expect( output ).toMatch( /require\(['"]\w/ );
        expect( output ).toEqual( readOut('simplified_cjs') );
    });

    it('should convert namedmodule and ignore magical dependencies', function () {
        var output = nodefy.parse( readIn('named_mixed') );
        expect( output ).toMatch( /require\(['"]\w/ );
        expect( output ).toEqual( readOut('named_mixed') );
    });

    it('should skip conversion if file doesn\'t call `define()`', function () {
        var output = nodefy.parse( readIn('no_define') );
        expect( output ).not.toMatch( /require\(['"]\w/ );
        expect( output ).not.toMatch( /define\(['"]\w/ );
        expect( output ).toEqual( readOut('no_define') );
    });

    it('should work with remapped magical modules', function () {
        var output = nodefy.parse( readIn('nested/magic_remaped') );
        expect( output ).toMatch( /\= exports;/ );
        expect( output ).toMatch( /\= require;/ );
        expect( output ).toMatch( /\= module;/ );
        expect( output ).toEqual( readOut('nested/magic_remaped') );
    });

    it('should do simple conversion if dependency uses an AMD plugin', function () {
        var output = nodefy.parse( readIn('nested/deep/plugin') );
        expect( output ).toMatch( /require\(['"]\w+!\w+['"]\)/ );
        expect( output ).toEqual( readOut('nested/deep/plugin') );
    });

    it('should do map replacement of dependencies', function () {
        nodefy.config({
            map: {'*': {'foo': 'baz'}}
        })
        var output = nodefy.parse( readIn('map') );
        expect( output ).toMatch( /require\(['"]\w/ );
        expect( output ).toEqual( readOut('map') );
    });

});

