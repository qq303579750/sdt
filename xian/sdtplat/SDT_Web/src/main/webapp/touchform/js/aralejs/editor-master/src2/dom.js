define(function (require, exports, module) {
    var $ = require('$')

    var Utils = require('./dom/utils.js')
    var Dtd = require('./dom/dtd.js')

    function Dom() { };

    Dom.dtd = Dtd;
    Dom.utils = Utils;

    module.exports = Dom;
});