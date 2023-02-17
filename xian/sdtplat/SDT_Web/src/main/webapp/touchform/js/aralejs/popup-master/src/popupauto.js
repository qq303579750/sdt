define(function (require, exports, module) {
    var $ = require('$'),
        Templatable = require('templatable'),
        Overlay = require('overlay'),
        Popup = require("./popup");

    var PopupAuto = {

        autoSetPopup: function (trigger,element) {

            var popup = new Popup({
                trigger: trigger,
                element: element,
                align: {
                    baseXY: [0, $(trigger).css("height")]
                }
            })
        }
    }

    module.exports = PopupAuto;
});