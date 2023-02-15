define(function (require, exports, module) {
    var $ = require('$'),
        String = require('string'),
        Validator = require('./validator')


    var PostForm = Validator.extend({
        attrs: {
            autoSubmit: false,
            autoValidatorItem: true,
            focusValidator: true,
            showMessage: function (message, element) {
                var a = this.getExplain(element).html();
                message = '<i class="ui-tiptext-icon iconfont">&#xF045;</i> <span class="ui-form-explain-text">' + message + '</span>';
                if (this.getExplain(element).html() != message) {
                    this.getExplain(element).removeClass('ui-tiptext-message')
                    .addClass(this.get('ui-tiptext-container-error'))
                    .html(message);

                    this.getItem(element).addClass(this.get('itemErrorClass'));
                }
            },

            hideMessage: function (message, element) {
                if (this.get('autoValidatorItem')) {
                    if (this.get("focusValidator")) {
                        this.getExplain(element)
                        .html('<i class="ui-tiptext-icon iconfont" title="成功"></i>')
                        .removeClass('ui-tiptext-message')
                        .removeClass('ui-tiptext-error')
                        .addClass('ui-tiptext-success');
                        this.getItem(element).removeClass(this.get('itemErrorClass'));
                        //this.getExplain(element).html(element.attr('data-explain') || ' ');
                        //this.getItem(element).removeClass(this.get('itemErrorClass'));
                    }
                    else {
                        this.getExplain(element).html('')
                        .removeClass('ui-tiptext-message')
                        .removeClass('ui-tiptext-error')
                    }
                }
            }
        },
        setup: function () {
            PostForm.superclass.setup.call(this);

            var that = this
            var fsubmit = $(that.element).find("input[type='submit']");
            var fsubmitv = fsubmit.val();

            this.on('autoFocus', function (ele) {
                that.set('autoFocusEle', ele);
            })


            this.on('itemValidated', function (err, message, element, event) {
                var a = this.getItem(element);

                if (event == undefined) {
                    if (err)
                        that.query(element).get('showMessage').call(this, message, element, event);
                    //else
                    //this.getExplain(element).html('');
                }
                else {
                    if (event.type == "focusout") {
                        if (that.get('autoValidatorItem')) {

                            return;
                        }
                        else {

                            this.getExplain(element).html('');
                            this.getItem(element).removeClass(this.get('itemFocusClass')).removeClass(this.get('itemErrorClass'));

                            return;
                        }

                    } else if (event.type == "focusin") {
                        this.getExplain(element).html(message);
                        this.getItem(element).removeClass(this.get('itemErrorClass')).addClass(this.get('itemFocusClass'));
                    }
                }

                //alert(this.getItem(element).html() + "sssssssssss");

            });
            this.on('formValidate', function () {
                fsubmit.val("正在提交...");
                fsubmit.attr('disabled', true);
            });

            this.on('formValidated', function (err, results) {
                if (err) {
                    $.each(results, function (i, args) {
                        var error = args[0],
                            msg = args[1],
                            ele = args[2];
                        //that.getExplain(ele).removeClass('ui-tiptext ui-tiptext-error').html('');
                        if (error) {
                            message = '<i class="ui-tiptext-icon iconfont">&#xF045;</i> <span class="ui-form-explain-text">' + msg + '</span>';
                            that.getExplain(ele).removeClass('ui-tiptext ui-tiptext-success')
                            .removeClass('ui-tiptext ui-tiptext-message')
                            .addClass('ui-tiptext ui-tiptext-error').html(message);

                            fsubmit.val(fsubmitv);
                            fsubmit.attr('disabled', false);

                            if (that.get('autoFocus')) {
                                firstEle = ele;
                            }
                        }
                    });
                }
                else {
                    $(".ui-tiptext-error").removeClass('ui-tiptext ui-tiptext-error').html('');


                    var formValues = $(that.element).serializeArray();

                    $.post($(that.element).attr("action").toAjax(), formValues, function (result) {
                        if (!result.IsValid) {
                            message = '<p class="ui-tiptext ui-tiptext-error"><i class="ui-tiptext-icon iconfont">&#xF045;</i> <span class="ui-form-explain-text">' + result.Msg + '</span></p>';
                            $("#errmsg").removeClass('ui-tiptext-container-uccess')
                            .addClass('ui-tiptext-container-error').html(message);

                            $("#errmsg").fadeIn();

                            fsubmit.val(fsubmitv);
                            fsubmit.attr('disabled', false);

                            setTimeout(function () {
                                $("#errmsg").fadeOut();
                            }, 2000);
                            return false;
                        }
                        else {
                            message = '<p class="ui-tiptext ui-tiptext-success"><i class="ui-tiptext-icon iconfont">&#xF045;</i> <span class="ui-form-explain-text">' + result.Msg + '</span></p>';
                            $("#errmsg").removeClass('ui-tiptext-container-error')
                            .addClass('ui-tiptext-container-success').html(message);

                            $("#errmsg").fadeIn();

                            fsubmit.val("完成");

                            setTimeout(function () {
                                window.location.href = result.ForwardUrl;
                            }, 500);
                            return false;
                        }
                    });
                };


            });

        },

        mouseenter: function (e) {
            //alert("enter");
            //this.getItem(e.target).addClass(this.get('itemHoverClass'));
        },

        mouseleave: function (e) {
            //alert("leave");
            //this.getItem(e.target).removeClass(this.get('itemHoverClass'));
        },

        focus: function (e) {
            var target = e.target,
            autoFocusEle = this.get('autoFocusEle');



            if (target.type != 'submit' && target.type != 'checkbox' && target.type != 'radio') {
                if (this.get("focusValidator")) {
                    this.getItem(target).removeClass(this.get('itemErrorClass'));
                    this.getItem(target).addClass(this.get('itemFocusClass'));
                    this.getExplain(target)
                    .removeClass('ui-tiptext-error')
                    .removeClass('ui-tiptext-success')
                    .addClass('ui-tiptext-message')
                    .html('<i class="ui-tiptext ui-tiptext-icon iconfont" title="提示"></i> <span class="ui-form-explain-text">' + $(target).attr('data-explain') + "</span>");
                }
                else {
                    this.getItem(target).removeClass(this.get('itemErrorClass'));
                    this.getItem(target).addClass(this.get('itemFocusClass'));
                    this.getExplain(target)
                    .removeClass('ui-tiptext-error')
                    .removeClass('ui-tiptext-success')
                    .removeClass('ui-tiptext-message')
                    .html("");
                }
            }

            if (autoFocusEle && autoFocusEle.get(0) == target) {
                var that = this;
                $(target).keyup(function (e) {
                    that.set('autoFocusEle', null);
                    that.focus({ target: target });
                });
                return;
            }
        }
    });

    module.exports = PostForm;
});