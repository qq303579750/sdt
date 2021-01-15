define(function (require, exports, module) {
    var Base = require('base')
    var $ = require('$')
    var Detector = require('detector')
    var Listener = require('./listener.js')
    var Selection = require('./selection.js')
    var Dom = require('./dom.js')
    var Plugins = require('./plugins.js')
    var Contextmenu = require('./plugins/contextmenu.js')

    var iframeCssUrl = require.resolve('./editor.css')


    var cachedInstances = {}
    var isIE = Detector.browser.name == "ie" && Detector.browser.version < 9;

    var Editor = Base.extend({
        Implements: [Listener],
        propsInAttrs: ['form', 'textarea', 'loading', 'container', 'iframe', 'window', 'document', 'body', 'events', 'selection', 'toolbar', 'plugins'],
        form: null, textarea: null, loading: null, container: null, iframe: null, window: null, document: null, body: null,
        events: {
            'document': ['click', 'contextmenu', 'aftercontextmenu', 'paste', 'keydown', 'keyup', 'keypress', 'mouseup', 'mousedown', 'mouseover', 'mouseout', 'selectstart'],
            'window': ['focus', 'blur']
        },
        selection: Selection,
        toolbar: null,
        plugins: ['blod'],
        attrs: {
            // 基本属性
            initialFrameWidth: 700,
            initialFrameHeight: 220,
            minFrameWidth: 700,
            minFrameHeight: 220,
            autoHeightEnabled: true,
            parentNode: document.body
        },

        initialize: function (config) {
            this.cid = uniqueCid();
            this.initAttrs(config);
            this.parseTextarea(config.textarea);
            this.parseEditor();
            this.setEditor();
            this.setPlugins();
            this.delegateEvents();
            this.afterReady();
        },
        render: function () {

            // 让渲染相关属性的初始值生效，并绑定到 change 事件
            this.loading.hide();
            this.container.show();

            return this
        },
        parseTextarea: function (textarea) {
            this.textarea = $(textarea);
            //this.textarea.css('display', 'none');
        },
        parseEditor: function () {
            var editor = this;
            var loading = '<div>正在加载编辑器</dic>';
            var container = '<div class="ui-editor" style="display:none;">' +
                '    <div id="editor-' + this.cid + '-toolbar" class="ui-editor-toolbar"></div>' +
                '    <div id="editor-' + this.cid + '-iframeholder" class="ui-editor-iframeholder" style="height:' + this.get("initialFrameHeight") + 'px,widht:' + this.get("initialFrameWidth") + 'px">' +
                '         <iframe id="editor-' + this.cid + '" width="100%" height="100%" scroll="no" frameborder="0"></iframe>' +
                '    </div>' +
                '</div>';
            var html = (isIE ? '' : '<!DOCTYPE html>') +
                        '<html xmlns=\'http://www.w3.org/1999/xhtml\'' + (!isIE ? ' class=\'view\'' : '') + '><head>' +
                        '<link rel=\'stylesheet\' type=\'text/css\' href=\'' + iframeCssUrl + '\'/>' +
                        '<style type=\'text/css\'>' +
                        '.view{padding:0;word-wrap:break-word;cursor:text;height:100%;}\n' +
                        'body{margin:8px;font-family:sans-serif;font-size:14px;}' +
                        'p{margin:5px 0;}' +
                        '</style></head><body' + (isIE ? ' class=\'view\'' : '') + '><p></p></body>';

            this.loading = $(loading);
            this.loading.insertBefore(this.textarea);
            this.container = $(container);
            this.container.insertBefore(this.textarea);

            this.iframe = this.container.find('iframe');
            this.document = this.iframe[0].contentWindow.document;
            this.window = this.document.defaultView || this.document.parentWindow;


            this.toolbar = this.container.find(".ui-editor-toolbar");


            this.document.open();
            this.document.write(html + '</html>');
            this.document.close();

            this.body = this.document.body;
            if (this.get("autoHeightEnabled")) {
                this.body.style.overflowY = 'hidden';
            }

            if (Detector.browser.ie) {
                this.body.disabled = true;
                this.body.contentEditable = true;
                this.body.disabled = false;
            } else {
                this.body.contentEditable = true;
                this.body.spellcheck = true;
            }

            this.selection = new Selection({
                document: editor.document
            });

        },
        setEditor: function () {
            this.setHeight(this.get("initialFrameHeight"));

            this.addListener('contentchange afterinserthtml', this.adjustHeight);

        },

        setPlugins: function (config) {
            var editor = this, plugins
            if (config != null) {
                plugins = config;
            }
            else {
                plugins = editor.plugins
            }

            var p = Plugins;

            for (var plugin in plugins) {
                var a = p[plugins[plugin]]
                a.setEditor(editor);
                editor.toolbar.append(a.element);
                return false;
            }

        },
        // 注册事件代理
        delegateEvents: function (events, handler) {
            var editor = this;
            var c = 0;
            events = this.events;
            for (var event in events) {
                var eArr = events[event];
                var o = $(this[event]);
                for (var e in eArr) {
                    o.on(eArr[e], function (evt) {
                        if (evt.type == "keyup" || evt.type == "mouseup") {
                            editor.adjustHeight();
                        }
                        if (evt.type == "click" || evt.type == "blur") {
                            Contextmenu.hide();
                        }
                        if (evt.type == "contextmenu") {
                            Contextmenu._setAlign({
                                align: {
                                    selfXY: [0, 0],
                                    baseElement: editor.container,
                                    // 基准定位元素的定位点，默认为左上角
                                    baseXY: [evt.pageX, evt.pageY]
                                }
                            });
                            Contextmenu.show();
                            //editor.textarea.text(evt.pageX)
                            return false;
                        }
                        var t = evt;
                        editor.textarea.text(editor.body.innerHTML)
                    });
                }
            }
        },
        /**
        * 设置编辑器高度
        * @name setHeight
        * @grammar editor.setHeight(number);  //纯数值，不带单位
        */
        setHeight: function (height) {
            if (height !== parseInt(this.iframe[0].parentNode.style.height)) {
                this.iframe[0].parentNode.style.height = height + 'px';
            }
            this.document.body.style.height = height - 20 + 'px';
        },
        adjustHeight: function () {
            if (this.get("autoHeightEnabled")) {
                var editor = this, span, tmpNode, lastHeight = 0, currentHeight;
                if (!span) {
                    span = editor.document.createElement('span');
                    //trace:1764
                    span.style.cssText = 'display:block;width:0;margin:0;padding:0;border:0;clear:both;';
                    span.innerHTML = '.';
                }
                tmpNode = span.cloneNode(true);
                editor.body.appendChild(tmpNode);

                currentHeight = Math.max(Dom.utils.getXY(tmpNode).y + tmpNode.offsetHeight, editor.get("initialFrameHeight"));

                if (currentHeight != lastHeight) {

                    editor.setHeight(currentHeight);

                    lastHeight = currentHeight;
                }

                Dom.utils.remove(tmpNode);
            }
        },
        showEvent: function (a) {
            this.textarea.text(a)
        },

        /**
        * 执行编辑命令cmdName，完成富文本编辑效果
        * @name execCommand
        * @grammar editor.execCommand(cmdName)   => {*}
        */
        execCommand: function (cmdName) {
            cmdName = cmdName.toLowerCase();
            var me = this,
                result,
                cmd = me.commands[cmdName] || UE.commands[cmdName];
            if (!cmd || !cmd.execCommand) {
                return null;
            }
            if (!cmd.notNeedUndo && !me.__hasEnterExecCommand) {
                me.__hasEnterExecCommand = true;
                if (me.queryCommandState.apply(me, arguments) != -1) {
                    me.fireEvent('beforeexeccommand', cmdName);
                    result = this._callCmdFn('execCommand', arguments);
                    !me._ignoreContentChange && me.fireEvent('contentchange');
                    me.fireEvent('afterexeccommand', cmdName);
                }
                me.__hasEnterExecCommand = false;
            } else {
                result = this._callCmdFn('execCommand', arguments);
                !me._ignoreContentChange && me.fireEvent('contentchange')
            }
            !me._ignoreContentChange && me._selectionChange();
            return result;
        }

    })

    module.exports = Editor

    var cidCounter = 0


    function uniqueCid() {
        return cidCounter++
    }
});