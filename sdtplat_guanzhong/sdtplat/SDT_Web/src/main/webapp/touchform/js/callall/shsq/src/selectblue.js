define(function (require, exports, module) {
    var $ = require('$')
    Dialog = require('dialog')
    BlueBall = require('./blueball.js')
    String = require('string')

    //var redballs = $

    var BlueBallCode = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    var BlueBallCount = 0;

    var BlueBallList = new Array();
    var URL = "";

    var alertDialog = new Dialog({
        width: 300
    });

    var Selectblue = {
        initBlueBall: function (url) {
            var that = this;
            URL = url;
            $(".blueball").each(function () {
                var blueball = new BlueBall({
                    trigger: $(this),
                    code: $(this).html(),
                    active: 0
                });
                blueball.before('changeActive', function () {
                    var a = this.ge
                    if (this.get('active') == 0 & BlueBallCount >= 16) {
                        alertDialog.set("content", '<div style="padding:10px; font-size:16px; color:#f00;">最多可以选择16个红球!</div>')
                        alertDialog.show();
                        return false;

                    }
                })
                blueball.after('changeActive', function () {
                    if (this.get('active') > 0) {
                        BlueBallCount = BlueBallCount + 1;
                    }
                    else {
                        BlueBallCount = BlueBallCount - 1;
                    }

                    $("#blueballcount").html(BlueBallCount);
                })

                BlueBallList[parseInt($(this).html()) - 1] = blueball;
            })
        },

        selectBall: function (id) {
            BlueBallList[id].changeActive()
        },

        nextStep: function () {
            var that = this;
            if (BlueBallCount > 0 & BlueBallCount <= 16) {
                var blueballstr = "";
                for (i = 0; i < BlueBallList.length; i++) {
                    if (BlueBallList[i].get('active') > 0) {
                        blueballstr = blueballstr + "," + BlueBallList[i].get('code');
                    }
                }

                //location.href = URL + "?redballs=" + redballstr.trimStart(",");


                $.post(URL.toAjax(), { blueballs: blueballstr.trimStart(",") }, function (result) {
                    //alert(result.RedirectUrl);
                    location.href = result.RedirectUrl;
                })
            }
            else {
                if (BlueBallCount > 16) {
                    alertDialog.set("content", '<div style="padding:10px; font-size:16px; color:#f00;">最多可以选择16个蓝球!</div>')
                    alertDialog.show();
                    return false;
                }
                else {
                    alertDialog.set("content", '<div style="padding:10px; font-size:16px; color:#f00;">最少选择1个蓝球!</div>')
                    alertDialog.show();
                    return false;
                }
            };
        }

    }
    module.exports = Selectblue;
});