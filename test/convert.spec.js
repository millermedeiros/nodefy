
var nodefy = require('../index');

var _fs = require('fs');
var _path = require('path');

var _helper = require('./helpers');
var readFile = _helper.readFile;
var readOut = _helper.readOut;
var purgeFolder = _helper.purge;


// ---

var TEMP_DIR = _path.join(__dirname, '_tmp');
var BATCH_DIR = _path.join(TEMP_DIR, 'batch');

// ---


describe('convert', function () {

    beforeEach(function(){
        _fs.mkdirSync(TEMP_DIR);
    });

    afterEach(function(){
        purgeFolder(TEMP_DIR);
    });

    it('should read file from fs and output to a new file', function (done) {
        var inPath = _path.join(__dirname, 'files/basic-in.js');
        var outPath = _path.join(__dirname, '_tmp/basic-out.js');
        expect( _fs.existsSync(outPath) ).toBe( false );
        nodefy.convert(inPath, outPath, function(err){
            expect(err).toBe(null);
            expect( readFile(outPath) ).toEqual( readOut('basic') );
            done();
        });
    });


    it('should return string instead of writting to file if outputPath is missing', function (done) {
        var inPath = _path.join(__dirname, 'files/basic-in.js');
        nodefy.convert(inPath, function(err, result){
            expect(err).toBe(null);
            expect( result ).toBe( readOut('basic') );
            done();
        });
    });

    it('should return string instead of writting to file if outputPath is null', function (done) {
        var inPath = _path.join(__dirname, 'files/basic-in.js');
        nodefy.convert(inPath, null, function(err, result){
            expect(err).toBe(null);
            expect( result ).toBe( readOut('basic') );
            done();
        });
    });


    // ---


    describe('batchConvert', function () {

        beforeEach(function(){
            _fs.mkdirSync(BATCH_DIR);
        });

        afterEach(function(){
            purgeFolder(BATCH_DIR);
        });


        it('should convert all files matched by glob', function (done) {

            var glob = _path.join(__dirname, 'files/**-in.js');

            nodefy.batchConvert( glob, BATCH_DIR, function(err){
                expect( err ).toBe(null);

                expect( readFile(BATCH_DIR + '/basic-in.js') ).toEqual( readOut('basic') );
                expect( readFile(BATCH_DIR + '/simplified_cjs-in.js') ).toEqual( readOut('simplified_cjs') );
                expect( readFile(BATCH_DIR + '/named_mixed-in.js') ).toEqual( readOut('named_mixed') );

                done();
            });
        });


        it('should return aggregated string from all files if missing outputPath', function (done) {

            var glob = _path.join(__dirname, 'files/{basic,magic}-in.js');

            nodefy.batchConvert(glob, function(err, result){
                expect( err ).toBe(null);

                var expected = readOut('basic') + readOut('magic');
                expect( result ).toBe( expected );

                done();
            });
        });


    });

});



