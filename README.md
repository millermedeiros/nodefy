# nodefy

convert AMD modules into a node.js compatible format.

## How?

this tool uses [Esprima](http://esprima.org/) to parse the code and replace
`define()` calls, doing the less amount of changes as possible to the code.

### Input

```js
define(['foo', '../bar/baz'], function(foo, baz){

    var lorem = 'ipsum';

    return {
        log : function(){
            console.log(lorem);
        }
    };

});
```

### Output

```js
    var foo = require('foo');
    var baz = require('../bar/baz');

    var lorem = 'ipsum';

    module.exports = {
        log : function(){
            console.log(lorem);
        }
    };
```


## Inspiration / Why?

I couldn't find any tool that did what I wanted - convert AMD modules into
plain node.js - so I decided to code my own. There are alternatives but they
all add more complexity than I would like.

This project was created mainly because of the
[amd-utils](http://millermedeiros.github.com/amd-utils/) project, since many
methods are useful on both environments.

The name was inpired by
[browserify](https://github.com/substack/node-browserify).


## Alternatives

 - [amdefine](https://github.com/jrburke/amdefine)
 - [UMD](https://github.com/umdjs/umd)
 - [r.js](https://github.com/jrburke/r.js)
 - [uRequire](https://github.com/anodynos/uRequire)


