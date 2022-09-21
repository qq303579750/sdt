define(function (require, exports, module) {
    var $ = require('$'),
    Events = require('events'),
    Widget = require('widget'),
    Overlay = require('overlay'),
    Detector = require('detector'),
    Range = require('./range.js'),
    iframeCssUrl = require.resolve('./editor.css')
    /*
    <div class=" edui-default">
    <div style="width: 747px; z-index: 999;" id="edui1" class="edui-editor edui-default">
    <div id="edui1_toolbarbox" class="edui-editor-toolbarbox edui-default">
    <div id="edui1_toolbarmsg" class="edui-editor-toolbarmsg edui-default">
    <div id="edui1_upload_dialog" class="edui-editor-toolbarmsg-upload edui-default" onclick='$EDITORUI["edui1"].showWordImageDialog();'>点击上传</div>
    <div class="edui-editor-toolbarmsg-close edui-default" onclick='$EDITORUI["edui1"].hideToolbarMsg();'>x</div>
    <div id="edui1_toolbarmsg_label" class="edui-editor-toolbarmsg-label edui-default"></div>
    <div style="height: 0px; overflow: hidden; clear: both;" class=" edui-default"></div>
    </div></div>
    <div style="width: 747px; height: 43px; overflow: hidden; z-index: 999;" id="edui1_iframeholder" class="edui-editor-iframeholder edui-default">
    <iframe id="ueditor_0" height="100%" frameBorder="0" width="100%" scroll="no"></iframe>
    </div>
    <div id="edui1_bottombar" class="edui-editor-bottomContainer edui-default">
    <table class=" edui-default"><tbody class=" edui-default"><tr class=" edui-default"><td id="edui1_elementpath" class="edui-editor-bottombar edui-default"><div class="edui-editor-breadcrumb">元素路径:</div></td><td id="edui1_wordcount" class="edui-editor-wordcount edui-default"></td><td style="display: none;" id="edui1_scale" class="edui-editor-scale edui-default"><div class="edui-editor-icon edui-default"></div></td></tr></tbody></table></div><div id="edui1_scalelayer" class=" edui-default"></div></div></div>
    <textarea style="display: none;" id="content" cols="70" name="Content"></textarea>*/

    var isIE = Detector.browser.name == "ie" && Detector.browser.version < 9;

    var Editor = Widget.extend({
        attrs: {
            editor: {
                value: '<div class="ui-editor"></div>',
                getter: function (val) {
                    return $(val);
                }
            },
            iframe: null,
            iframeholder: null,
            toolbar: null
        },
        events: {
            "mouseover": "bindE"
        },
        setup: function () {
            this.parseEditor();
            this.parseIframe();
            this.delegateEvents()
        },
        parseEditor: function () {
            this.element.css('display', 'none');
            var container = '<div class="ui-editor">' +
                '    <div id="editor-' + this.cid + '-toolbar" class="ui-editor-toolbar"></div>' +
                '    <div id="editor-' + this.cid + '-iframeholder" class="ui-editor-iframeholder">' +
                '         <iframe id="editor-' + this.cid + '" width="100%" height="100%" scroll="no" frameborder="0"></iframe>' +
                '    </div>' +
                '</div>';
            this.set("editor", container);

            this.get("editor").insertBefore(this.element);

            this.set("iframe", $("#editor-" + this.cid));
            this.set("iframeholder", $("#editor-" + this.cid + "-iframeholder"));
            this.set("toolbar", $("#editor-" + this.cid + "-toolbar"));

            this.get("iframe").css("overflow", 'hidden');
        },

        parseIframe: function () {
            var iframe = this.get("iframe");
            var msg = $(this.get("toolbar"))
            var doc = iframe[0].contentWindow.document;
            var html = (isIE ? '' : '<!DOCTYPE html>') +
                        '<html xmlns=\'http://www.w3.org/1999/xhtml\'' + (!isIE ? ' class=\'view\'' : '') + '><head>' +
                        '<link rel=\'stylesheet\' type=\'text/css\' href=\'' + iframeCssUrl + '\'/>' +
                        '<style type=\'text/css\'>' +
                        '.view{padding:0;word-wrap:break-word;cursor:text;height:100%;}\n' +
                        'body{margin:8px;font-family:sans-serif;font-size:16px;}' +
                        'p{margin:5px 0;}' +
                        '</style></head><body' + (isIE ? ' class=\'view\'' : '') + '><p></p></body>';

            doc.open();
            doc.write(html + '</html>');
            doc.close();


            if (Detector.browser.ie) {
                doc.body.disabled = true;
                doc.body.contentEditable = true;
                doc.body.disabled = false;
            } else {
                doc.body.contentEditable = true;
                doc.body.spellcheck = true;
            }

            this._iframeEvents();
        },

        _iframeEvents: function () {
            var msg = $(this.get("toolbar"));

            var iframe = $(this.get("iframe")[0]);
            var doc1 = iframe[0].contentDocument;
            var doc2 = iframe[0].contentWindow

            var doc = null;

            if (isIE) {

                //doc = $(this.get("iframe")[0].contentWindow.document);
                doc = iframe[0].contentWindow.document;
            }
            else {
                doc = iframe[0].contentDocument;
                //doc = $(this.get("iframe")[0].contentWindow.window);
            }
            //msg.text(doc);
            //doc1.on('mouseUp');


            $(doc).on('click', function (e) {
                var range = new Range(doc.body);
                range.getRange();
                if (doc.body.createTextRange) {
                    var range = doc.body.createTextRange();
                    msg.text(range.text + "|text");
                } else {
                    msg.text("ffff" + "|control");
                    var range = doc.getSelection();
                    msg.text(range.text + "|control");
                }


                //msg.text(range.text + "|" + range2.text);
                //range.moveEnd();
                //msg.text(iframe[0].contentDocument.body.innerHTML.toString());
                /*(if (doc[0].window) {
                var range = doc[0].window.getSelection();
                if (range == "") {
                
                }
                //msg.text(range.anchorOffset + '|' + range.focusOffset + '|' + iframe[0].contentDocument.body.innerHTML.toString());
                }*/
            })
        }
    });

    module.exports = Editor;
});