// nodefy doesn't handle plugins, it will convert it into a simple require
// this test also ensures nested folders works as expected
define(['foo!bar'], function(bar){
    return bar.baz;
});
