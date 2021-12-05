define(function (require, exports, module) {
    var $ = require('$')
    Base = require('base')
    String = require('string')

    //var redballArr = new Array();
    //var chuanma = new Array();
    //var linma = new Array();


    var Filter = Base.extend({
        redballArr: new Array, blueballArr: new Array, chuanma: new Array, linma: new Array,
        dw_min: new Array, dw_max: new Array,
        kuadu: new Array, hezhi: new Array, chma: new Array, lma: new Array, row: new Array,
        saveFilterUrl: "",
        filterParam: "",
        resultListCount: 0,
        initialize: function (config) {
            this.redballArr = config.redballs.split(",");
            this.blueballArr = config.blueballs.split(",");
            this.filterParam = config.filterParam;
            this.chuanma = config.lastredballs.split(",");
            this.saveFilterUrl = config.saveFilterUrl;
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

            //for (i = 0; i < this.redballArr.length; i++) {
            // $("#redballbox").append("<span class=\"redball active\">" + that.redballArr[i] + "</span>");
            //}

            //for (i = 0; i < this.blueballArr.length; i++) {
            // $("#blueballbox").append("<span class=\"blueball active\">" + that.blueballArr[i] + "</span>");
            //}

            //this.initInput(0);
        },

        initInput: function (filerid) {
            if (filerid == 0) {
                var l = this.redballArr.length - 1;
                $("#DW1").find(".min").val(this.redballArr[0]);
                $("#DW1").find(".max").val(this.redballArr[l - 5]);
                $("#DW2").find(".min").val(this.redballArr[1]);
                $("#DW2").find(".max").val(this.redballArr[l - 4]);
                $("#DW3").find(".min").val(this.redballArr[2]);
                $("#DW3").find(".max").val(this.redballArr[l - 3]);
                $("#DW4").find(".min").val(this.redballArr[3]);
                $("#DW4").find(".max").val(this.redballArr[l - 2]);
                $("#DW5").find(".min").val(this.redballArr[4]);
                $("#DW5").find(".max").val(this.redballArr[l - 1]);
                $("#DW6").find(".min").val(this.redballArr[5]);
                $("#DW6").find(".max").val(this.redballArr[l]);

                $("#KuaDu").find(".min").val(5);
                $("#KuaDu").find(".max").val(this.redballArr[l] - this.redballArr[0]);

                var minhe = parseInt(this.redballArr[0]) + parseInt(this.redballArr[1]) + parseInt(this.redballArr[2]) + parseInt(this.redballArr[3]) + parseInt(this.redballArr[4]) + parseInt(this.redballArr[5]);
                var maxhe = parseInt(this.redballArr[l]) + parseInt(this.redballArr[l - 1]) + parseInt(this.redballArr[l - 2]) + parseInt(this.redballArr[l - 3]) + parseInt(this.redballArr[l - 4]) + parseInt(this.redballArr[l - 5]);
                $("#HeZhi").find(".min").val(minhe);
                $("#HeZhi").find(".max").val(maxhe);

                var chmc = this.chuanmacount(this.redballArr);
                $("#ChuanMa").find(".min").val(0);
                $("#ChuanMa").find(".max").val(chmc > 6 ? 6 : chmc);

                var lmc = this.linmacount(this.redballArr);
                $("#LinMa").find(".min").val(0);
                $("#LinMa").find(".max").val(lmc > 6 ? 6 : lmc)

                var RowNumberArr = this.getRowNumberArr(3, this.redballArr);

                $("#LYR0").find(".max").val(RowNumberArr[0] > 6 ? 6 : RowNumberArr[0]);
                $("#LYR1").find(".max").val(RowNumberArr[1] > 6 ? 6 : RowNumberArr[1])
                $("#LYR2").find(".max").val(RowNumberArr[2] > 6 ? 6 : RowNumberArr[2]);

                var RowNumberArr = this.getRowNumberArr(10, this.redballArr);

                $("#TW0").find(".max").val(RowNumberArr[0]);
                $("#TW1").find(".max").val(RowNumberArr[1]);
                $("#TW2").find(".max").val(RowNumberArr[2]);
                $("#TW3").find(".max").val(RowNumberArr[3]);
                $("#TW4").find(".max").val(RowNumberArr[4]);
                $("#TW5").find(".max").val(RowNumberArr[5]);
                $("#TW6").find(".max").val(RowNumberArr[6]);
                $("#TW7").find(".max").val(RowNumberArr[7]);
                $("#TW8").find(".max").val(RowNumberArr[8]);
                $("#TW9").find(".max").val(RowNumberArr[9]);

                var FQNumberArr = this.getFQNumberArr(3, this.redballArr);
                $("#SFQ1").find(".max").val(FQNumberArr[0] > 6 ? 6 : FQNumberArr[0]);
                $("#SFQ2").find(".max").val(FQNumberArr[1] > 6 ? 6 : FQNumberArr[1]);
                $("#SFQ3").find(".max").val(FQNumberArr[2] > 6 ? 6 : FQNumberArr[2]);
            }
            else {

                $("#DW1").find(".min").val(this.filterParam["DW1"]);

            }


            //fq[3] = [[$("#SFQ1_min").val(), $("#SFQ1_max").val()], [$("#SFQ2_min").val(), $("#SFQ2_max").val()], [$("#SFQ3_min").val(), $("#SFQ3_max").val()]]
        },

        chuanmacount: function (redballs) {
            var chcount = 0;
            var cm = [1, 2, 7, 9, 10];
            for (ii = 0; ii < redballs.length; ii++) {
                if ($.inArray(redballs[ii].toString(), cm) >= 0) {
                    chcount = chcount + 1;
                }
            }
            return chcount;
        },
        chuanmacount5: function (redballs) {
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

        filterLottery5: function (redball1, redball2, redball3, redball4, redball5) {
            var tempnumber = 0;
            tempnumber = redball5 - redball1;
            if (tempnumber < kuadu[0] || tempnumber > kuadu[1]) {
                return false;
            }

            tempnumber = redball1 + redball2 + redball3 + redball4 + redball5;
            if (tempnumber < hezhi[0] || tempnumber > hezhi[1]) {
                return false;
            }

            

            var tempredballs = [redball1, redball2, redball3, redball4, redball5];

            tempnumber = this.chuanmacount5(tempredballs);

            if (tempnumber < 1 || tempnumber > 4) {
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

        filterSave: function () {
            var filterParam = {
                DW1_min: $("#DW1").find(".min").val(),
                DW1_max: $("#DW1").find(".max").val(),
                DW2_min: $("#DW2").find(".min").val(),
                DW2_max: $("#DW2").find(".max").val(),
                DW3_min: $("#DW3").find(".min").val(),
                DW3_max: $("#DW3").find(".max").val(),
                DW4_min: $("#DW4").find(".min").val(),
                DW4_max: $("#DW4").find(".max").val(),
                DW5_min: $("#DW5").find(".min").val(),
                DW5_max: $("#DW5").find(".max").val(),
                DW6_min: $("#DW6").find(".min").val(),
                DW6_max: $("#DW6").find(".max").val(),
                KuaDu_min: $("#KuaDu").find(".min").val(),
                KuaDu_max: $("#KuaDu").find(".max").val(),
                HeZhi_min: $("#HeZhi").find(".min").val(),
                HeZhi_max: $("#HeZhi").find(".max").val(),
                ChuanMa_min: $("#ChuanMa").find(".min").val(), ChuanMa_max: $("#ChuanMa").find(".max").val(), LinMa_min: $("#LinMa").find(".min").val(), LinMa_max: $("#LinMa").find(".max").val(),
                LYR0_min: $("#LYR0").find(".min").val(), LYR1_min: $("#LYR1").find(".min").val(), LYR2_min: $("#LYR2").find(".min").val(),
                LYR0_max: $("#LYR0").find(".max").val(), LYR1_max: $("#LYR1").find(".max").val(), LYR2_max: $("#LYR2").find(".max").val(),
                TW0_min: $("#TW0").find(".min").val(), TW1_min: $("#TW1").find(".min").val(), TW2_min: $("#TW2").find(".min").val(), TW3_min: $("#TW3").find(".min").val(), TW4_min: $("#TW4").find(".min").val(), TW5_min: $("#TW5").find(".min").val(), TW6_min: $("#TW6").find(".min").val(), TW7_min: $("#TW7").find(".min").val(), TW8_min: $("#TW8").find(".min").val(), TW9_min: $("#TW9").find(".min").val(),
                TW0_max: $("#TW0").find(".max").val(), TW1_max: $("#TW1").find(".max").val(), TW2_max: $("#TW2").find(".max").val(), TW3_max: $("#TW3").find(".max").val(), TW4_max: $("#TW4").find(".max").val(), TW5_max: $("#TW5").find(".max").val(), TW6_max: $("#TW6").find(".max").val(), TW7_max: $("#TW7").find(".max").val(), TW8_max: $("#TW8").find(".max").val(), TW9_max: $("#TW9").find(".max").val(),
                SFQ1_min: $("#SFQ1").find(".min").val(), SFQ2_min: $("#SFQ2").find(".min").val(), SFQ3_min: $("#SFQ3").find(".min").val(),
                SFQ1_max: $("#SFQ1").find(".max").val(), SFQ2_max: $("#SFQ2").find(".max").val(), SFQ3_max: $("#SFQ3").find(".max").val(),
                FilterCount: this.resultListCount,
                ChuanMa: this.chuanma.toString()
            }

            $.post(this.saveFilterUrl.toAjax(), filterParam, function (result) {
                alert(result.Filterid);
                // location.href = result.RedirectUrl;
            })
        },

        filterResult: function () {


            dw_min = [$("#DW1").find(".min").val(), $("#DW2").find(".min").val(), $("#DW3").find(".min").val(), $("#DW4").find(".min").val(), $("#DW5").find(".min").val(), $("#DW6").find(".min").val()];
            dw_max = [$("#DW1").find(".max").val(), $("#DW2").find(".max").val(), $("#DW3").find(".max").val(), $("#DW4").find(".max").val(), $("#DW5").find(".max").val(), $("#DW6").find(".max").val()];
            kuadu = [$("#KuaDu").find(".min").val(), $("#KuaDu").find(".max").val()];
            hezhi = [$("#HeZhi").find(".min").val(), $("#HeZhi").find(".max").val()];
            chma = [$("#ChuanMa").find(".min").val(), $("#ChuanMa").find(".max").val()];
            lma = [$("#LinMa").find(".min").val(), $("#LinMa").find(".max").val()];
            rows = [[], [], [], [], [], [], [], [], [], [], []]
            rows[3] = [[$("#LYR0").find(".min").val(), $("#LYR0").find(".max").val()], [$("#LYR1").find(".min").val(), $("#LYR1").find(".max").val()], [$("#LYR2").find(".min").val(), $("#LYR2").find(".max").val()]]
            rows[10] = [[$("#TW0").find(".min").val(), $("#TW0").find(".max").val()], [$("#TW1").find(".min").val(), $("#TW1").find(".max").val()], [$("#TW2").find(".min").val(), $("#TW2").find(".max").val()], [$("#TW3").find(".min").val(), $("#TW3").find(".max").val()], [$("#TW4").find(".min").val(), $("#TW4").find(".max").val()], [$("#TW5").find(".min").val(), $("#TW5").find(".max").val()], [$("#TW6").find(".min").val(), $("#TW6").find(".max").val()], [$("#TW7").find(".min").val(), $("#TW7").find(".max").val()], [$("#TW8").find(".min").val(), $("#TW8").find(".max").val()], [$("#TW9").find(".min").val(), $("#TW9").find(".max").val()], ]

            fq = [[], [], [], [], [], [], [], [], []]
            fq[3] = [[$("#SFQ1").find(".min").val(), $("#SFQ1").find(".max").val()], [$("#SFQ2").find(".min").val(), $("#SFQ2").find(".max").val()], [$("#SFQ3").find(".min").val(), $("#SFQ3").find(".max").val()]]


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
                                //if (!this.filterLottery(redball1, redball2, redball3, redball4, redball5))
                                    //continue;
                                //resultList[this.resultListCount] = [redball1, redball2, redball3, redball4, redball5];
                                //this.resultListCount = this.resultListCount + 1;
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

            var boxStr = "22222222222";
            var lanqArr = this.blueballArr;
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
                //boxStr = boxStr + "<br />";
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
    module.exports = Filter;
});