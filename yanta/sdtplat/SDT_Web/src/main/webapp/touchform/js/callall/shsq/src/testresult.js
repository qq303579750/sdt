define(function (require, exports, module) {
    var $ = require('$')
    String = require('string')
    Core = require('./core');

    var TestResult = {
        testDate:[],
        pastDate:[],
        TestWQHL:function(){
            var that = this;
            var tableStr = "<table cellpadding=\"1\" cellspacing=\"1\" border=\"0\" class=\"ui-balltable\">";
            tableStr = tableStr + "<tr><td></td><td>实际值</td><td>预测值</td></tr>";
            for(i=0;i<this.pastDate.length;i++){
                var hlArr = that.GetHLNumberArr(testDate,pastDate);
                tableStr = tableStr + "<td>" + hlArr.toString() + "</td>";
            }
        },

        SetResultDate: function (url, count) {
            var that = this;
            $.post(url.toAjax(), { count: count }, function (result) {
                $("#resultList").html(that.GetResultDate(result.ResultList));
            });
        },
        GetResultDate: function (resultList) {
            var that = this;
            var tableStr = "<table cellpadding=\"1\" cellspacing=\"1\" border=\"0\" class=\"ui-balltable\">";
            tableStr = tableStr + "<tr><td>期号</td><td>号码</td><td>跨度</td><td>和值</td><td>质和</td><td>奇偶</td><td>012路</td><td>7行</td><td>8行</td><td>9行</td><td>同尾</td>";
            tableStr = tableStr + "<td>3分区</td><td>4分区</td><td>8分区</td><td>上次出号</td></tr>";
            for (i = 0; i < resultList.length - 10; i++) {
                var redballs = [parseInt(resultList[i].RedBall1), parseInt(resultList[i].RedBall2), parseInt(resultList[i].RedBall3), parseInt(resultList[i].RedBall4), parseInt(resultList[i].RedBall5), parseInt(resultList[i].RedBall6)]
                var tenlist = [resultList[i+1],resultList[i+2],resultList[i+3],resultList[i+4],resultList[i+5],resultList[i+6],resultList[i+7],resultList[i+8],resultList[i+9],resultList[i+10]]
                var r1 = parseInt(resultList[i].RedBall1);
                var r2 = parseInt(resultList[i].RedBall2);
                var r3 = parseInt(resultList[i].RedBall3);
                var r4 = parseInt(resultList[i].RedBall4);
                var r5 = parseInt(resultList[i].RedBall5);
                var r6 = parseInt(resultList[i].RedBall6);
                tableStr = tableStr + "<tr>";
                tableStr = tableStr + "<td>" + resultList[i].Issue + "</td>";
                tableStr = tableStr + "<td>" + redballs.toString() + "</td>";
                tableStr = tableStr + "<td>" + (r6 - r1) + "</td>";
                tableStr = tableStr + "<td>" + (r1 + r2 + r3 + r4 + r5 + r6) + "</td>";
                tableStr = tableStr + "<td>" + that.GetZhHNumberArr(redballs).toString() + "</td>";
                var joArr = that.GetRowNumberArr(redballs, 2);
                tableStr = tableStr + "<td>" + joArr[1] + ":" + joArr[0] + "</td>";
                var lyrArr = that.GetRowNumberArr(redballs, 3);
                tableStr = tableStr + "<td>" + lyrArr[0] + ":" + lyrArr[1] + ":" + lyrArr[2] + "</td>";
                var r7Arr = that.GetRowNumberArr(redballs, 7);
                var r8Arr = that.GetRowNumberArr(redballs, 8);
                var r9Arr = that.GetRowNumberArr(redballs, 9);
                var r10Arr = that.GetRowNumberArr(redballs, 10);
                tableStr = tableStr + "<td>" + r7Arr.toString() + "</td>";
                tableStr = tableStr + "<td>" + r8Arr.toString() + "</td>";
                tableStr = tableStr + "<td>" + r9Arr.toString() + "</td>";
                tableStr = tableStr + "<td>" + r10Arr.toString() + "</td>";
                var c3Arr = that.GetFQNumberArr(redballs, 3);
                var c4Arr = that.GetFQNumberArr(redballs, 4);
                var c8Arr = that.GetFQNumberArr(redballs, 8);
                tableStr = tableStr + "<td>" + c3Arr.toString() + "</td>";
                tableStr = tableStr + "<td>" + c4Arr.toString() + "</td>";
                tableStr = tableStr + "<td>" + c8Arr.toString() + "</td>";
                var hlArr = that.GetHLNumberArr(redballs,tenlist);
                tableStr = tableStr + "<td>" + hlArr.toString() + "</td>";

                tableStr = tableStr + "</tr>";
            }
            tableStr = tableStr + "</table>";

            return tableStr;
        },
        GetZhHNumberArr:function(redballs){
            var zhihe=[0,0]
            var zhiArr=[2,3,5,7,11,13,17,19,23,29,31];
            for(rednum=0;rednum<redballs.length;rednum++){
                for(zh=0;zh<zhiArr.length;zh++){
                    if(redballs[rednum]==zhiArr[zh]){
                        zhihe[0]=zhihe[0]+1;
                        zh=zhiArr.length;
                    }
                }
            }
            zhihe[1]=6-zhihe[0];
            return zhihe;
        },
        GetRowNumberArr: function (redballs, model) {
            var resultArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var row = 0;

            for (rednum = 0; rednum < redballs.length; rednum++) {
                row = redballs[rednum] % model;
                resultArr[row] = resultArr[row] + 1;
            }

            for (cr = model; cr < 10; cr++) {
                resultArr.pop();
            }

            return resultArr;
        },
        GetFQNumberArr: function (redballs, model) {
            var resultArr = [0, 0, 0, 0, 0, 0, 0, 0];

            var Con = Math.floor(33 / model);

            for (connum = 0; connum < redballs.length; connum++) {
                var r = Math.floor((redballs[connum] - 1) / Con);
                if (r == model) {
                    resultArr[r - 1] = resultArr[r - 1] + 1;
                }
                else {
                    resultArr[r] = resultArr[r] + 1;
                }
            }

            for (cr = model; cr < 8; cr++) {
                resultArr.pop();
            }

            return resultArr;
        },
        GetHLNumberArr: function (redballs, redball10list) {
            var hlArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var isOpen = [0,0,0,0,0,0]

            for (r = 0; r < redballs.length; r++) { 
                for(h=0;h<=redball10list.length;h++){
                    if(h==redball10list.length){
                        hlArr[h]=hlArr[h]+1;
                    }else{
                        if(this.inBalls(redballs[r],redball10list[h])){
                            hlArr[h]=hlArr[h]+1;
                            h=redball10list+1;
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

    }
    module.exports = TestResult;
});