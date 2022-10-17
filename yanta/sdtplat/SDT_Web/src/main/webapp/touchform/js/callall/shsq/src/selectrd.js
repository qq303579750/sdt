define(function (require, exports, module) {
    var $ = require('$')
    Dialog = require('dialog')
    String = require('string')
    RedBall = require('./redball.js')

    var RedBallCode = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33];
    var RedBallCount = 0;

    var RedBallList = new Array();
    var URL = "";

    var alertDialog = new Dialog({
        width: 300
    });

    var Selectrd = {
        initRedBall: function (url) {
            var that = this;
            URL = url;
            $(".redball").each(function () {
                var redball = new RedBall({
                    trigger: $(this),
                    code: $(this).html(),
                    active: 0
                });
                redball.before('changeActive', function () {
                    var a = this.ge
                    if (this.get('active') == 0 & RedBallCount >= 16) {
                        alertDialog.set("content", '<div style="padding:10px; font-size:16px; color:#f00;">最多可以选择16个红球!</div>')
                        alertDialog.show();
                        return false;
                    }
                })

                redball.after('changeActive', function () {
                    if (this.get('active') > 0) {
                        RedBallCount = RedBallCount + 1;
                    }
                    else {
                        RedBallCount = RedBallCount - 1;
                    }
                    $("#redballcount").html(RedBallCount);
                })
                RedBallList[parseInt($(this).html()) - 1] = redball;
            })
        },
        selectBall: function (id) {
            if (id < RedBallList.length) {
                RedBallList[id].changeActive()
            }
        },
        nextStep: function () {
            var that = this;
            if (RedBallCount >= 6 & RedBallCount <= 16) {
                var redballstr = "";
                var hidestr = "";
                for (i = 0; i < RedBallList.length; i++) {
                    var a = RedBallList[i].get('active');
                    hidestr = hidestr + "," + RedBallList[i].get('active');
                    if (RedBallList[i].get('active') > 0) {
                        redballstr = redballstr + "," + RedBallList[i].get('code');
                    }
                }
                $.post(URL.toAjax(), { redballs: redballstr.trimStart(",") }, function (result) {
                    location.href = result.RedirectUrl;
                })
            }
            else {
                if (redballcount > 16) {
                    alertDialog.set("content", '<div style="padding:10px; font-size:16px; color:#f00;">最多可以选择16个红球!</div>')
                    alertDialog.show();
                    return false;
                }
                else {
                    alertDialog.set("content", '<div style="padding:10px; font-size:16px; color:#f00;">最少选择6个红球!</div>')
                    alertDialog.show();
                    return false;
                }
            };
        }

    }
    module.exports = Selectrd;
});