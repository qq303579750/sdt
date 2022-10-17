define(function (require, exports, module) {
    var $ = require('$')
    String = require('string')
    Core = require('./core');

    var RedBall = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]

    var ShSQ = {
        ShowPastDate: function (url, issue) {
            var that = this;
            $.post(url.toAjax(), { issue: issue }, function (result) {
                $("#box8").html(that.ShowBox(8, result.PastDate[0]));
                $("#box7").html(that.ShowBox(7, result.PastDate[0]));
                $("#box5").html(that.ShowBox(5, result.PastDate[0]));
                $("#pastdatebox").html(that.ShowTenIssueBox(result.PastDate));
            });
        },
        ShowGloalData: function (url, model) {
            var that = this;
            $.post(url.toAjax(), { model: model }, function (result) {
                //that.ShowGPastDataList(result.PastDate, model);
                var astr = ""; //"<div class=\"boxItem\">";
                for (count = 0; count < result.PastDate.length; count++) {
                    if (parseInt(model) == 16) {
                        var nArr = new Array();
                        for (i = 0; i < 11; i++) {
                            nArr[i] = result.PastDate[count + i]
                        }
                        if (count < result.PastDate.length - 10) {
                            astr = astr + that.ShowTenIssueBox(nArr);
                        }
                    } else {
                        astr = astr + that.ShowBox(model, result.PastDate[count]);
                    }
                    //that.ShowBox(8, result.PastDate[i], $("box8list"));
                    if ((count + 1) % model == 0) {
                        //astr = astr + "</div><div class=\"boxItem\">";
                    }
                }
                //astr = astr + "</div>";

                $("#box8list").append(astr);
            });
        },


        ShowGPastDataList: function (pastData, model) {
            var boxStr = "<div class=\"boxItem\"><table class=\"ui-cp-table\">";
           // boxStr = boxStr + "<tr><td colspan=\"7\">pastData[i].Issue</td></td>";

            for (i = 0; i < pastData.length; i++) {
                boxStr = boxStr + "<tr>";

                boxStr = boxStr + "<td>" + pastData[i].Issue + "</td>"
                boxStr = boxStr + "<td>" + pastData[i].RedBall1 + "</td>"
                boxStr = boxStr + "<td>" + pastData[i].RedBall2 + "</td>"
                boxStr = boxStr + "<td>" + pastData[i].RedBall3 + "</td>"
                boxStr = boxStr + "<td>" + pastData[i].RedBall4 + "</td>"
                boxStr = boxStr + "<td>" + pastData[i].RedBall5 + "</td>"
                boxStr = boxStr + "<td>" + pastData[i].RedBall6 + "</td>"

                boxStr = boxStr + "</tr>";
                if ((i + 1) % model == 0) {
                    boxStr = boxStr + "</table></div>";

                    boxStr = boxStr + "<div class=\"boxItem\"><table class=\"ui-cp-table\">";
                }
            }
            boxStr = boxStr + "</table></div>";

            $("#pastdatelist").html(boxStr)
        },

        ShowTenIssueBox: function (pastDate) {
            var that = this;
            //alert(pastDate.length);
            var isOpen = new Array();
            isOpen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            var boxStr = "<div style=\"float:left;\"><table class=\"ui-cp-table\">";
            boxStr = boxStr + "<tr><td colspan=\"7\">第" + pastDate[0].Issue + "期</td></td>";
            boxStr = boxStr + "<tr>";
            boxStr = boxStr + "<td class=\"td0\" date-star=\"0\"></td>"
            boxStr = boxStr + "<td class=\"td" + pastDate[0].RedBall1 + "\" style=\"" + that.GetBgColor(pastDate[0].RedBall1, pastDate[0]) + "\">" + pastDate[0].RedBall1 + "</td>"
            boxStr = boxStr + "<td class=\"td" + pastDate[0].RedBall2 + "\" style=\"" + that.GetBgColor(pastDate[0].RedBall2, pastDate[0]) + "\">" + pastDate[0].RedBall2 + "</td>"
            boxStr = boxStr + "<td class=\"td" + pastDate[0].RedBall3 + "\" style=\"" + that.GetBgColor(pastDate[0].RedBall3, pastDate[0]) + "\">" + pastDate[0].RedBall3 + "</td>"
            boxStr = boxStr + "<td class=\"td" + pastDate[0].RedBall4 + "\" style=\"" + that.GetBgColor(pastDate[0].RedBall4, pastDate[0]) + "\">" + pastDate[0].RedBall4 + "</td>"
            boxStr = boxStr + "<td class=\"td" + pastDate[0].RedBall5 + "\" style=\"" + that.GetBgColor(pastDate[0].RedBall5, pastDate[0]) + "\">" + pastDate[0].RedBall5 + "</td>"
            boxStr = boxStr + "<td class=\"td" + pastDate[0].RedBall6 + "\" style=\"" + that.GetBgColor(pastDate[0].RedBall6, pastDate[0]) + "\">" + pastDate[0].RedBall6 + "</td>"

            boxStr = boxStr + "</tr>";
            for (i = 1; i < pastDate.length; i++) {
                boxStr = boxStr + "<tr>";

                boxStr = boxStr + "<td class=\"td0\" date-star=\"0\">" + i + "</td>"

                if (isOpen[pastDate[i].RedBall1 - 1] == 0) {
                    boxStr = boxStr + "<td class=\"td" + pastDate[i].RedBall1 + "\" style=\"" + that.GetBgColor(pastDate[i].RedBall1, pastDate[0]) + "\">" + pastDate[i].RedBall1 + "</td>"
                    isOpen[pastDate[i].RedBall1 - 1] = 1
                } else {
                    boxStr = boxStr + "<td class=\"td" + pastDate[i].RedBall1 + "\" style=\"" + that.GetBgColor(pastDate[i].RedBall1, pastDate[0]) + "\"></td>"
                }
                if (isOpen[pastDate[i].RedBall2 - 1] == 0) {
                    boxStr = boxStr + "<td class=\"td" + pastDate[i].RedBall2 + "\" style=\"" + that.GetBgColor(pastDate[i].RedBall2, pastDate[0]) + "\">" + pastDate[i].RedBall2 + "</td>"
                    isOpen[pastDate[i].RedBall2 - 1] = 1
                } else {
                    boxStr = boxStr + "<td class=\"td" + pastDate[i].RedBall2 + "\" style=\"" + that.GetBgColor(pastDate[i].RedBall2, pastDate[0]) + "\"></td>"
                }
                if (isOpen[pastDate[i].RedBall3 - 1] == 0) {
                    boxStr = boxStr + "<td class=\"td" + pastDate[i].RedBall3 + "\" style=\"" + that.GetBgColor(pastDate[i].RedBall3, pastDate[0]) + "\">" + pastDate[i].RedBall3 + "</td>"
                    isOpen[pastDate[i].RedBall3 - 1] = 1
                } else {
                    boxStr = boxStr + "<td class=\"td" + pastDate[i].RedBall3 + "\" style=\"" + that.GetBgColor(pastDate[i].RedBall3, pastDate[0]) + "\"></td>"
                }
                if (isOpen[pastDate[i].RedBall4 - 1] == 0) {
                    boxStr = boxStr + "<td class=\"td" + pastDate[i].RedBall4 + "\" style=\"" + that.GetBgColor(pastDate[i].RedBall4, pastDate[0]) + "\">" + pastDate[i].RedBall4 + "</td>"
                    isOpen[pastDate[i].RedBall4 - 1] = 1
                } else {
                    boxStr = boxStr + "<td class=\"td" + pastDate[i].RedBall4 + "\" style=\"" + that.GetBgColor(pastDate[i].RedBall4, pastDate[0]) + "\"></td>"
                }
                if (isOpen[pastDate[i].RedBall5 - 1] == 0) {
                    boxStr = boxStr + "<td class=\"td" + pastDate[i].RedBall5 + "\" style=\"" + that.GetBgColor(pastDate[i].RedBall5, pastDate[0]) + "\">" + pastDate[i].RedBall5 + "</td>"
                    isOpen[pastDate[i].RedBall5 - 1] = 1
                } else {
                    boxStr = boxStr + "<td class=\"td" + pastDate[i].RedBall5 + "\" style=\"" + that.GetBgColor(pastDate[i].RedBall5, pastDate[0]) + "\"></td>"
                }
                if (isOpen[pastDate[i].RedBall6 - 1] == 0) {
                    boxStr = boxStr + "<td class=\"td" + pastDate[i].RedBall6 + "\" style=\"" + that.GetBgColor(pastDate[i].RedBall6, pastDate[0]) + "\">" + pastDate[i].RedBall6 + "</td>"
                    isOpen[pastDate[i].RedBall6 - 1] = 1
                } else {
                    boxStr = boxStr + "<td class=\"td" + pastDate[i].RedBall6 + "\" style=\"" + that.GetBgColor(pastDate[i].RedBall6, pastDate[0]) + "\"></td>"
                }
                boxStr = boxStr + "</tr>";
            }

            //boxStr = boxStr + "</table>";
            //boxStr = boxStr + "<table class=\"ui-cp-table\">";

            for (i = 0; i < 6; i++) {
                boxStr = boxStr + "<tr>";
                boxStr = boxStr + "<td class=\"td0\" date-star=\"0\"></td>"
                for (j = 0; j < 6; j++) {
                    if (isOpen[i * 6 + j] == 0) {
                        boxStr = boxStr + "<td class=\"td" + (i * 6 + j + 1) + "\" style=\"" + that.GetBgColor((i * 6 + j + 1), pastDate[0]) + "\">" + (i * 6 + j + 1) + "</td>"
                    } else {
                        boxStr = boxStr + "<td class=\"td0\" date-star=\"0\"></td>"
                    }

                }
                boxStr = boxStr + "</tr>";
            }
            boxStr = boxStr + "</table></div>";

            return boxStr;
        },

        GetBgColor: function (ball, balls) {
            if (ball == balls.RedBall1) {
                return "background-color:#DEFB7B";
            }
            if (ball == balls.RedBall2) {
                return "background-color:#F67BFB";
            }
            if (ball == balls.RedBall3) {
                return "background-color:#7BFBD8";
            }
            if (ball == balls.RedBall4) {
                return "background-color:#D5FB7B";
            }
            if (ball == balls.RedBall5) {
                return "background-color:#FBE17B";
            }
            if (ball == balls.RedBall6) {
                return "background-color:#FBA27B";
            }
            return "background-color:#efefef"

        },

        ShowBox: function (model, redball) {

            var maxrow = Math.ceil(33 / model);


            var actionBall = new Array();
            actionBall = [redball.RedBall1, redball.RedBall2, redball.RedBall3, redball.RedBall4, redball.RedBall5, redball.RedBall6];
            var ballstaterow = new Array();
            var ballstatecol = new Array();
            for (i = 0; i < model * maxrow; i++) {
                ballstaterow[i] = 0;
                ballstatecol[i] = 0;
            }

            for (i = 0; i < actionBall.length; i++) {
                var col = Math.ceil(parseInt(actionBall[i]) / model);
                var row = parseInt(actionBall[i]) % model > 0 ? parseInt(actionBall[i]) % model : model;
                for (j = 0; j < model; j++) {
                    ballstatecol[(col - 1) * model + j] = 1;
                }
                for (j = 0; j < maxrow; j++) {
                    //var c = (j * model + row) - 1;
                    ballstaterow[(j * model + parseInt(row)) - 1] = 1
                }
            }


            var boxStr = "<table class=\"ui-cp-table\" style=\"float:left;\">";
            boxStr = boxStr + "<tr><td colspan=\"" + maxrow + "\">第" + redball.Issue + "期</td></td>";

            for (i = 0; i < model; i++) {
                boxStr = boxStr + "<tr>";
                for (j = 0; j < maxrow; j++) {
                    var bgstyel = "";
                    if (ballstaterow[j * model + i] == 1 & ballstatecol[j * model + i] == 1) {
                        bgstyel = "background-color:#efefef;";
                    } else if (ballstaterow[j * model + i] == 0 & ballstatecol[j * model + i] == 0) {
                        bgstyel = "background-color:#6DA91E;";
                    }
                    else {
                        bgstyel = "background-color:#ABD96F;";
                    }

                    if (j * model + i + 1 == actionBall[0] || j * model + i + 1 == actionBall[1] || j * model + i + 1 == actionBall[2] || j * model + i + 1 == actionBall[3] || j * model + i + 1 == actionBall[4] || j * model + i + 1 == actionBall[5]) {
                        bgstyel = "color:#f00;"
                    }

                    if ((j * model + i + 1) > 33) {
                        boxStr = boxStr + "<td class=\"td" + (j * model + i + 1) + "\" style=\"" + bgstyel + "\"></td>"
                    }
                    else {
                        boxStr = boxStr + "<td class=\"td" + (j * model + i + 1) + "\" style=\"" + bgstyel + "\">" + (j * model + i + 1) + "</td>";
                    }
                }
                boxStr = boxStr + "</tr>";
            }
            boxStr = boxStr + "</table>";
            return boxStr;

        }
    }

    module.exports = ShSQ;


});