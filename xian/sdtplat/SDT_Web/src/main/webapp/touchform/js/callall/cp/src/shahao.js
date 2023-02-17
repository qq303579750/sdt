define(function (require, exports, module) {
    var $ = require('$')
    String = require('string')

    var hideArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var ballArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
    var chuanma = new Array();
    var lingma = new Array();
    var redballcount = 33;
    var yesball = "";


    var ShaHao = {

        ReSet: function (redballs, hideCount, lastIssue) {
            var redballsArr = redballs.split(",");
            var hideCountArr = hideArr.splice(",");
            chuanma = lastIssue.split(",");
            for (i = 0; i < chuanma.length; i++) {
                var a = $.inArray(parseInt(chuanma[i]) - 1, lingma);
                if ($.inArray(parseInt(chuanma[i]) - 1, lingma) == -1) {
                    lingma[lingma.length] = parseInt(chuanma[i]) - 1;
                }

                if ($.inArray(parseInt(chuanma[i]) + 1, lingma) == -1) {
                    lingma[lingma.length] = parseInt(chuanma[i]) + 1;
                }


            }

            var blhm = "";

            yesball = redballs;

            redballcount = redballsArr.length;
            for (i = 0; i < hideCountArr.length; i++) {
                hideArr[i] = parseInt(hideCountArr[i]);
            }

            for (i = 0; i < redballsArr.length; i++) {

                blhm = blhm + "<span class=\"redball\">" + redballsArr[i] + "</span>";
            }
            $("#blhm").html(blhm);

            this.SetRowXZ(10, redballsArr);
            this.SetRowXZ(9, redballsArr);
            this.SetRowXZ(8, redballsArr);
            this.SetRowXZ(7, redballsArr);
            this.SetRowXZ(6, redballsArr);
            this.SetRowXZ(5, redballsArr);
            this.SetRowXZ(4, redballsArr);
            this.SetRowXZ(3, redballsArr);

            this.SetFQ(3, redballsArr);
            this.SetFQ(4, redballsArr);
            this.SetFQ(8, redballsArr);

            this.SetCM(redballsArr);
            this.SetLM(redballsArr);

            this.CreateCaiPiao();

        },
        HideNub: function (killball) {

            var model = killball.attr("date-model");
            var state = killball.attr("date-state");
            var style = killball.attr("date-style");
            var number = killball.attr("date-number");

            var actionBall = new Array();
            var maxrow = Math.ceil(33 / model);
            if (style == "row") {
                for (i = 1; i <= maxrow; i++) {
                    if (((i - 1) * model + parseInt(number)) <= 33) {
                        actionBall[i - 1] = (i - 1) * model + parseInt(number);
                    }
                }
            }
            else {
                for (i = 1; i <= model; i++) {
                    if (((number - 1) * model + i) <= 33) {
                        actionBall[i - 1] = (number - 1) * model + i;
                    }
                }
            }

            if (state == "false") {
                for (i = 0; i < actionBall.length; i++) {
                    hideArr[actionBall[i] - 1] = hideArr[actionBall[i] - 1] + 1;
                    $(".td" + actionBall[i]).css("background-color", "#E8E8E8");
                }
                killball.attr("date-state", "true");
                if (style != "single") {
                    killball.css('background-image', 'url(/static/img/no.png)');
                }
                //alert(killball.css('background-image'))
            }
            else {
                for (i = 0; i < actionBall.length; i++) {
                    hideArr[actionBall[i] - 1] = hideArr[actionBall[i] - 1] - 1;
                    if (hideArr[actionBall[i] - 1] == 0) {
                        $(".td" + actionBall[i]).css("background-color", "#f8f8f8");
                    }
                }
                killball.attr("date-state", "false");
                killball.css("background-image", "#f8f8f8");
                if (style != "single") {
                    killball.css('background-image', 'url(/static/img/yes.png)');
                }
            }

            this.ShowNumb();


        },

        ShowNumb: function () {
            var blhm = "";
            redballcount = 0;
            yesball = "";
            for (i = 0; i < hideArr.length; i++) {

                if (hideArr[i] == "0") {
                    blhm = blhm + "<span class=\"redball\">" + ballArr[i] + "</span>";
                    redballcount = redballcount + 1;
                    yesball = yesball + "," + ballArr[i];
                }
                else {
                    blhm = blhm + "<span>" + ballArr[i] + "</span>";
                }
            }
            $("#blhm").html(blhm);

        },
        SetFQ: function (number, redballs) {
            var FQNumberArr = [0, 0, 0, 0, 0, 0, 0, 0]
            var Con = Math.floor(33 / number);
            for (i = 0; i < redballs.length; i++) {
                var r = Math.floor((redballs[i] - 1) / Con);
                if (r == number) {
                    FQNumberArr[r - 1] = FQNumberArr[r - 1] + 1;
                }
                else {
                    FQNumberArr[r] = FQNumberArr[r] + 1;
                }
            }

            for (i = 0; i < FQNumberArr.length; i++) {
                $("#" + number + "f" + (i + 1)).val(FQNumberArr[i]);
            }
        },
        FQ: function (number, f, redball1, redball2, redball3, redball4, redball5, redball6) {
            var FQNumberArr = [0, 0, 0, 0, 0, 0, 0, 0];

            var redballs = [redball1, redball2, redball3, redball4, redball5, redball6];
            var Con = Math.floor(33 / number);

            for (ii = 0; ii < redballs.length; ii++) {
                var r = Math.floor((redballs[ii] - 1) / Con);
                if (r == number) {
                    FQNumberArr[r - 1] = FQNumberArr[r - 1] + 1;
                }
                else {
                    FQNumberArr[r] = FQNumberArr[r] + 1;
                }
            }

            for (ii = 0; ii < FQNumberArr.length; ii++) {
                if (FQNumberArr[ii] > 0) {
                    if (f[ii] == 0) {
                        return false;
                    }
                    else if (FQNumberArr[ii] > f[ii]) {
                        return false;
                    }
                }
            }


            return true;
        },
        SetRowXZ: function (number, redballs) {
            var RowNumberArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (i = 0; i < redballs.length; i++) {
                var r = redballs[i] % number;
                RowNumberArr[r] = RowNumberArr[r] + 1;
            }
            for (i = 0; i < RowNumberArr.length; i++) {
                $("#" + number + "r" + (i + 1)).val(RowNumberArr[i]);
            }
        },
        RowXZ: function (number, r, redball1, redball2, redball3, redball4, redball5, redball6) {
            var RowNumberArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var r1 = redball1 % number;
            var r2 = redball2 % number;
            var r3 = redball3 % number;
            var r4 = redball4 % number;
            var r5 = redball5 % number;
            var r6 = redball6 % number;

            RowNumberArr[r1] = RowNumberArr[r1] + 1;
            RowNumberArr[r2] = RowNumberArr[r2] + 1;
            RowNumberArr[r3] = RowNumberArr[r3] + 1;
            RowNumberArr[r4] = RowNumberArr[r4] + 1;
            RowNumberArr[r5] = RowNumberArr[r5] + 1;
            RowNumberArr[r6] = RowNumberArr[r6] + 1;

            //var r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            //for (i = 0; i < number; i++) {
            // r[i] = isNaN(parseInt($("#" + number + "r" + (i + 1) + "").val())) ? 0 : parseInt($("#" + number + "r" + (i + 1) + "").val());
            //}

            for (ii = 0; ii < RowNumberArr.length; ii++) {
                if (RowNumberArr[ii] > 0) {
                    if (r[ii] == 0) {
                        return false;
                    }
                    else if (RowNumberArr[ii] > r[ii]) {
                        return false;
                    }
                }
            }

            return true;

        },
        SetCM: function (redballs) {
            var chcount = 0;
            for (i = 0; i < redballs.length; i++) {
                if ($.inArray(redballs[i].toString(), chuanma) >= 0) {
                    chcount = chcount + 1;
                }
            }
            $("#mincm").val(0);
            $("#maxcm").val(chcount);
        },

        SetLM: function (redballs) {
            var chcount = 0;
            for (i = 0; i < redballs.length; i++) {
                if ($.inArray(parseInt(redballs[i]), lingma) >= 0) {
                    chcount = chcount + 1;
                }
            }
            $("#minlm").val(0);
            $("#maxlm").val(chcount);
        },

        ChuanHao: function (minCount, maxCount, redball1, redball2, redball3, redball4, redball5, redball6) {

            var chcount = 0;
            if ($.inArray(redball1.toString(), chuanma) >= 0) {
                chcount = chcount + 1;
            }
            if ($.inArray(redball2.toString(), chuanma) >= 0) {
                chcount = chcount + 1;
            }
            if ($.inArray(redball3.toString(), chuanma) >= 0) {
                chcount = chcount + 1;
            }
            if ($.inArray(redball4.toString(), chuanma) >= 0) {
                chcount = chcount + 1;
            }
            if ($.inArray(redball5.toString(), chuanma) >= 0) {
                chcount = chcount + 1;
            }
            if ($.inArray(redball6.toString(), chuanma) >= 0) {
                chcount = chcount + 1;
            }


            if (maxCount > 0) {
                if (chcount < minCount || chcount > maxCount) {
                    return false;
                }
            }

            return true;

        },

        LinHao: function (minCount, maxCount, redball1, redball2, redball3, redball4, redball5, redball6) {

            var chcount = 0;
            if ($.inArray(parseInt(redball1), lingma) >= 0) {
                chcount = chcount + 1;
            }
            if ($.inArray(parseInt(redball2), lingma) >= 0) {
                chcount = chcount + 1;
            }
            if ($.inArray(parseInt(redball3), lingma) >= 0) {
                chcount = chcount + 1;
            }
            if ($.inArray(parseInt(redball4), lingma) >= 0) {
                chcount = chcount + 1;
            }
            if ($.inArray(parseInt(redball5), lingma) >= 0) {
                chcount = chcount + 1;
            }
            if ($.inArray(parseInt(redball6), lingma) >= 0) {
                chcount = chcount + 1;
            }


            if (maxCount > 0) {
                if (chcount < minCount || chcount > maxCount) {
                    return false;
                }
            }

            return true;

        },

        SavePlan: function (url) {
            var that = this;
            if (redballcount >= 6 & redballcount <= 16) {
                $.post(url.toAjax(), { redballs: yesball.trimStart(","), hideCountArr: hideArr.toString() }, function (result) {
                    alert(result.RedirectUrl);
                })
            }
            else {
                if (redballcount > 16) {
                    alert("预留号码太多,请继续杀号!");
                }
                else {
                    alert("至少保留6个号码");
                }
            };
        },

        CreateCaiPiao: function () {

            if (redballcount > 16) {
                alert("预留号码太多,请继续杀号!");
            }
            else if (redballcount >= 6) {
                var redballArr = new Array();

                redballArr = yesball.trimStart(",").split(",");

                var minHe = isNaN(parseInt($("#minHe").val())) ? 21 : parseInt($("#minHe").val());
                var maxHe = isNaN(parseInt($("#maxHe").val())) ? 183 : parseInt($("#maxHe").val());
                var longt = isNaN(parseInt($("#longt").val())) ? 0 : parseInt($("#longt").val());
                var fengw = isNaN(parseInt($("#fengw").val())) ? 0 : parseInt($("#fengw").val());
                var minKua = isNaN(parseInt($("#minKua").val())) ? 0 : parseInt($("#minKua").val());
                var maxKua = isNaN(parseInt($("#maxKua").val())) ? 0 : parseInt($("#maxKua").val());
                var dan1 = isNaN(parseInt($("#dan1").val())) ? 0 : parseInt($("#dan1").val());
                var dan2 = isNaN(parseInt($("#dan2").val())) ? 0 : parseInt($("#dan2").val());
                var dan3 = isNaN(parseInt($("#dan3").val())) ? 0 : parseInt($("#dan3").val());
                var dan4 = isNaN(parseInt($("#dan4").val())) ? 0 : parseInt($("#dan4").val());
                var dan5 = isNaN(parseInt($("#dan5").val())) ? 0 : parseInt($("#dan5").val());
                var mincm = isNaN(parseInt($("#mincm").val())) ? 0 : parseInt($("#mincm").val());
                var maxcm = isNaN(parseInt($("#maxcm").val())) ? 0 : parseInt($("#maxcm").val());
                var minlm = isNaN(parseInt($("#minlm").val())) ? 0 : parseInt($("#minlm").val());
                var maxlm = isNaN(parseInt($("#maxlm").val())) ? 0 : parseInt($("#maxlm").val());

                var rlist = new Array();

                for (i = 0; i < 11; i++) {
                    var r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (j = 0; j < 10; j++) {
                        r[j] = isNaN(parseInt($("#" + i + "r" + (j + 1) + "").val())) ? 0 : parseInt($("#" + i + "r" + (j + 1) + "").val());
                    }
                    rlist[i] = r;
                }

                var flist = new Array();

                for (i = 0; i < 9; i++) {
                    var r = [0, 0, 0, 0, 0, 0, 0, 0];
                    for (j = 0; j < 8; j++) {
                        r[j] = isNaN(parseInt($("#" + i + "f" + (j + 1) + "").val())) ? 0 : parseInt($("#" + i + "f" + (j + 1) + "").val());
                    }
                    flist[i] = r;
                }



                // var r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                //for (i = 0; i < number; i++) {
                // r[i] = isNaN(parseInt($("#" + number + "r" + (i + 1) + "").val())) ? 0 : parseInt($("#" + number + "r" + (i + 1) + "").val());
                //}

                var resultList = new Array();
                var redball1 = 0, redball2 = 0, redball3 = 0, redball4 = 0, redball5 = 0, redball6 = 0;
                var resultListCount = 0;

                for (i = 0; i < redballArr.length - 5; i++) {
                    redball1 = parseInt(redballArr[i]);
                    if (longt > 0 & redball1 != longt) {
                        continue;
                    }
                    if (redball1 > 10) {
                        continue;
                    }
                    for (j = i + 1; j < redballArr.length - 4; j++) {
                        redball2 = parseInt(redballArr[j]);
                        if (redball2 < 2 || redball2 > 15) {
                            continue;
                        }
                        for (k = j + 1; k < redballArr.length - 3; k++) {
                            redball3 = parseInt(redballArr[k]);
                            if (redball3 < 3 || redball3 > 20) {
                                continue;
                            }
                            for (l = k + 1; l < redballArr.length - 2; l++) {
                                redball4 = parseInt(redballArr[l]);
                                if (redball4 < 11 || redball4 > 30) {
                                    continue;
                                }
                                for (m = l + 1; m < redballArr.length - 1; m++) {
                                    redball5 = parseInt(redballArr[m]);
                                    if (redball5 < 16 || redball5 > 32) {
                                        continue;
                                    }
                                    for (n = m + 1; n < redballArr.length; n++) {
                                        redball6 = parseInt(redballArr[n]);
                                        if (fengw > 0 & fengw != redball6) {
                                            continue;
                                        }
                                        var tk = redball6 - redball1
                                        if (minKua > 0 & tk < minKua) {
                                            continue;
                                        }
                                        if (maxKua > 0 & tk > maxKua) {
                                            continue;
                                        }
                                        if (redball6 > 24) {
                                            var he = redball1 + redball2 + redball3 + redball4 + redball5 + redball6;
                                            if (he >= minHe & he <= maxHe) {
                                                if (dan1 > 0) {
                                                    if (redball1 != dan1 & redball2 != dan1 & redball3 != dan1 & redball4 != dan1 & redball5 != dan1 & redball6 != dan1) {
                                                        continue;
                                                    }
                                                }
                                                if (dan2 > 0) {
                                                    if (redball1 != dan2 & redball2 != dan2 & redball3 != dan2 & redball4 != dan2 & redball5 != dan2 & redball6 != dan2) {
                                                        continue;
                                                    }
                                                }
                                                if (dan3 > 0) {
                                                    if (redball1 != dan3 & redball2 != dan3 & redball3 != dan3 & redball4 != dan3 & redball5 != dan3 & redball6 != dan3) {
                                                        continue;
                                                    }
                                                }
                                                if (dan4 > 0) {
                                                    if (redball1 != dan4 & redball2 != dan4 & redball3 != dan4 & redball4 != dan4 & redball5 != dan4 & redball6 != dan4) {
                                                        continue;
                                                    }
                                                }
                                                if (dan5 > 0) {
                                                    if (redball1 != dan5 & redball2 != dan5 & redball3 != dan5 & redball4 != dan5 & redball5 != dan5 & redball6 != dan5) {
                                                        continue;
                                                    }
                                                }

                                                if (!this.RowXZ(10, rlist[10], redball1, redball2, redball3, redball4, redball5, redball6)) {
                                                    continue;
                                                }
                                                if (!this.RowXZ(9, rlist[9], redball1, redball2, redball3, redball4, redball5, redball6)) {
                                                    continue;
                                                }
                                                if (!this.RowXZ(8, rlist[8], redball1, redball2, redball3, redball4, redball5, redball6)) {
                                                    continue;
                                                }
                                                if (!this.RowXZ(7, rlist[7], redball1, redball2, redball3, redball4, redball5, redball6)) {
                                                    continue;
                                                }
                                                if (!this.RowXZ(6, rlist[6], redball1, redball2, redball3, redball4, redball5, redball6)) {
                                                    continue;
                                                }
                                                if (!this.RowXZ(5, rlist[5], redball1, redball2, redball3, redball4, redball5, redball6)) {
                                                    continue;
                                                }
                                                if (!this.RowXZ(4, rlist[4], redball1, redball2, redball3, redball4, redball5, redball6)) {
                                                    continue;
                                                }
                                                if (!this.RowXZ(3, rlist[3], redball1, redball2, redball3, redball4, redball5, redball6)) {
                                                    continue;
                                                }

                                                if (!this.FQ(3, flist[3], redball1, redball2, redball3, redball4, redball5, redball6)) {
                                                    continue;
                                                }

                                                if (!this.FQ(4, flist[4], redball1, redball2, redball3, redball4, redball5, redball6)) {
                                                    continue;
                                                }

                                                if (!this.FQ(8, flist[8], redball1, redball2, redball3, redball4, redball5, redball6)) {
                                                    continue;
                                                }

                                                if (!this.ChuanHao(mincm, maxcm, redball1, redball2, redball3, redball4, redball5, redball6)) {
                                                    continue;
                                                }

                                                if (!this.LinHao(minlm, maxlm, redball1, redball2, redball3, redball4, redball5, redball6)) {
                                                    continue;
                                                }

                                                //!this.RowXZ(3, redball1, redball2, redball3, redball4, redball5, redball6)

                                                resultList[resultListCount] = [redball1, redball2, redball3, redball4, redball5, redball6];
                                                resultListCount = resultListCount + 1;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                //var boxStr = "<table class=\"ui-cp-table\" style=\"float:left;\">";
                //for (i = 0; i < resultList.length; i++) {
                //boxStr = boxStr + "<tr>";
                //for (j = 0; j < resultList[i].length; j++) {
                //    boxStr = boxStr + "<td>" + resultList[i][j] + "</td>"
                // }
                // boxStr = boxStr + "</tr>";
                //}
                //boxStr = boxStr + "</table>";

                var boxStr = "";
                var lanq = $("#lanq").val();
                var lanqArr = lanq.split(",");
                /*for (i = 0; i < resultList.length; i++) {
                boxStr = boxStr + "<div class=\"resultbox\" style=\"float:left;\">";
                for (j = 0; j < resultList[i].length; j++) {
                ;
                boxStr = boxStr + "<span>" + resultList[i][j] + "</span>"
                }
                boxStr = boxStr + "<span><span>";
                boxStr = boxStr + "</div>";
                }*/

                for (i = 0; i < resultList.length; i++) {
                    //boxStr = boxStr + "<div class=\"resultbox\" style=\"float:left;\">";
                    for (j = 0; j < resultList[i].length; j++) {
                        if (resultList[i][j] < 10) {
                            boxStr = boxStr + "0" + resultList[i][j] + " ";
                        }
                        else {
                            boxStr = boxStr + resultList[i][j] + " "
                        }
                    }
                    if (lanqArr.length > 0) {
                        var lanball = lanqArr[Math.floor(Math.random() * lanqArr.length)];
                        if (lanball < 10) {
                            boxStr = boxStr.trimEnd(" ") + "+0" + lanball + "<br />";
                        }
                        else {
                            boxStr = boxStr.trimEnd(" ") + "+" + lanball + "<br />";
                        }
                    }
                    else {
                        boxStr = boxStr.trimEnd(" ") + "+12<br />";
                    }
                }



                $("#resultListCount").html(resultListCount);
                $("#resultList").html(boxStr);


            }
            else {
                alert("至少保留6个号码");
            }

        }
    }
    module.exports = ShaHao;
});