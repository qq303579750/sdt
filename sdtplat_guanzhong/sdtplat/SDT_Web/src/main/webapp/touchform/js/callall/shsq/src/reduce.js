define(function (require, exports, module) {
    var $ = require('$')
    String = require('string');

    var Reduct = {
        KuaDu: new Array(),

        Start: function (kuadu) {
            this.SetRule(kuadu);
            this.ShowResult();
        },

        SetRule: function (kuadu) {
            this.KuaDu = kuadu;
        },
        ShowResult: function () {
            alert(this.KuaDu);
        }

    }
    module.exports = Reduct;
});
