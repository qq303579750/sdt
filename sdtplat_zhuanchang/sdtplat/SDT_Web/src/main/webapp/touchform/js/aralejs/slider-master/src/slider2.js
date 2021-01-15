define(function (require, exports, module) {

    var $ = require('$');
    var Base = require('base');
    var Dnd = require('dnd');

    var Slider = Base.extend({
        sliderid: "",
        slider_box: null, slider_range: null,
        slider_min: 0, slider_max: 0, slider_widht: 0, slider_scale: 0,

        slider_val1: null, slider_val2: null,
        slider_range_left: 0, slider_range_width: 0,

        initialize: function (config) {
            this.sliderid = config.sliderid;
            this.parseSlider(config.slidermin, config.slidermax, config.sliderrangewidth);
            this.parseSliderRange();
            this.parseSliderMinBut();
        },

        //<div style="left: 15%; width: 45%;" class="ui-slider-range ui-widget-header"></div>

        parseSlider: function (slidermin, slidermax, sliderwidth) {
            this.slider_min = slidermin;
            this.slider_max = slidermax;
            this.slider_width = sliderwidth;
            this.slider_scale = sliderwidth / (this.slider_max - this.slider_min);

            this.slider_box = $("#" + this.sliderid + "_box");
            this.slider_box.css("width", sliderwidth + 14);
            this.slider_box.addClass("ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all");
        },

        parseSliderRange: function () {

            this.slider_range = $("<div class=\"ui-slider-range ui-widget-header\"></div>")

            this.slider_range.appendTo(this.slider_box);
            this.resetRange();

        },

        parseSliderMinBut: function () {
            var that = this;
            var minBut = $("<a id=\"minBut\" class=\"ui-slider-handle ui-state-default ui-corner-all\" href=\"#\"></a>");
            var maxBut = $("<a id=\"maxBut\" class=\"ui-slider-handle ui-state-default ui-corner-all\" href=\"#\"></a>");
            minBut.css("left", this.slider_range_left+7);
            maxBut.css("left", this.slider_range_left + 7 + this.slider_range_width);
            minBut.appendTo(this.slider_box);
            maxBut.appendTo(this.slider_box);

            var mindnd = new Dnd('#minBut', { containment: "#" + this.sliderid + "_box", axis: 'x' });

            var maxdnd = new Dnd('#maxBut', { containment: "#" + this.sliderid + "_box", axis: 'x' });

            mindnd.on('drag', function (dragging, dropping) {
                

                if (dragging[0].offsetLeft >= maxBut[0].offsetLeft) {
                    dragging.css("left", maxBut[0].offsetLeft);
                }

                that.slider_val1.val((dragging[0].offsetLeft + 1) / that.slider_scale);

                that.slider_range.css("left", dragging[0].offsetLeft + 8)
                that.slider_range.css("width", maxBut[0].offsetLeft - dragging[0].offsetLeft);

            })

            maxdnd.on('drag', function (dragging, dropping) {

                if (dragging[0].offsetLeft <= minBut[0].offsetLeft) {
                    dragging.css("left", minBut[0].offsetLeft);
                }
                that.slider_val2.val((dragging[0].offsetLeft + 1) / that.slider_scale);
                that.slider_range.css("width", dragging[0].offsetLeft - minBut[0].offsetLeft);
            })



        },

        resetRange: function () {
            this.slider_val1 = $("#" + this.sliderid + "_min");
            this.slider_val2 = $("#" + this.sliderid + "_max");

            this.slider_range_left = ((this.slider_val1.val() * this.slider_scale) / (this.slider_max - this.slider_min)) * 100;
            this.slider_range_width = (((this.slider_val2.val() - this.slider_val1.val()) * this.slider_scale) / (this.slider_max - this.slider_min)) * 100;

            this.slider_range.css("left", this.slider_range_left + 7);
            this.slider_range.css("width", this.slider_range_width)
        }

    });

    module.exports = Slider;
})