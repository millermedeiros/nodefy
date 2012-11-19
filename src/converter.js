var _fs = require('fs');
var _path = require('path');

var _glob = require('glob');
var _async = require('async');

var _parser = require('./parser');



/**
 * Read file content and output into destination path.
 */
exports.convert = function(inputPath, outputPath, callback){
    _fs.readFile(inputPath, function(err, content){
        if (err) {
            callback(err);
            return;
        }
        content = _parser.parse( content.toString() );
        safeCreateDir(outputPath, function(err){
            if (err) {
                callback(err);
                return;
            }
            _fs.writeFile(outputPath, content, callback);
        });
     });
};


function safeCreateDir(filePath, callback){
    var dir = _path.dirname(filePath);
    if (! _fs.existsSync(dir) ) {
        _fs.mkdir(dir, callback);
    } else {
        callback(null);
    }
}


/**
 * Read folder content and output files into output folder
 */
exports.batchConvert = function(inputGlob, outputFolder, callback){
    _glob( inputGlob, function(err, files){
        if (err) {
            callback(err);
            return;
        }
        // convert all files in parallel
        _async.forEach(files, function(filePath, cb){
            var outputPath = _path.join(outputFolder, _path.basename(filePath));
            exports.convert(filePath, outputPath, cb);
        }, callback);
    });
};

