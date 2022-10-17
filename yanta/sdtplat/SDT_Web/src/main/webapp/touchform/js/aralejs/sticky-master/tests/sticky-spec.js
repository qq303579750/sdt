define(function (require) {

    //mocha.setup({ignoreLeaks: true});

    var expect = require('expect');
    var $ = require('$');
    var sinon = require('sinon');

    var element = null;
    var setTop = 50;
    var elementTop;
    var elementBottom;
    var timeout = 30;
    var tmp1, tmp2, tmpHeight = 1200;

    var Sticky = require('sticky');


    var isPositionStickySupported = Sticky.isPositionStickySupported,
        isPositionFixedSupported = Sticky.isPositionFixedSupported;

    describe('Sticky.fix', function () {
        beforeEach(function () {
            $('body').css('height', '2000px');
            element = $('<div>test</div>');
            element.appendTo('body');
        });

        afterEach(function () {
            element.remove();
            element = null;
            $('body').css('height', '');
            $(document).off('scroll');
            $(document).scrollTop(0);
        });
        
        it('默认的 top 值', function () {
            var originTop = element.offset().top;
            var obj = Sticky.fix(element);
            expect(obj.position.top).to.be(originTop);
            obj.destroy();
        });

        it('fixed 元素, 滚动 500 像素', function (done) {
            var oldTop = element.offset().top;

            var obj = Sticky.fix(element);

            $(document).scrollTop(500);

            setTimeout(function () {
                expect(element.css('position')).to.be(isPositionFixedSupported ? 'fixed' : 'absolute');
                expect(obj._placeholder.length).to.be(1);                
                expect(element.offset().top).to.be(oldTop + 500);
                done();

                obj.destroy();
            }, timeout);
        });

        it('不需要占位符的 fixed 元素', function (done) {
            element.css("position", "absolute");

            var obj = Sticky.fix(element);
            $(document).scrollTop(500);

            setTimeout(function () {
                expect(obj._placeholder).to.be(undefined);
                done();
                obj.destroy();
            }, timeout);
        });
        
        it('float: left 时', function (done) {
            element.css("float", "left");

            var obj = Sticky.fix(element);
            $(document).scrollTop(500);

            setTimeout(function () {
                expect(obj._placeholder.length).to.be(1);
                done();
                obj.destroy();
            }, timeout);

        });

        it('重复绑定', function (done) {
            var obj1 = Sticky.fix(element);

            var obj2 = Sticky.fix(element);

            $(document).scrollTop(500);

            setTimeout(function () {
                expect(element.data("bind-sticked")).to.be(true);
                expect(obj2.adjust).to.be(undefined);
                done();

                obj1.destroy();
            }, timeout);
        });
    });

    describe('Sticky.stick', function () {
        beforeEach(function () {
            tmp1 = $('<div style="border: 1px dashed red;"></div>').height(1200).prependTo("body");
            element = $('<div>test</div>');
            element.appendTo('body');
            elementTop = element.offset().top - setTop;
            elementBottom = element.offset().top + element.height() - $(window).height() + setTop;
            tmp2 = $('<div style="border: 1px dashed red;"></div>').height(1200).appendTo("body");
        });

        afterEach(function () {
            tmp1.remove();
            tmp2.remove();
            element.remove();
            element = null;
            $('body').css('height', '');
            $(document).off('scroll');
            $(document).scrollTop(0);
        });
        
        it('返回实例对象', function () {
            var obj = Sticky.stick(element, setTop);
            expect(obj.destroy).to.be.a('function');
        });
        
        it('同一个接口', function () {
            expect(Sticky).to.be.a('function');
            expect(Sticky).to.be(Sticky.stick);
        });
        
        it('默认的 top 值', function () {
            var obj = Sticky.stick(element);
            expect(obj.position.top).to.be(0);
        });
        
        it('destroy 方法', function () {
            var obj = Sticky.stick(element);
            expect(element.data('bind-sticked')).to.be(true);
            obj.destroy();
            expect(element.data('bind-sticked')).to.be(false);
        });

        it('滚动了一像素', function (done) {
            var originPosition = element.css('position');
            var obj = Sticky.stick(element, setTop);
            $(document).scrollTop(1);

            setTimeout(function () {
                if (isPositionStickySupported) {
                    expect(element.css('position').indexOf("sticky") !== -1).to.be(true);
                } else {
                    expect(element.css('position')).to.be(originPosition);
                }
                done();
                obj.destroy();
            }, timeout);
        });

        it('滚动到差一像素', function (done) {
            var originPosition = element.css('position');
            var obj = Sticky.stick(element, setTop);
            $(document).scrollTop(elementTop - 1);

            setTimeout(function () {
                if (isPositionStickySupported) {
                    expect(element.css('position').indexOf("sticky") !== -1).to.be(true);
                } else {
                    expect(element.css('position')).to.be(originPosition);
                }
                done();
                obj.destroy();
            }, timeout);
        });

        it('滚动到元素临界位置', function (done) {
            var obj = Sticky.stick(element, setTop);
            $(document).scrollTop(elementTop);

            setTimeout(function () {
                if (isPositionStickySupported) {
                    expect(element.css('position').indexOf("sticky") !== -1).to.be(true);
                } else if (isPositionFixedSupported) {
                    expect(element.css('position')).to.be("fixed");
                } else {
                    expect(element.css('position')).to.be("absolute");
                }
                done();
                obj.destroy();
            }, timeout);
        });

        it('滚动到元素临界位置多一像素', function (done) {
            var obj = Sticky.stick(element, setTop);
            $(document).scrollTop(elementTop + 1);

            setTimeout(function () {
                if (isPositionStickySupported) {
                    expect(element.css('position').indexOf("sticky") !== -1).to.be(true);
                } else if (isPositionFixedSupported) {
                    expect(element.css('position')).to.be("fixed");
                } else {
                    expect(element.css('position')).to.be("absolute");
                }
                done();
                obj.destroy();
            }, timeout);

        });

        it('滚动到元素临界位置多300像素', function (done) {
            var obj = Sticky.stick(element, setTop);
            $(document).scrollTop(elementTop + 300);

            setTimeout(function () {
                if (isPositionStickySupported) {
                    expect(element.css('position').indexOf("sticky") !== -1).to.be(true);
                } else if (isPositionFixedSupported) {
                    expect(element.css('position')).to.be("fixed");
                } else {
                    expect(element.css('position')).to.be("absolute");
                }
                done();
                obj.destroy();
            }, timeout);
        });

        it('不可见元素', function (done) {
            var obj = Sticky.stick(element, setTop);
            element.hide();            
            $(document).scrollTop(elementTop + 300);

            setTimeout(function () {
                expect(element.css('position').indexOf("sticky") !== -1 || element.css('position') === "static").to.be(true);
                done();
                element.show();
                obj.destroy();
            }, timeout);
        });

        it('非块级元素，不加占位元素，以减少复杂性', function (done) {
            element.css('display', 'inline')
            var obj = Sticky.stick(element, setTop);
            $(document).scrollTop(elementTop + 300);

            setTimeout(function () {
                expect(obj._placeholder).to.be(undefined);
                done();
                obj.destroy();
            }, timeout);
        });

        it('stick 回调', function (done) {
            var triggered = 0;

            var obj = Sticky.stick(element, setTop, function(status) {
                if (status) {
                    triggered = 1;
                } else {
                    triggered = 2;
                }
            });

            $(document).scrollTop(elementTop);

            setTimeout(function () {
                expect(triggered).to.be(1);
                $(document).scrollTop(0);

                setTimeout(function () {
                    expect(triggered).to.be(2);
                    done();
                    obj.destroy();
                }, timeout);
            }, timeout);
        });

        it('重复绑定', function (done) {
            var triggered = 0;

            var obj1 = Sticky.stick(element, setTop, function(status) {
                if (status) {
                    triggered = 1;
                } else {
                    triggered = 2;
                }
            });
            var obj2 = Sticky.stick(element, setTop, function(status) {
                if (status) {
                    triggered = 3;
                } else {
                    triggered = 4;
                }
            });

            $(document).scrollTop(elementTop);

            setTimeout(function () {
                expect(triggered).to.be(1);

                done();

                obj1.destroy();
            }, timeout);
        });

        it("不支持 position: sticky 的情况", function(done) {
            Sticky.isPositionStickySupported = false;

            var obj = Sticky.stick(element, setTop);
            $(document).scrollTop(elementTop + 300);

            setTimeout(function () {
                expect(element.css('position')).to.be(isPositionFixedSupported ? 'fixed' : 'absolute');
                done();
                obj.destroy();
            }, timeout);
        });

        it("强制支持 position: sticky 的情况", function(done) {
            Sticky.isPositionStickySupported = true;

            var obj = Sticky.stick(element, setTop);
            $(document).scrollTop(elementTop + 300);

            setTimeout(function () {
                expect(element.css('position').indexOf("sticky") !== -1 || element.css('position') === "static").to.be(true);
                $(document).scrollTop(0);

                setTimeout(function() {
                    expect(element.css('position').indexOf("sticky") !== -1 || element.css('position') === "static").to.be(true);
                    done();
                    obj.destroy();
                }, timeout);
            }, timeout);
        });

        it("不支持 position: sticky 且不支持 position: fixed 的情况", function(done) {
            Sticky.isPositionStickySupported = false;

            Sticky.isPositionFixedSupported = false;

            var obj = Sticky.stick(element, setTop);
            $(document).scrollTop(elementTop + 300);

            setTimeout(function () {
                expect(element.css('position')).to.be('absolute');
                $(document).scrollTop(0);

                setTimeout(function () {
                    expect(element.css('position') === "static").to.be(true);

                    done();
                    obj.destroy();

                }, timeout);
            }, timeout);
        });

        it('手工调用 adjust', function (done) {
            var triggered = 0;

            var obj = Sticky.stick(element, setTop, function(status) {
                if (status) {
                    triggered = 1;
                } else {
                    triggered = 2;
                }
            });

            $(document).scrollTop(elementTop);

            setTimeout(function () {
                expect(triggered).to.be(1);

                tmp1.css('height', tmpHeight + 200);
                obj.adjust();
                expect(triggered).to.be(2);
                $(document).scrollTop(elementTop + 200);

                setTimeout(function () {
                    expect(triggered).to.be(1);
                    done();
                    obj.destroy();
                }, timeout);
            }, timeout);
        });

        it('set top and bottom', function(done) {
            var triggered = 0;

            var obj = Sticky.stick(element, {
                top: setTop,
                bottom: setTop
            }, function(status) {
                if (status) {
                    triggered = 1;
                } else {
                    triggered = 2;
                }
            });
            $(document).scrollTop(elementTop);

            setTimeout(function() {
                expect(triggered).to.be(1);

                $(document).scrollTop(elementBottom + 1);
                setTimeout(function() {
                    expect(triggered).to.be(2);

                    $(document).scrollTop(elementBottom);
                    setTimeout(function() {
                        expect(triggered).to.be(1);
                        done();
                        obj.destroy();
                    }, timeout);
                }, timeout);
            }, timeout);
        });

        it('window resize', function(done) {
            var obj = Sticky.stick(element, setTop);
            $(document).scrollTop(elementTop);
            $(window).resize();

            setTimeout(function() {
                done();
            }, 200);
        });
    });
});

