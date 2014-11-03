// test comment
var foo = require('foo');
var baz = require('../bar/baz');

    // another comment
    var ipsum = 'dolor amet';

    // an object to return
    var quux = {
        doFoo: function(){
            foo.bar( baz.dolor, ipsum );
        }
    };

    module.exports = quux;


