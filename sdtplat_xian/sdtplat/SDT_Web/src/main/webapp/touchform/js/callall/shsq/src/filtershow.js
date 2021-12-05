define(function (require, exports, module) {
    var $ = require('$')
    Base = require('base')
    String = require('string')
    var FilterShow = Base.extend({
        redballArr: new Array, blueballArr: new Array, chuanma: new Array, linma: new Array,
        filterParam: "",
        resultListCount: 0,
        initialize: function (config) {
            this.redballArr = config.filterParam["redBalls"].split(",");
            this.blueballArr = config.filterParam["blueBalls"].split(",");
            this.filterParam = config.filterParam;

            this.chuanma = config.chuanmas.split(",");

            for (i = 0; i < this.chuanma.length; i++) {
                var a = $.inArray(parseInt(this.chuanma[i]) - 1, this.linma);
                if ($.inArray(parseInt(this.chuanma[i]) - 1, this.linma) == -1 & $.inArray(parseInt(this.chuanma[i]) - 1, this.chuanma) == -1) {
                    this.linma[this.linma.length] = parseInt(this.chuanma[i]) - 1;
                }

                if ($.inArray(parseInt(this.chuanma[i]) + 1, this.linma) == -1 & $.inArray(parseInt(this.chuanma[i]) + 1, this.chuanma) == -1) {
                    this.linma[this.linma.length] = parseInt(this.chuanma[i]) + 1;
                }
            }

            var that = this;

            for (i = 0; i < this.redballArr.length; i++) {
                $("#redball").append("<span class=\"redball\">" + that.redballArr[i] + "</span>");
            }

            for (i = 0; i < this.blueballArr.length; i++) {
                $("#blueball").append("<span class=\"blueball\">" + that.blueballArr[i] + "</span>");
            }

            this.filterResult();
        },

        chuanmacount: function (redballs) {
            var chcount = 0;
            for (ii = 0; ii < redballs.length; ii++) {
                if ($.inArray(redballs[ii].toString(), this.chuanma) >= 0) {
                    chcount = chcount + 1;
                }
            }
            return chcount;
        },

        linmacount: function (redballs) {
            var lincount = 0;
            for (ii = 0; ii < redballs.length; ii++) {
                if ($.inArray(parseInt(redballs[ii]), this.linma) >= 0) {
                    lincount = lincount + 1;
                }
            }
            return lincount;
        },

        getRowNumberArr: function (model, redballs) {
            var resultArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var w_row = 0;

            for (iii = 0; iii < redballs.length; iii++) {
                w_row = redballs[iii] % model;
                resultArr[w_row] = resultArr[w_row] + 1;
            }

            return resultArr;
        },

        filterRow: function (model, redballs) {
            var RowNumberArr = this.getRowNumberArr(model, redballs);

            for (ii = 0; ii < model; ii++) {
                if (RowNumberArr[ii] < rows[model][ii][0] || RowNumberArr[ii] > rows[model][ii][1]) {
                    return false;
                }
            }

            return true;
        },
        getFQNumberArr: function (model, redballs) {
            var resultArr = [0, 0, 0, 0, 0, 0, 0, 0];

            var Con = Math.floor(33 / model);

            for (iii = 0; iii < redballs.length; iii++) {
                var r = Math.floor((redballs[iii] - 1) / Con);
                if (r == model) {
                    resultArr[r - 1] = resultArr[r - 1] + 1;
                }
                else {
                    resultArr[r] = resultArr[r] + 1;
                }
            }

            return resultArr;
        },

        filterFQ: function (model, redballs) {
            var FQNumberArr = this.getFQNumberArr(model, redballs);

            for (ii = 0; ii < model; ii++) {
                if (FQNumberArr[ii] < fq[model][ii][0] || FQNumberArr[ii] > fq[model][ii][1]) {
                    return false;
                }
            }
            return true;
        },

        filterRedball: function (redball, num) {
            if (redball < dw_min[num - 1] || redball > dw_max[num - 1]) {
                return false;
            }
            return true;
        },

        filterLottery: function (redball1, redball2, redball3, redball4, redball5, redball6) {
            var tempnumber = 0;
            tempnumber = redball6 - redball1;
            if (tempnumber < kuadu[0] || tempnumber > kuadu[1]) {
                return false;
            }

            tempnumber = redball1 + redball2 + redball3 + redball4 + redball5 + redball6;
            if (tempnumber < hezhi[0] || tempnumber > hezhi[1]) {
                return false;
            }

            var tempredballs = [redball1, redball2, redball3, redball4, redball5, redball6];

            tempnumber = this.chuanmacount(tempredballs);
            if (tempnumber < chma[0] || tempnumber > chma[1]) {
                return false;
            }

            tempnumber = this.linmacount(tempredballs);
            if (tempnumber < lma[0] || tempnumber > lma[1]) {
                return false;
            }

            if (!this.filterRow(3, tempredballs)) {
                return false;
            }

            if (!this.filterRow(10, tempredballs)) {
                return false;
            }

            if (!this.filterFQ(3, tempredballs)) {
                return false;
            }



            return true;
        },

        filterResult: function () {
            dw_min = this.filterParam["DW_min"];
            dw_max = this.filterParam["DW_max"];
            kuadu = this.filterParam["KuaDu"];
            hezhi = this.filterParam["HeZhi"];
            chma = [this.filterParam["ChuanMa"][0], this.filterParam["ChuanMa"][1]];
            lma = [this.filterParam["LinMa"][0], this.filterParam["LinMa"][1]];

            rows = [[], [], [], [], [], [], [], [], [], [], []]
            rows[3] = [[this.filterParam["LYR0"][0], this.filterParam["LYR0"][1]], [this.filterParam["LYR1"][0], this.filterParam["LYR1"][1]], [this.filterParam["LYR2"][0], this.filterParam["LYR2"][1]]]
            rows[10] = [[this.filterParam["TW0"][0], this.filterParam["TW0"][1]], [this.filterParam["TW1"][0], this.filterParam["TW1"][1]], [this.filterParam["TW2"][0], this.filterParam["TW2"][1]], [this.filterParam["TW3"][0], this.filterParam["TW3"][1]], [this.filterParam["TW4"][0], this.filterParam["TW4"][1]], [this.filterParam["TW5"][0], this.filterParam["TW5"][1]], [this.filterParam["TW6"][0], this.filterParam["TW6"][1]], [this.filterParam["TW7"][0], this.filterParam["TW7"][1]], [this.filterParam["TW8"][0], this.filterParam["TW8"][1]], [this.filterParam["TW9"][0], this.filterParam["TW9"][1]]]

            fq = [[], [], [], [], [], [], [], [], []]
            fq[3] = [[this.filterParam["SFQ1"][0], this.filterParam["SFQ1"][1]], [this.filterParam["SFQ2"][0], this.filterParam["SFQ2"][1]], [this.filterParam["SFQ3"][0], this.filterParam["SFQ3"][1]]]

            var resultList = new Array();
            var redball1 = 0, redball2 = 0, redball3 = 0, redball4 = 0, redball5 = 0, redball6 = 0;
            //var resultListCount = 0;
            this.resultListCount = 0;

            for (i = 0; i < this.redballArr.length - 5; i++) {
                redball1 = parseInt(this.redballArr[i]);
                if (!this.filterRedball(redball1, 1))
                    continue;
                for (j = i + 1; j < this.redballArr.length - 4; j++) {
                    redball2 = parseInt(this.redballArr[j]);
                    if (!this.filterRedball(redball2, 2))
                        continue;
                    for (k = j + 1; k < this.redballArr.length - 3; k++) {
                        redball3 = parseInt(this.redballArr[k]);
                        if (!this.filterRedball(redball3, 3))
                            continue;
                        for (l = k + 1; l < this.redballArr.length - 2; l++) {
                            redball4 = parseInt(this.redballArr[l]);
                            if (!this.filterRedball(redball4, 4))
                                continue;
                            for (m = l + 1; m < this.redballArr.length - 1; m++) {
                                redball5 = parseInt(this.redballArr[m]);
                                if (!this.filterRedball(redball5, 5))
                                    continue;
                                for (n = m + 1; n < this.redballArr.length; n++) {
                                    redball6 = parseInt(this.redballArr[n]);
                                    if (!this.filterRedball(redball6, 6))
                                        continue;
                                    if (!this.filterLottery(redball1, redball2, redball3, redball4, redball5, redball6))
                                        continue;
                                    resultList[this.resultListCount] = [redball1, redball2, redball3, redball4, redball5, redball6];
                                    this.resultListCount = this.resultListCount + 1;
                                }
                            }
                        }
                    }
                }
            }

            $("#resultListCount").html(this.resultListCount);

            var boxStr = "";
            var lanqArr = this.blueballArr;

            for (i = 0; i < resultList.length; i++) {
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
            $("#resultList").html(boxStr);
        }
    });

    module.exports = FilterShow;

});