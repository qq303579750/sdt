define(function (require, exports, module) {

    var $ = require('$')
    Widget = require('widget')
    String = require('string')

    var BlueBall = Widget.extend({
        attrs: {
            trigger: {
                value: null, // required
                getter: function (val) {
                    return $(val).eq(0);
                }
            },
            template: "<span></span>",
            code: 0,
            active: 0
        },

        setup: function () {
            BlueBall.superclass.setup.call(this);

            this._setupTrigger();

            // 默认当前触发器
            this.activeTrigger = this.get('trigger').eq(0);
        },
        _setupTrigger: function () {
            this.delegateEvents(this.get('trigger'), 'click', function (e) {
                //e.preventDefault();
                // 标识当前点击的元素
                //this.activeTrigger = $(e.currentTarget);
                //this.show();
                this.changeActive();
            });
        },

        changeActive: function () {
            if (this.get('active') == 0) {
                this.set('active', 1);
                this.get('trigger').addClass("active");
            } else {
                this.set('active', 0);
                this.get('trigger').removeClass("active");
            }
        }
    });

    module.exports = BlueBall;

});