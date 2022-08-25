define(function (require, exports, module) {
    var $ = require('$'),
        StrUtil = require('./strutil')

    String.prototype.contains = function (str) { return (this.indexOf(str) > -1); };
    String.prototype.trim = function (s) { if (s) return this.trimEnd(s).trimStart(s); else return this.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, ''); };
    String.prototype.trimEnd = function (s) { if (this.endsWith(s)) { return this.substring(0, this.length - s.length); } return this; };
    String.prototype.trimStart = function (s) { if (this.startsWith(s)) { return this.slice(s.length); } return this; };
    String.prototype.startsWith = function (str) { return (this.indexOf(str) == 0); };
    String.prototype.endsWith = function (str) { return (str.length <= this.length && this.substr(this.length - str.length, str.length) == str); };
    String.prototype.remove = function (start, l) { var str1 = this.substring(0, start); var str2 = this.substring(start + l, this.length); return str1 + str2; }
    String.prototype.insert = function (index, str) { var str1 = this.substring(0, index); var str2 = this.substring(index, this.length); return str1 + str + str2; }
    String.prototype.getHashCode = function () { var h = 31; var i = 0; var l = this.length; while (i < l) h ^= (h << 5) + (h >> 2) + this.charCodeAt(i++); return h; }
    String.prototype.trimStart = function (str) { return StrUtil.trimStart(this, str); };
    String.prototype.trimEnd = function (str) { return StrUtil.trimEnd(this, str); };
    String.prototype.toInt = function () { return parseInt(this) };
    String.prototype.cssVal = function () { return this.trimEnd('px').toInt(); };
    String.prototype.startsWith = function (str) { if (str.length > this.length) return false; return this.substr(0, str.length) == str; };

    String.isNullOrEmpty = function (str) { return str; };
    String.format = function () { var str = arguments[0]; for (var i = 1; i < arguments.length; i++) { var reg = new RegExp("\\{" + (i - 1) + "\\}", "ig"); str = str.replace(reg, arguments[i]); } return str; };

    String.prototype.toAjax = function (onlyRadom) {
        var strAjax = onlyRadom ? '' : '&ajax=true';
        var indexQuery = this.indexOf('?');
        if (indexQuery < 0) {
            return this + '?rd=' + StrUtil.getRandom() + strAjax;
        }
        else {
            var queryString = this.substring(indexQuery + 1, this.length);
            var url = this.substring(0, indexQuery);
            var newQueryString = '';
            var arrQueryItem = queryString.split('&');
            for (i = 0; i < arrQueryItem.length; i++) {
                var item = arrQueryItem[i];
                if (StrUtil.startsWith(item, 'rd=') || StrUtil.startsWith(item, 'ajax=')) { continue; };
                newQueryString += item;
                if (i < arrQueryItem.length - 1) { newQueryString += '&'; };
            };
            return url + '?rd=' + StrUtil.getRandom() + strAjax + '&' + newQueryString;
        }
    };

    String.prototype.addPicSize = function (size) {
        var ext = StrUtil.getExt(this);
        var newstr = this.trimEnd("." + ext);
        return newstr + "_" + size + "." + ext;
    }

    module.exports = String;
});