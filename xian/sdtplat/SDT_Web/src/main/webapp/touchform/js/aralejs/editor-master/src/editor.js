define(function (require, exports, module) {
    var $ = require('$');
    var Base = require('base');
    var Detector = require('detector');
    var Options = require('./options.js');
    var Selection = require('./selection.js');
    var Plugins = require('./plugins2.js');

    var iframeCssUrl = require.resolve('./editor.css')

    var isIE = Detector.browser.name == "ie";
    var isOldIE = Detector.browser.name == "ie" && Detector.browser.version < 9;

    var loading = '<div>正在加载编辑器</dic>';
    var container = '<div class="ui-editor" style="display:none;">' +
                    '    <div class="ui-editor-toolbar"></div>' +
                    '    <div class="ui-editor-iframeholder">' +
                    '         <iframe width="100%" height="100%" scroll="no" frameborder="0"></iframe>' +
                    '    </div>' +
                    '</div>';
    var html = (isOldIE ? '' : '<!DOCTYPE html>') +
                        '<html xmlns=\'http://www.w3.org/1999/xhtml\'' + (!isOldIE ? ' class=\'view\'' : '') + '><head>' +
                        '<link rel=\'stylesheet\' type=\'text/css\' href=\'' + iframeCssUrl + '\'/>' +
                        '<style type=\'text/css\'>' +
                        '.view{padding:0;word-wrap:break-word;cursor:text;height:100%;}\n' +
                        'body{margin:8px;font-family:sans-serif;font-size:14px;}' +
                        'p{margin:5px 0;}' +
                        '</style></head><body' + (isOldIE ? ' class=\'view\'' : '') + '><p></p></body>';

    var plugins = ['blod'];

    var Editor = Base.extend({
        form: null, textarea: null, loading: null, container: null, iframe: null, document: null, window: null, body: null, toolbar: null, iframeholder: null,
        selection: null,
        plugins: ['blod'],
        commands: {},
        initialize: function (config) {
            this.parseTextarea(config.textarea);
            this.parseEditor();
            this.bindEvents();
            this.parsePlugins();
        },
        render: function () {
            this.loading.hide();
            this.container.show();
            return this;
        },
        parseTextarea: function (textarea) {
            this.textarea = $(textarea);
        },
        parseEditor: function () {
            var me = this;
            this.loading = $(loading);
            this.loading.insertBefore(this.textarea);
            this.container = $(container);
            this.container.insertBefore(this.textarea);
            this.toolbar = this.container.find(".ui-editor-toolbar");
            this.iframeholder = this.container.find(".ui-editor-iframeholder");
            this.iframeholder.css('width', Options.initialFrameWidth)
                             .css('height', Options.initialFrameHeight);

            this.iframe = this.container.find('iframe');
            this.document = this.iframe[0].contentWindow.document;
            this.window = this.document.defaultView || this.document.parentWindow;

            this.document.open();
            this.document.write(html + '</html>');
            this.document.close();

            this.body = this.document.body;

            if (isIE) {
                this.body.disabled = true;
                this.body.contentEditable = true;
                this.body.disabled = false;
            } else {
                this.body.contentEditable = true;
                this.body.spellcheck = true;
            }

            this.setHeight(Options.initialFrameHeight);

            this.selection = new Selection({
                document: me.document
            });

        },
        setHeight: function (height) {
            if (height !== parseInt(this.iframeholder.css('height'))) {
                this.iframeholder.css('height', height)
            }
            $(this.body).css('height', height - 20);
        },

        bindEvents: function () {
            var that = this;
            $(this.document).on("mouseup keydown", that, this['selectionChange']);

        },

        selectionChange: function (evt) {
            var me = evt.data || evt;
            var hackForMouseUp = false;
            var mouseX, mouseY;
            if (isOldIE && evt && evt.type == 'mouseup') {
                var range = this.selection.getRange();
                if (!range.collapsed) {
                    hackForMouseUp = true;
                    mouseX = evt.clientX;
                    mouseY = evt.clientY;
                }
            }
            if (!me.selection.getNative()) {
                return;
            }
            //修复一个IE下的bug: 鼠标点击一段已选择的文本中间时，可能在mouseup后的一段时间内取到的range是在selection的type为None下的错误值.
            //IE下如果用户是拖拽一段已选择文本，则不会触发mouseup事件，所以这里的特殊处理不会对其有影响
            var ieRange;
            if (hackForMouseUp && me.selection.getNative().type == 'None') {
                ieRange = me.document.body.createTextRange();
                try {
                    ieRange.moveToPoint(mouseX, mouseY);
                } catch (ex) {
                    ieRange = null;
                }
            }
            var bakGetIERange;
            if (ieRange) {
                bakGetIERange = me.selection.getIERange;
                me.selection.getIERange = function () {
                    return ieRange;
                };
            }
            me.selection.cache();
            if (bakGetIERange) {
                me.selection.getIERange = bakGetIERange;
            }

            me.textarea.text(me.document.body.innerHTML + me.selection.getText() + me.document.selection.type);
            //alert("selectionChange");
        },

        contentChange: function () {
            alert("contentChange");
        },
        parsePlugins: function (config) {
            var editor = this, plugins
            if (config != null) {
                plugins = config;
            }

            else {
                plugins = editor.plugins
            }

            var p = Plugins;

            for (var plugin in plugins) {
                var onplugin = Plugins[plugins[plugin]]
                onplugin.element.appendTo(editor.toolbar);
                editor.commands[plugins[plugin]] = onplugin.execCommand;
                onplugin.element.on("click", editor, editor.commands[plugins[plugin]])
                return false;
            }
        }

    });

    module.exports = Editor;

})