define(function (require, exports, module) {

    var $ = require('$')
    Widget = require('widget')
    String = require('string')

    var RedBall = Widget.extend({
        attrs: {
            //
            trigger: {
                value: null, // required
                getter: function (val) {
                    return $(val).eq(0);
                }
            },
            template: "<span></span>",
            code: 0,
            active: 0,
            table: new Array
        },
        setup: function () {
            RedBall.superclass.setup.call(this);

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


        parseTable: function () {
            var r = this.code;
            var table0 = [0, 0]
            var table1 = [0, 0]
            var table2 = [0, 0]
            var table3 = [r % 3 == 0 ? 3 : r % 3, Math.floor((r - 1) / 3)];
            var table4 = [r % 4 == 0 ? 4 : r % 4, Math.floor((r - 1) / 4)];
            var table5 = [r % 5 == 0 ? 5 : r % 5, Math.floor((r - 1) / 5)];
            var table6 = [r % 6 == 0 ? 6 : r % 6, Math.floor((r - 1) / 6)];
            var table7 = [r % 7 == 0 ? 7 : r % 7, Math.floor((r - 1) / 7)];
            var table8 = [r % 8 == 0 ? 8 : r % 8, Math.floor((r - 1) / 8)];
            var table9 = [r % 9 == 0 ? 9 : r % 9, Math.floor((r - 1) / 9)];
            var table10 = [r % 10 == 0 ? 10 : r % 10, Math.floor((r - 1) / 10)];

            this.table = [table0, table1, table2, table3, table4, table5, table6, table7, table8, table9, table10];
        },

        changeActive: function () {
            if (this.get('active') == 0) {
                this.set('active', 1);
                this.get('trigger').addClass("active");
                $(".redball" + this.get('code')).addClass("active");
            } else {
                this.set('active', 0);
                this.get('trigger').removeClass("active");
                $(".redball" + this.get('code')).removeClass("active");
            }
        }
    });

    module.exports = RedBall;

});