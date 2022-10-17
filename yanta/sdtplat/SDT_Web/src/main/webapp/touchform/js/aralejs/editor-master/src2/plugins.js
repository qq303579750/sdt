define(function (require, exports, module) {
    var $ = require('$')
    var Blod = require('./plugins/blod.js')

    var Plugins = {}

    Plugins.blod = Blod;

    module.exports = Plugins;
});