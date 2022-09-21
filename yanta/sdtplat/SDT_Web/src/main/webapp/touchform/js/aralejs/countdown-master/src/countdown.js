define(function (require, exports, module) {
    var $ = require('$')
    var Base = require('base');

    var Countdown = Base.extend({

        contentbox: "",
        endtime: "",

        initialize: function (config) {
            var that = this;
            this.contentbox = config.contentbox;
            this.endtime = config.endtime
            //"%"是取余运算，可以理解为60进一后取余数，然后只要余数。
            //this.showCountDown()
            setInterval(function () {
                var endtime = new Date(that.endtime).getTime(); //取结束日期(毫秒值)
                var nowtime = new Date().getTime();        //今天的日期(毫秒值)
                var youtime = endtime - nowtime; //还有多久(毫秒值)
                var seconds = youtime / 1000;
                var minutes = Math.floor(seconds / 60);
                var hours = Math.floor(minutes / 60);
                var days = Math.floor(hours / 24);

                var CDay = days;
                var CHour = hours % 24 > 9 ? hours % 24 : "0" + (hours % 24);
                var CMinute = minutes % 60 > 9 ? minutes % 60 : "0" + (minutes % 60);
                var CSecond = Math.floor(seconds % 60) > 9 ? Math.floor(seconds % 60) : "0" + (Math.floor(seconds % 60));

                if (endtime < nowtime) {
                    $(that.contentbox).html("<span class=\"open\">正在开奖</span>");
                } else {

                    $(that.contentbox).html("<h4>距离下次开奖还剩</h4><span class=\"day\">" + days + "天</span><span class=\"date\">" + CHour + ":" + CMinute + ":" + CSecond + "</span>");
                }
            }, 1000);
        },

        showCountDown: function () {

        }

    });

    module.exports = Countdown;

});