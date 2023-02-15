define(function (require, exports, module) {
    var $ = require('$')
    var Widget = require('widget')
    var Dom = require('../dom.js')

    var domUtils = Dom.utils;


    var Blod = Widget.extend({
        //propsInAttrs: ['editor'],
        //editor: null,
        editor: null,
        template: "<div>b<div>",
        attrs: {
            // 基本属性
            width: '20',
            height: '20'
        },
        events: {
            'click': 'thisclick'
        },
        setEditor: function (editor) {
            this.editor = editor;
        },
        getObj: function (editor, tagNames) {
            return domUtils.filterNodeList(editor.selection.getStartElementPath(), tagNames);
        },
        thisclick: function (e) {
            var editor = this.editor;
            var tagNames = ['strong', 'b'];
            if (editor != null) {
                var range = editor.selection.getRange(),
                    obj = this.getObj(editor, tagNames);
                if (range.collapsed) {
                    if (obj) {
                        var tmpText = editor.document.createTextNode('');
                        range.insertNode(tmpText).removeInlineStyle(tagNames);
                        range.setStartBefore(tmpText);
                        domUtils.remove(tmpText);
                    } else {
                        var tmpNode = range.document.createElement(tagNames[0]);
                        range.insertNode(tmpNode).setStart(tmpNode, 0);
                    }
                    range.collapse(true);
                } else {
                    range.applyInlineStyle(tagNames);
                }
                range.select();
            }
        }
    })


    module.exports = new Blod();
});