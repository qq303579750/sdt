define(function (require, exports, module) {
    var $ = require('$')
    var Widget = require('widget')

    var domUtils = require("../dom.js"); ;


    var Blod = Widget.extend({
        editor: null,
        template: "<div class='toolbar-but'>b</div>",
        attrs: {
            width: 20,
            height: 20
        },
        execCommand: function (evt) {
            var me = evt.data;
            var tagNames = ['strong', 'b']
            var sep = me.selection.getStartElementPath();
            var range = me.selection.getRange(),
                obj = domUtils.filterNodeList(me.selection.getStartElementPath(), tagNames);

            if (range.collapsed) {
                if (obj) {
                    var tmpText = me.document.createTextNode('');
                    range.insertNode(tmpText).removeInlineStyle(tagNames);
                    range.setStartBefore(tmpText);
                    domUtils.remove(tmpText);
                } else {
                    var tmpNode = range.document.createElement(tagNames[0]);
                    range.insertNode(tmpNode).setStart(tmpNode, 0);
                }
                range.collapse(true);
            } else {
                obj ? range.removeInlineStyle(tagNames) : range.applyInlineStyle(tagNames[0]);
            }
            me.selectionChange(evt);
            range.select();
            me.textarea.text(me.document.body.innerHTML + me.selection.getText() + me.document.selection.type);

        }
    })
    module.exports = new Blod();
});