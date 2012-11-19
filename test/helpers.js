
var _fs = require('fs');
var _path = require('path');

// ---


exports.readIn = function(id){
    return exports.readFile( __dirname +'/files/'+  id +'-in.js' );
};


exports.readOut = function(id){
    return exports.readFile( __dirname +'/files/'+  id +'-out.js' );
};


exports.readFile = function(path){
    return _fs.readFileSync(path).toString();
};


exports.purge = function(dir){
    _fs.readdirSync(dir).forEach(function(relPath){
        _fs.unlinkSync( _path.join(dir, relPath) );
    });
    _fs.rmdirSync( dir );
};

