﻿define(function (require, exports, module) {

    var utils = require('./utils.js')

    function Listener() { }

    Listener.prototype = {
        /**
        * 注册事件监听器
        * @name addListener
        * @grammar editor.addListener(types,fn)  //types为事件名称，多个可用空格分隔
        * @example
        * editor.addListener('selectionchange',function(){
        *      console.log("选区已经变化！");
        * })
        * editor.addListener('beforegetcontent aftergetcontent',function(type){
        *         if(type == 'beforegetcontent'){
        *             //do something
        *         }else{
        *             //do something
        *         }
        *         console.log(this.getContent) // this是注册的事件的编辑器实例
        * })
        */
        addListener: function (types, listener) {
            types = utils.trim(types).split(' ');
            for (var i = 0, ti; ti = types[i++]; ) {
                getListener(this, ti, true).push(listener);
            }
        },
        /**
        * 移除事件监听器
        * @name removeListener
        * @grammar editor.removeListener(types,fn)  //types为事件名称，多个可用空格分隔
        * @example
        * //changeCallback为方法体
        * editor.removeListener("selectionchange",changeCallback);
        */
        removeListener: function (types, listener) {
            types = utils.trim(types).split(' ');
            for (var i = 0, ti; ti = types[i++]; ) {
                utils.removeItem(getListener(this, ti) || [], listener);
            }
        },
        /**
        * 触发事件
        * @name fireEvent
        * @grammar editor.fireEvent(types)  //types为事件名称，多个可用空格分隔
        * @example
        * editor.fireEvent("selectionchange");
        */
        fireEvent: function (types) {
            types = utils.trim(types).split(' ');
            for (var i = 0, ti; ti = types[i++]; ) {
                var listeners = getListener(this, ti),
                r, t, k;
                if (listeners) {
                    k = listeners.length;
                    while (k--) {
                        if (!listeners[k]) continue;
                        t = listeners[k].apply(this, arguments);
                        if (t === true) {
                            return t;
                        }
                        if (t !== undefined) {
                            r = t;
                        }
                    }
                }
                if (t = this['on' + ti.toLowerCase()]) {
                    r = t.apply(this, arguments);
                }
            }
            return r;
        }
    };

    return Listener

    function getListener(obj, type, force) {
        var allListeners;
        type = type.toLowerCase();
        return ((allListeners = (obj.__allListeners || force && (obj.__allListeners = {})))
        && (allListeners[type] || force && (allListeners[type] = [])));
    }
})