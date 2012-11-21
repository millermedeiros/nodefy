# nodefy

convert AMD modules into a node.js compatible format.



## How?

This tool uses [Esprima](http://esprima.org/) to parse the code and replace
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


## CLI

You can use it as a CLI tool:

    [sudo] npm install -g nodefy
    nodefy -o cjs "src/**.js"

This will convert all ".js" files inside the `src` folder and put the results
on the `cjs` folder.

It also works with `stdin` and `stdout`:

    cat "src/foo.js" | nodefy

For a list of available options run:

    nodefy -h


## Standalone Lib

It is also available as a regular node.js library.

```js
var nodefy = require('nodefy');

// nodefy.parse(string)
// returns node.js style module
var cjsModule = nodefy.parse(jsString);

// nodefy.convert(inputPath [, outputPath], callback)
// if outputPath is omitted it won't write the result
nodefy.convert('foo.js', function(err, result){
    console.log(result);
});

// nodefy.batchConvert(glob [, outputFolder], callback)
// if outputFolder is omitted it won't write the result
nodefy.batchConvert('src/**.js', 'cjs', function(err, results){
    // results is an array of {sourcePath, outputPath, result}
});
```


## Inspiration / Why?

I couldn't find any tool that did what I wanted - convert AMD modules into
plain node.js - so I decided to code my own. There are alternatives but they
all add more complexity than I wanted.

This project was created mainly because of
[amd-utils](http://millermedeiros.github.com/amd-utils/), since many methods
are useful on both environments.

The name was inpired by
[browserify](https://github.com/substack/node-browserify).



## Features, Goals & Limitations

The [Asynchronous Module
Definition](https://github.com/amdjs/amdjs-api/wiki/AMD) is very flexible, it
supports [plugins](https://github.com/amdjs/amdjs-api/wiki/Loader-Plugins),
many [configuration
settings](https://github.com/amdjs/amdjs-api/wiki/Common-Config) to define how
modules should be loaded and asynchronous module loading.

**This tool aims to convert basic modules**, plugins and advanced settings
probably are NOT going to be supported in the near future (I have plans to
support basic configs, see [issue 6](https://github.com/millermedeiros/nodefy/issues/6)).
Check the [uRequire](https://github.com/anodynos/uRequire) project in case you need
something more complex or create a new feature request on the [issues
tracker](https://github.com/millermedeiros/nodefy/issues).



## Alternatives

 - [amdefine](https://github.com/jrburke/amdefine)
 - [UMD](https://github.com/umdjs/umd)
 - [r.js](https://github.com/jrburke/r.js)
 - [uRequire](https://github.com/anodynos/uRequire)


## License

Released under the MIT license

