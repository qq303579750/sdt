define(function (require, exports, module) {
    var $ = require('$'),
        String = require('string')

    var HttpMethod = {

        httpSkip: function (url, interval) {
            if (interval) {
                setTimeout(function () {
                    window.location = url;
                }, interval);
            }
            else {
                window.location = url;
            }
        },

        httpLogout: function (trigger, type) {
            var box = trigger.parent();
            if (type != "account") {
                box.html("正在注销用户...");
            }
            $.getJSON(trigger.attr("href").toAjax() + "&from=" + type + "&callback=?", function (result) {
                if (result.Type) {
                    box.load(result.Url.toAjax());
                }
                else {
                    alert("sssssssss");
                    window.location.reload();
                }
            });
        },

        httpJoinClub: function (trigger) {
            var box = trigger.parent();
            box.html(trigger.attr("title"));
            $.post(trigger.attr("href").toAjax(), function (result) {
                $.post(result.LoadUrl.toAjax(), function (result) {
                    box.html(result);
                });
            });
        }
    }

    module.exports = HttpMethod;

});