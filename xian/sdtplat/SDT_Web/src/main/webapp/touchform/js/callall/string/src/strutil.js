define(function (require, exports, module) {
    var $ = require('$');


    var StrUtil = {
        isNull : function( txt ) {
            return txt=='undefined' || txt==null || txt.length<1;
        },

        hasText : function( txt ) {
            return !this.isNull( txt );
        },

        startsWith : function( txt, value ) {
            return ( txt.substr( 0, value.length ) == value );
        },

        endsWith : function( txt, value ) {
            return ( txt.substr( txt.length-value.length, txt.length ) == value ) ;
        },

        isJson : function( obj ) {
            return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;    
        },
    
        isInt : function( text ) {
            var i = parseInt(text);
            if (isNaN(i)) {return false;};
            if (i.toString() == text) {return true;};
            return false;
        },

        replaceAll : function( strText, strTarget,  strSubString ){
            var intIndexOfMatch = strText.indexOf( strTarget );
            while (intIndexOfMatch != -1) {
                strText = strText.replace( strTarget, strSubString );
                intIndexOfMatch = strText.indexOf( strTarget );
            };
            return strText;
        },

        endsWith : function ( txt, value ) {
            return ( txt.substr( txt.length-value.length, txt.length ) == value ) ;
        },

        trimStart : function( txt, val ) {
            if( this.startsWith( txt, val ) ==false ) {return txt;};
            return txt.substring( val.length, txt.length );
        },

        trimEnd : function( txt, val ) {
            if( this.isNull( txt ) ) return txt;
            if( !this.endsWith( txt, val ) ) return txt;
            if( txt == val ) return '';
            return txt.substr( 0, txt.length-val.length );
        },

        trimExt : function( txt ){
            var extPosition = txt.search( /\.[^\./]*$/i );
            if( extPosition>=0 ) {return txt.substring(0, extPosition );};
            return txt;
        },

        trimHost : function( txt ) {
            if( this.startsWith( txt, 'http://' ) ==false ) {return txt;};
            var result = this.trimStart( txt, 'http://' );
            var slashIndex = result.indexOf( '/' );
            return result.substring( slashIndex, result.length );
        },

        getExt : function( txt ){
            return txt.replace( this.trimExt(txt), '' );
        },
        getTimePrivate: function (seperator, isMilliseconds) {
            var result = '';
            var d = new Date();
            result += d.getHours() + seperator;
            result += d.getMinutes() + seperator;
            result += d.getSeconds();
            if (isMilliseconds) { result += seperator + d.getMilliseconds(); };
            return result;
        },

        getDayPrivate: function (seperator) {
            var d = new Date();
            var result = '';
            result += d.getFullYear() + seperator;
            result += (d.getMonth() + 1) + seperator;
            result += d.getDate();
            return result;
        },

        getRandom: function () {
            return Math.random() + this.getDayPrivate('') + this.getTimePrivate('', true);
        }
    }

    module.exports = StrUtil;
});