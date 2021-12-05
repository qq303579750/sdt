define(function (require, exports, module) {
    var $ = require('$')
    String = require('string')

    var BallTable = {
        RedBallTable: function (model, tablebox) {

            var maxrow = Math.ceil(33 / model);

            var boxStr = "<table cellpadding=\"1\" cellspacing=\"1\" border=\"0\" class=\"balltable\">";
            boxStr = boxStr + "<tr><td class=\"tabletitle\" colspan=\"" + (maxrow+1) + "\">下图中至少有两行不会出号</td></td>";

            for (i = 0; i < model; i++) {
                boxStr = boxStr + "<tr>";
                boxStr = boxStr + "<td>"+(i+1)+"</td>"
                for (j = 0; j < maxrow; j++) {
                    if ((j * model + i + 1) > 33) {
                        boxStr = boxStr + "<td></td>"
                    }
                    else {
                        boxStr = boxStr + "<td><span class=\"redball" + (j * model + i + 1) + "\">" + (j * model + i + 1) + "</span></td>";
                    }
                }
                boxStr = boxStr + "</tr>";
            }
            boxStr = boxStr + "</table>";
            $("#" + tablebox).append(boxStr);

        }
    };
    module.exports = BallTable;
});