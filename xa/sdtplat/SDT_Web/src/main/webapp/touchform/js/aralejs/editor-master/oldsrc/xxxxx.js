define(function (require, exports, module) {
    var Base = require('base')
    var $ = require('$')
    var Detector = require('detector')
    var Range = require('./range.js')
    var Dom = require('./dom.js')

    var ie = Detector.browser.ie

    var Selection2 = Base.extend({
        document: null,
        iframe: null,
        range: null,
        _bakIERange: null,

        initialize: function (config) {
            this.document = config.document;
            this.parseIERange();

        },
        parseIERange: function () {
            var selection = this;
            if (ie) {
                selection.iframe = Dom.utils.getWindow(selection.document).frameElement;

                selection.on('beforedeactivate', selection.iframe, function () {
                    selection._bakIERange = selection.getIERange();
                })

                selection.on('activate', selection.iframe, function () {
                    try {
                        if (!_getIERange(selection) && selection._bakIERange) {
                            selection._bakIERange.select();
                        }
                    } catch (ex) {
                    }
                    selection._bakIERange = null;

                });

                selection.iframe = null;
            }
        },
        /**
        * 获取原生seleciton对象
        * @public
        * @function
        * @name    baidu.editor.dom.Selection.getNative
        * @return {Selection}    获得selection对象
        */
        getNative: function () {
            var doc = this.document;
            try {
                return !doc ? null : ie ? doc.selection : domUtils.getWindow(doc).getSelection();
            } catch (e) {
                return null;
            }
        },
        getIERange: function () {
            var ieRange = _getIERange(this);
            if (!ieRange) {
                if (this._bakIERange) {
                    return this._bakIERange;
                }
            }
            return ieRange;
        },

        getRange: function () {
            var selection = this;
            selection.range = Range.initialize(this.document);

            function optimze(range) {
                var child = selection.document.body.firstChild,
                    collapsed = range.collapsed;
                while (child && child.firstChild) {
                    range.setStart(child, 0);
                    child = child.firstChild;
                }
                if (!range.startContainer) {
                    range.setStart(selection.document.body, 0)
                }
                if (collapsed) {
                    range.collapse(true);
                }
            }

            if (ie) {
                var nativeRange = this.getIERange();
                if (nativeRange) {
                    //备份的_bakIERange可能已经实效了，dom树发生了变化比如从源码模式切回来，所以try一下，实效就放到body开始位置
                    try {
                        transformIERangeToRange(nativeRange, selection.range);
                    } catch (e) {
                        optimze(selection.range);
                    }

                } else {
                    optimze(selection.range);
                }
            }
        }
    })

    module.exports = Selection2;



    function getBoundaryInformation(range, start) {

    }

    /**
    * 将ieRange转换为Range对象
    * @param {Range}   ieRange    ieRange对象
    * @param {Range}   range      Range对象
    * @return  {Range}  range       返回转换后的Range对象
    */
    function transformIERangeToRange(ieRange, range) {
        if (ieRange.item) {
            range.selectNode(ieRange.item(0));
        } else {
            var bi = getBoundaryInformation(ieRange, true);
            range.setStart(bi.container, bi.offset);
            if (ieRange.compareEndPoints('StartToEnd', ieRange) != 0) {
                bi = getBoundaryInformation(ieRange, false);
                range.setEnd(bi.container, bi.offset);
            }
        }
        return range;
    }

    /**
    * 获得ieRange
    * @param {Selection} sel    Selection对象
    * @return {ieRange}    得到ieRange
    */
    function _getIERange(sel) {
        var ieRange;
        //ie下有可能报错
        try {
            ieRange = sel.getNative().createRange();
        } catch (e) {
            return null;
        }
        var el = ieRange.item ? ieRange.item(0) : ieRange.parentElement();
        if ((el.ownerDocument || el) === sel.document) {
            return ieRange;
        }
        return null;
    }
});