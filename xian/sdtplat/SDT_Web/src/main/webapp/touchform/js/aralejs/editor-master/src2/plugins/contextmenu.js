define(function (require, exports, module) {
    var $ = require('$'),
    Overlay = require("overlay");

    var Contextmenu = Overlay.extend({
        template: "<ul class=\"ui-contextmenu ui-contextmenu-show\">" +
                  "<li><a href=\"#\">下拉式菜单</a></li>"+
                  "<li><a href=\"#\">下拉式菜单</a></li>"+
                  "<li><a href=\"#\">下拉式菜单</a></li>"+
                  "</ul>",
        attrs: {
        },
        show: function () {
            this.element.css("cursor","default");
            return Contextmenu.superclass.show.call(this);
        },
        _setAlign: function (config) {
            this.set("align", config.align);
            //this.set("baseXY", "[" + config.x + "," + config.y + "]")
        }

    })

    module.exports = new Contextmenu();


});