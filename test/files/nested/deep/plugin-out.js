// nodefy doesn't handle plugins, it will convert it into a simple require
// this test also ensures nested folders works as expected
var bar = require('foo!bar');
    module.exports = bar.baz;

