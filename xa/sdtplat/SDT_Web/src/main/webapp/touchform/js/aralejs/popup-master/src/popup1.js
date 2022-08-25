define(function (require, exports, module) {

    var $ = require('$');
    var Overlay = require('overlay');
    var Templatable = require('templatable');


    // Popup 是可触发 Overlay 型 UI 组件
    var Popup = Overlay.extend({
        Implements: Templatable,
        attrs: {
            // 触发元素
            trigger: {
                value: null, // required
                getter: function (val) {
                    return $(val);
                }
            },
            // 触发类型
            triggerType: 'hover', // or click or focus
            content: "默认内容",
            // 默认的定位参数
            align: {
                baseXY: [0, '100%'],
                selfXY: [0, 0]
            },
            // 是否能够触发
            // 可以通过set('disabled', true)关闭
            disabled: false
        },
        parseElement: function () {
            Popup.superclass.parseElement.call(this);
            this.set('contentElement', this.$('[data-role=content]'));
        },

        setup: function () {
            Popup.superclass.setup.call(this);
            this._bindTrigger();
            this._blurHide([this.get('trigger')]);
        },

        show: function () {
            // 若从未渲染，则调用 render
            (!this.rendered) && this.render();
            this.set('visible', true);

            var align = this.get('align');
            align.baseElement = this.activeTrigger;
            this.set('align', align);
        },

        toggle: function () {
            if (this.get('disabled')) {
                return;
            }
            this[this.get('visible') ? 'hide' : 'show']();
        },

        reload: function (content) {
            this.set("content", content);
            this.content = content;
            if (this._contentFunction) {
                this.get('contentElement').html(this._contentFunction.call(this));
            }
        },

        _onRenderContent: function (val) {
            if ($.isFunction(val)) {
                this._contentFunction = val;
            }
            else {
                this._contentFunction = null;
                this.get('contentElement').html(val);
            }
        },

        _bindTrigger: function () {
            var trigger = this.get('trigger');
            var triggerType = this.get('triggerType');

            // 延迟触发和隐藏时间
            var delay = 100;

            var showTimer, hideTimer;
            var that = this;

            if (triggerType === 'click') {
                trigger.on(triggerType, function (e) {
                    e.preventDefault();

                    // 标识当前点击的元素
                    that.activeTrigger = $(this);
                    that.toggle();
                });
            }
            else if (triggerType === 'focus') {
                trigger.on('focus blur', function () {
                    // 标识当前点击的元素
                    that.activeTrigger = $(this);
                    that.toggle();
                });
            }
            // 默认是 hover
            else {
                trigger.hover(function () {
                    clearTimeout(hideTimer);

                    if (!that.get('visible')) {
                        // 标识当前点击的元素
                        that.activeTrigger = $(this);
                        showTimer = setTimeout(function () {
                            that.toggle();
                        }, delay);
                    }
                }, leaveHandler);

                // 鼠标在悬浮层上时不消失
                this.element.hover(function () {
                    clearTimeout(hideTimer);
                }, leaveHandler);
            }

            function leaveHandler() {
                clearTimeout(showTimer);

                if (that.get('visible')) {
                    hideTimer = setTimeout(function () {
                        that.toggle();
                    }, delay);
                }
            }
        }

    });

    module.exports = Popup;

    Popup.DropDown = function (trigger) {
        var triggerRegion = $(trigger);
        var trigger = triggerRegion.find(":first");
        var element = triggerRegion.find("." + trigger.attr("data-target"))

        var popupdown = new Popup({
            trigger: trigger,
            triggerType: trigger.attr("action"),
            element: element
        });

        var selfX = 0;
        var selfY = 0;
        var baseX = 0;
        var baseY = "100%";

        var triggerLeft = trigger.offset().left;
        var b = $(window).height();
        var triggerRight = $(window).width() - (triggerLeft + trigger.innerWidth());
        var triggerTop = trigger.offset().top - $(window).scrollTop();
        var triggerBottom = $(window).height() - (triggerTop + trigger.innerHeight());
        if (triggerLeft > triggerRight) {
            selfX = '100%';
            baseX = '100%';
        }
        if (triggerTop > triggerBottom) {
            selfY = '100%';
            baseY = '0';
        }

        popupdown.before('show', function () {
            trigger.addClass("action");
        })

        popupdown.after('show', function () {
            trigger.css("z-index", 1010);
            element.css("z-index", 1005);
            popupdown.set("align", { selfXY: [selfX, selfY + 1], baseXY: [baseX, baseY] });
        });

        popupdown.after('hide', function () {
            if (typeof (this.blurOverlays) != "undefined")
            { alert("haha"); }
            trigger.removeClass('action');
            trigger.css("z-index", 1000)
        });
    }

    Popup.Down = function (trigger) {
        var triggerRegion = $(trigger);
        var trigger = triggerRegion.find("a");
        var baseOffset = trigger.offset();
        var mycontent = "";

        var popupdown = new Popup({
            trigger: trigger,
            triggerType: trigger.attr("action"),
            template: require('./popup.tpl'),
            model: {
                content: "Loading..."
            }
        });

        var selfX = 0;
        var selfY = 0;
        var baseX = 0;
        var baseY = "100%";

        var triggerLeft = trigger.offset().left;
        var b = $(window).height();
        var triggerRight = $(window).width() - (triggerLeft + trigger.innerWidth());
        var triggerTop = trigger.offset().top - $(window).scrollTop();
        var triggerBottom = $(window).height() - (triggerTop + trigger.innerHeight());
        if (triggerLeft > triggerRight) {
            selfX = '100%';
            baseX = '100%';
        }
        if (triggerTop > triggerBottom) {
            selfY = '100%';
            baseY = '0';
        }
        popupdown.before('show', function () { trigger.addClass("action") })
        popupdown.after('show', function () {
            $.post(trigger.attr("href").toAjax(), function (data) {
                popupdown.reload(data);
                if (trigger.attr("position") == "fixed") {
                    popupdown.element.css("position", trigger.attr("position"));
                    var z1 = trigger.css("z-index") - 1;
                    popupdown.element.css("z-index", trigger.css("z-index") - 1);
                    var z2 = popupdown.element.css("z-index");
                    if (selfX == 0) { baseX = triggerLeft } else { baseX = triggerLeft + trigger.innerWidth() + 2 };
                    if (selfY == 0) { baseY = triggerTop + trigger.innerHeight() } else { baseY = triggerTop };
                    popupdown.set("align", { selfXY: [selfX, selfY + 1], baseXY: [baseX, baseY] });
                }
                else {
                    //var z1 = trigger.css("z-index") - 1;
                    triggerRegion.css("z-index", 1010)
                    popupdown.element.css("z-index", 1005);
                    popupdown.set("align", { selfXY: [selfX, selfY + 1], baseXY: [baseX, baseY] });
                }
            });
        });
        popupdown.after('hide', function () {
            trigger.removeClass('action');
            triggerRegion.css("z-index", 1000)
        });
    }

});
