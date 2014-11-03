// test comment
define(['foo', '../bar/baz'], function (foo, baz) {

    // another comment
    var ipsum = 'dolor amet';

    // an object to return
    var quux = {
        doFoo: function(){
            foo.bar( baz.dolor, ipsum );
        }
    };

    return quux;
});

