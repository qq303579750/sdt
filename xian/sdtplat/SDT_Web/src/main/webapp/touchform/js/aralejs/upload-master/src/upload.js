define(function (require, exports, module) {
    var Base = require('base')
    Widget = require('widget');

    var setterConfig = {
        value: function () {
        },
        setter: function (val) {
            return typeof val != 'function' ? utils.helper(val) : val;
        }
    };

    var UpLoad = Widget.extend({
        attrs: {
            // 触发元素
            trigger: {
                value: null, // required
                getter: function (val) {
                    return $(val);
                }
            },
            form: {
                value: '',
                getter: function (val) {
                    return $(val);
                }
            },
            iframe: {
                value: '',
                getter: function (val) {
                    return $(val);
                }
            },
            fileName: '',
            allowedExtensions: ['jpg', 'jpge', 'png'],
            messages: {
                emptyFile: "没有找到上传文件",
                invalidExtension: "文件格式不容许上传",
                onLeave: "文件正在上传"
            },
            onComplete: setterConfig
        },
        setup: function () {
            UpLoad.superclass.setup.call(this);
            this._bindTrigger();
            this._bindIframe();
            this._bindForm();
        },
        _bindTrigger: function () {
            var that = this;
            //this.get('trigger').css("width", "320px")
            //.css("height", "320px")

            this.get('trigger').on('change', function (e) {
                this.blur();
                that.upLoad();
            });
        },

        _bindIframe: function () {
            var that = this;

            this.get('iframe').on('load', function (e) {
                var doc = this.contentDocument ? this.contentDocument : this.contentWindow.document;
                var response;
                var innerHtml = doc.body.innerHTML;

                // fix for chrome
                if (innerHtml == '') {
                    return;
                }

                var json = innerHtml.replace(/<pre.*>(.*)<\/pre>/g, '$1');

                if (json != "false") {
                    response = eval("(" + json + ")");
                    that.get('onComplete').call(this, response);
                }  
            })
        },

        _bindForm: function () {
            var that = this;

            this.get('form')[0].target = this.get('iframe')[0].id;

        },

        validateFile: function () {
            var name = this.getFileName(this.get('fileName'));

            if (!this.isAllowedExtension(name)) {
                this.showMessage('invalidExtension');
                return false;
            } else if (name == '') {
                this.showMessage('emptyFile');
                return false;
            }

            return true;
        },

        getFileName: function (file) {
            return file.replace(/.*(\/|\\)/, "");
        },

        isAllowedExtension: function (fileName) {
            var ext = (-1 !== fileName.indexOf('.')) ? fileName.replace(/.*[.]/, '').toLowerCase() : '';
            if (this.get('allowedExtensions').length == 0) { return true; }
            for (var i = 0; i < this.get('allowedExtensions').length; i++) {
                if (this.get('allowedExtensions')[i].toLowerCase() == ext) { return true; }
            }
            return false;
        },
        showMessage: function (type) {
            var message = this.get('messages')[type];
            alert(message);
            return false;
        },
        upLoad: function () {

            this.get('form').submit()
        }

    });

    module.exports = UpLoad;
});