define(function (require, exports, module) {
    var $ = require('$')
    Base = require('base')
    String = require('string');

    var Test = Base.extend({
        attrs: {
            RedBalls: new Array(),
            TestDateList: new Array(),
            KuaDu: new Array(),
            HeZhi: new Array(),
            WQHL: [[0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2]],
            Row: [[], [], [[0, 2], [0, 2]], [[0, 2], [0, 2], [0, 2]], [], [], [], [[0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 2], [0, 2]], [[0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2]], [[0, 2], [0, 2], [0, 3], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2]], [[0, 1], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2]]],
            FQ: [[], [], [], [[1, 3], [1, 4], [1, 3]], [[0, 2], [0, 3], [0, 2], [1, 3]], [], [], [], [[0, 1], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 1], [0, 1]]],
        },
        ShowResult: function () {
            this.TestWQHL();
            this.TestKuaDu();
            this.TestTW();
            this.TestRow(7);
            this.TestRow(8);
            this.TestRow(9);
            this.TestFQ(3);
            this.TestFQ(4);
            this.TestFQ(8);
        },
        GetTableTr: function (title, v1, v2) {
            var tableStr = "<tr>";
            tableStr = tableStr + "<td>" + title + "</td>";
            tableStr = tableStr + "<td>" + v1 + "</td>";
            tableStr = tableStr + "<td>" + v2[0] + "-" + v2[1] + "</td>";
            if (v1 >= v2[0] & v1 <= v2[1]) {
                tableStr = tableStr + "<td>对</td>";
            } else {
                tableStr = tableStr + "<td><font style='color:#f00;'>错</font></td>";
            }
            tableStr = tableStr + "</tr>";

            return tableStr;
        },
        TestTW: function () {
            var redballs = this.get("RedBalls");
            var tw = this.GetRowNumberArr(10, redballs);
            var ttw = this.get("Row")[10];
            var tableStr = "<table cellpadding=\"1\" cellspacing=\"1\" border=\"0\" class=\"ui-balltable2\">";
            tableStr = tableStr + "<tr><td></td><td>实</td><td>预</td><td>结果</td></tr>";
            for (rn = 0; rn < tw.length; rn++) {
                tableStr = tableStr + this.GetTableTr(rn + "尾", tw[rn], ttw[rn]);
            }
            tableStr = tableStr + "<table>";

            $("#twtable").html(tableStr);
        },
        TestRow: function (model) {
            var redballs = this.get("RedBalls");
            var tr = this.GetRowNumberArr(model, redballs);
            var ttr = this.get("Row")[model];
            var tableStr = "<table cellpadding=\"1\" cellspacing=\"1\" border=\"0\" class=\"ui-balltable2\">";
            tableStr = tableStr + "<tr><td></td><td>实</td><td>预</td><td>结果</td></tr>";
            for (rn = 0; rn < tr.length; rn++) {
                tableStr = tableStr + this.GetTableTr(rn + "行", tr[rn], ttr[rn]);
            }
            tableStr = tableStr + "<table>";

            $("#tr" + model + "table").html(tableStr);
        },
        TestFQ: function (model) {
            var redballs = this.get("RedBalls");
            var tr = this.GetFQNumberArr(model, redballs);
            var ttr = this.get("FQ")[model];
            var tableStr = "<table cellpadding=\"1\" cellspacing=\"1\" border=\"0\" class=\"ui-balltable2\">";
            tableStr = tableStr + "<tr><td></td><td>实</td><td>预</td><td>结果</td></tr>";
            for (rn = 0; rn < tr.length; rn++) {
                tableStr = tableStr + this.GetTableTr((rn+1) + "区", tr[rn], ttr[rn]);
            }
            tableStr = tableStr + "<table>";

            $("#fq" + model + "table").html(tableStr);
        },

        TestKuaDu: function () {
            var that = this;
            var redballs = this.get("RedBalls");
            var kd = redballs[5] - redballs[0];
            var tkd = this.get("KuaDu");
            var hz = redballs[0] + redballs[1] + redballs[2] + redballs[3] + redballs[4] + redballs[5]
            var thz = this.get("HeZhi");
            var tableStr = "<table cellpadding=\"1\" cellspacing=\"1\" border=\"0\" class=\"ui-balltable2\">";
            tableStr = tableStr + "<tr><td></td><td>实</td><td>预</td><td>结果</td></tr>";
            var zhs = this.GetZhShu(redballs);
            var tzhs = [0, 4];
            var hs = 6 - zhs;
            var ths = [2, 6];
            var jo = that.GetRowNumberArr(2, redballs);
            var js = [1, 5];
            var os = [1, 5];

            tableStr = tableStr + this.GetTableTr("跨度", kd, tkd);
            tableStr = tableStr + this.GetTableTr("和值", hz, thz);
            tableStr = tableStr + this.GetTableTr("质数", zhs, tzhs);
            tableStr = tableStr + this.GetTableTr("合数", hs, ths);
            tableStr = tableStr + this.GetTableTr("奇数", jo[1], js);
            tableStr = tableStr + this.GetTableTr("偶数", jo[0], os);

            tableStr = tableStr + "<table>";
            $("#kdtable").html(tableStr);
        },
        GetRowNumberArr: function (model, redballs) {
            var resultArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var w_row = 0;

            for (iii = 0; iii < redballs.length; iii++) {
                w_row = redballs[iii] % model;
                resultArr[w_row] = resultArr[w_row] + 1;
            }
            for (mi = model; mi < 10; mi++) {
                resultArr.pop();
            }

            return resultArr;
        },
        GetFQNumberArr:function(model, redballs) {
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

            for (mi = model; mi < 8; mi++) {
                resultArr.pop();
            }

            return resultArr;
        },
        GetZhShu: function (redballs) {
            var count = 0;
            var zhiArr = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
            for (iiii = 0; iiii < redballs.length; iiii++) {
                if (redballs[iiii] == 1 || redballs[iiii] == 2 || redballs[iiii] == 3 || redballs[iiii] == 5 || redballs[iiii] == 7 || redballs[iiii] == 11 || redballs[iiii] == 13 || redballs[iiii] == 17 || redballs[iiii] == 19 || redballs[iiii] == 23 || redballs[iiii] == 29 || redballs[iiii] == 31) {
                    count = count + 1;
                }
            }
            return count;
        },
        TestWQHL: function () {
            var that = this;
            var twqhl = this.get("WQHL");
            var tableStr = "<table cellpadding=\"1\" cellspacing=\"1\" border=\"0\" class=\"ui-balltable2\">";
            tableStr = tableStr + "<tr><td></td><td>实</td><td>预</td><td>结果</td></tr>";

            var hlArr = that.GetHLNumberArr(this.get("RedBalls"), this.get("TestDateList"));
            for (i = 0; i < hlArr.length; i++) {
                tableStr = tableStr + this.GetTableTr("第" + i + "期", hlArr[i], twqhl[i]);
            }
            tableStr = tableStr + "<table>";
            $("#wqhl").html(tableStr);
            for (i = 0; i < this.get("RedBalls").length; i++) {
                $(".redball" + this.get("RedBalls")[i]).addClass("active");
            }
        },

        GetHLNumberArr: function (redballs, redball10list) {
            var hlArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var isOpen = [0, 0, 0, 0, 0, 0]

            for (r = 0; r < redballs.length; r++) {
                for (h = 0; h <= redball10list.length; h++) {
                    if (h == redball10list.length) {
                        hlArr[h] = hlArr[h] + 1;
                    } else {
                        if (this.inBalls(redballs[r], redball10list[h])) {
                            hlArr[h] = hlArr[h] + 1;
                            h = redball10list + 1;
                        }
                    }
                }
            }

            return hlArr;
        },
        inBalls: function (ball, balls) {
            for (var rr in balls) {
                if (ball == balls[rr]) {
                    return true;
                }
            }
            return false;
        },

        _onChangeKuaDu: function (val) {
            alert(this.get("TestDateList")[0]);
        }

    })
    module.exports = Test;
});
