define(function (require, exports, module) {

    var $ = require('$')
    Widget = require('widget')
    Dnd = require('dnd')
    String = require('string')

    var Filter = null;

    var Slider = Widget.extend({
        attrs: {
            template: "<div class=\"slider-info ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all\">"
                + "<div class=\"ui-slider-range ui-widget-header\"></div>"
                + "<a id=\"minBut\" class=\"ui-slider-handle ui-state-default ui-corner-all\" href=\"#\"></a>"
                + "<a id=\"maxBut\" class=\"ui-slider-handle ui-state-default ui-corner-all\" href=\"#\"></a>"
                + "</div>",
            parentBox: null,
            range: null,
            minBut: null,
            maxBut: null,
            name: "",
            val_min: 0, val_max: 0, min: 0, max: 0, width: 0, scale: 0,
            kedu1: null, kedu2: null, kedu3: null, kedu4: null
        },

        parseElement: function () {
            Slider.superclass.parseElement.call(this);

            this.set("parentBox", $("#" + this.get("name")));

            var parentb = $(this.get("parentBox"));
            var min = $(this.get("parentBox")).find(".min");

            this.set('scale', this.get('width') / (this.get('max') - this.get('min')));
            this.element.css("width", this.get('width') + 14);
            this.element.attr("id", this.cid);

            this.set("val_min", $(this.get("parentBox")).find(".min").val(), { silent: true });
            this.set("val_max", $(this.get("parentBox")).find(".max").val(), { silent: true });

            var eoffsetLeft = this.element[0].offsetLeft;

            this.set('kedu1', $("<span class=\"slider-ruler-handle\">" + this.get('min') + "</span>"));
            this.set('kedu2', $("<span class=\"slider-ruler-handle\">" + this.get('max') + "</span>"));
            this.set('kedu3', $("<span class=\"slider-ruler-handle\">" + this.get('val_min') + "</span>"));
            this.set('kedu4', $("<span class=\"slider-ruler-handle\">" + this.get('val_max') + "</span>"));

            var rang_left = (this.get('val_min') - this.get('min')) * this.get('scale');
            var rang_width = (this.get('val_max') - this.get('val_min')) * this.get('scale')

            var r = $(this.element.find(".ui-slider-range"));

            this.set('range', $(this.element.find(".ui-slider-range")));
            this.set('minBut', $(this.element.find("#minBut")));
            this.set('maxBut', $(this.element.find("#maxBut")));

            this.get('range').css("left", rang_left + 7);
            this.get('range').css("width", rang_width);

            this.get('minBut').css("left", rang_left + 7);
            this.get('maxBut').css("left", rang_left + 7 + rang_width);

            this.get('kedu2').css("left", this.get("width"));
            this.get('kedu3').css("left", rang_left);
            this.get('kedu4').css("left", rang_left + rang_width);

            $(this.get("parentBox")).find(".box").append(this.element);
            $(this.get("parentBox")).find(".kedu_down").append(this.get('kedu1'));
            $(this.get("parentBox")).find(".kedu_down").append(this.get('kedu2'));
            $(this.get("parentBox")).find(".kedu_up").append(this.get('kedu3'));
            $(this.get("parentBox")).find(".kedu_up").append(this.get('kedu4'));
        },

        _onChangeVal_min: function (val) {
            this.get("parentBox").find(".min").val(val);
            Filter.filterResult();
        },

        _onChangeVal_max: function (val) {
            this.get("parentBox").find(".max").val(val);
            Filter.filterResult();
        },

        setup: function () {
            var that = this;
            var mindnd = new Dnd(this.get('minBut'), { containment: "#" + this.cid, axis: 'x' });
            var maxdnd = new Dnd(this.get('maxBut'), { containment: "#" + this.cid, axis: 'x' });
            var roundminleft, roundmaxleft;

            mindnd.on('drag', function (dragging, dropping) {


                if (dragging[0].offsetLeft >= that.get('maxBut')[0].offsetLeft) {
                    dragging.css("left", that.get('maxBut')[0].offsetLeft);
                }

                roundminleft = Math.round((dragging[0].offsetLeft + 1) / that.get('scale') + that.get('min'));

                that.get("parentBox").find(".min").val(roundminleft);

                that.get('range').css("left", dragging[0].offsetLeft + 1)
                that.get('kedu3').css("left", dragging[0].offsetLeft + 1)
                that.get('kedu3').html(roundminleft)
                that.get('range').css("width", that.get('maxBut')[0].offsetLeft - dragging[0].offsetLeft);

            })

            mindnd.on('dragend', function (dragging, dropping) {

                //this.get("Filter").filterResult();
                that.set("val_min", roundminleft);
                dragging.animate({ left: (roundminleft - that.get('min')) * that.get('scale') + 8, top: -7 });
                that.get('range').animate({ left: (roundminleft - that.get('min')) * that.get('scale') + 1, width: that.get('maxBut')[0].offsetLeft - (roundminleft - that.get('min')) * that.get('scale') });
                that.get('kedu3').animate({ left: (roundminleft - that.get('min')) * that.get('scale') + 1 });
            })

            maxdnd.on('drag', function (dragging, dropping) {

                if (dragging[0].offsetLeft <= that.get('minBut')[0].offsetLeft) {
                    dragging.css("left", that.get('minBut')[0].offsetLeft);
                }

                roundmaxleft = Math.round((dragging[0].offsetLeft + 1) / that.get('scale') + that.get('min'));


                //$("#" + that.get("name") + "_max").val(dragging[0].offsetLeft + 1);
                that.get('range').css("width", dragging[0].offsetLeft - that.get('minBut')[0].offsetLeft);
                that.get('kedu4').css("left", dragging[0].offsetLeft + 1)
                that.get('kedu4').html(roundmaxleft)
                that.get("parentBox").find(".max").val(roundmaxleft);
            })

            maxdnd.on('dragend', function (dragging, dropping) {
                //Filter.filterResult();
                that.set("val_max", roundmaxleft);
                dragging.animate({ left: (roundmaxleft - that.get('min')) * that.get('scale') + 8, top: -7 });
                that.get('range').animate({ width: (roundmaxleft - that.get('min')) * that.get('scale') - that.get('minBut')[0].offsetLeft });
                that.get('kedu4').animate({ left: (roundmaxleft - that.get('min')) * that.get('scale') + 1 });
            })

            Slider.superclass.setup.call(this);

        },

        setFilter: function (filter) {
            Filter = filter;
        },

        setVal: function (v_min, v_max) {
            var that = this;
            that.set("val_min", v_min, { silent: true });
            that.get("parentBox").find(".min").val(v_min);
            that.set("val_max", v_max, { silent: true });
            that.get("parentBox").find(".max").val(v_max);

            var minButLeft = (v_min - that.get('min')) * that.get('scale') + 8;
            var maxButLeft = (v_max - that.get('min')) * that.get('scale') + 8;
            var rangeWidth = maxButLeft - minButLeft;


            that.get('minBut').animate({ left: minButLeft, top: -7 });
            that.get('maxBut').animate({ left: maxButLeft, top: -7 });
            that.get('range').animate({ left: minButLeft, width: rangeWidth });
            that.get('kedu3').animate({ left: minButLeft - 8 });
            that.get('kedu3').html(v_min);
            that.get('kedu4').animate({ left: maxButLeft - 8 });
            that.get('kedu4').html(v_max);

        }

    });

    module.exports = Slider;

});