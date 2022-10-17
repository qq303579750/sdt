define(function (require, exports, module) {

    var $ = require('$')
    String = require('string')

    var Core = {
        MakeBox: function (container, id, model) {
            var boxStr = "<div id=\"" + id + "\"><table class=\"ui-cp-table\">";
            var maxrow = Math.ceil(33 / model);
            for (i = 0; i < model; i++) {
                boxStr = boxStr + "<tr>";
                for (j = 0; j < maxrow; j++) {
                    if ((j * model + i + 1) > 33) {
                        boxStr = boxStr + "<td class=\"td" + (j * model + i + 1) + "\" date-star=\"0\"></td>"
                    }
                    else {
                        boxStr = boxStr + "<td class=\"td" + (j * model + i + 1) + "\" date-star=\"0\">" + (j * model + i + 1) + "</td>";
                    }
                }
                boxStr = boxStr + "</tr>";
            }
            boxStr = boxStr + "</table></div>";

            container.html(boxStr)
        }
    }

    module.exports = Core;

});