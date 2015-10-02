
var config = {};

var defaults = {
    'map': {}
};

function configure(options) {
  for (var key in options) {
    if (defaults[key] == null) {
        throw new Error('Unknown configuration option: ' + key);
    }
    if (typeof defaults[key] !== typeof options[key]) {
        throw new Error('Invalid type for option: ' + key);
    }
    if (key === 'map') {
        for (var mapKey in options[key]) {
            if (mapKey !== '*') {
                throw new Error('Only global (*) module remappings are supported');
            }
        }
    }
    config[key] = options[key];
  }
}


config.configure = configure;
config.defaults = defaults;

configure(defaults);

module.exports = config;
