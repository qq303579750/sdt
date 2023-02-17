define("arale/calendar/0.8.5/calendar",["$","gallery/moment/2.0.0/moment","arale/overlay/1.0.1/overlay","arale/position/1.0.0/position","arale/iframe-shim/1.0.1/iframe-shim","arale/widget/1.0.3/widget","arale/base/1.0.1/base","arale/class/1.0.0/class","arale/events/1.0.0/events","arale/widget/1.0.3/templatable","gallery/handlebars/1.0.0/handlebars","./calendar-tpl","./model"],function(e,a,t){function n(e,a){for(var t,n=a.get("mode"),r=["date","month","year"],l=0;r.length>l;l++)n[r[l]]&&(t=r[l]);if(t){var i="[data-value="+a.get(t).current.value+"]";e.find(".focused-element").removeClass("focused-element"),e.find(i).addClass("focused-element")}}var r=e("$"),l=e("gallery/moment/2.0.0/moment"),i=e("arale/overlay/1.0.1/overlay"),o=e("arale/widget/1.0.3/templatable"),s="i18n!lang",h=e(s)||{},c=e("./calendar-tpl"),d=e("./model"),u={trigger:null,triggerType:"click",format:"YYYY-MM-DD",output:{value:"",getter:function(e){return e=e?e:this.get("trigger"),r(e)}},align:{getter:function(){var e=this.get("trigger");return e?{selfXY:[0,0],baseElement:e,baseXY:[0,r(e).height()+10]}:{selfXY:[0,0],baseXY:[0,0]}}},startDay:"Sun",showTime:!1,hideOnSelect:!0,focus:{value:"",getter:function(e){return e=e?e:r(this.get("trigger")).val(),e?l(e,this.get("format")):l()}},range:null,template:c,model:{getter:function(){if(!this.hasOwnProperty("model")){var e={focus:this.get("focus"),range:this.get("range"),showTime:this.get("showTime"),startDay:this.get("startDay")};this.model=new d(e)}return this.model}}},m=i.extend({Implements:[o],attrs:u,events:{"click [data-role=mode-year]":"_changeMode","click [data-role=prev-year]":"prevYear","click [data-role=next-year]":"nextYear","click [data-role=mode-month]":"_changeMode","click [data-role=prev-month]":"prevMonth","click [data-role=next-month]":"nextMonth","click [data-role=previous-10-year]":"_selectYear","click [data-role=next-10-year]":"_selectYear","click [data-role=year]":"_selectYear","click [data-role=month]":"_selectMonth","click [data-role=day]":"_selectDay","click [data-role=date]":"_selectDate","click [data-role=today]":"_selectToday"},templateHelpers:{_:function(e){return h[e]||e}},setup:function(){m.superclass.setup.call(this);var e=this,a=r(this.get("trigger"));a.on(this.get("triggerType"),function(){e.show(),n(e.element,e.model)}),a.on("keydown",function(a){e._keyControl(a)}),a.on("blur",function(){e.hide()}),e.element.on("mousedown",function(e){if(r.browser.msie&&9>parseInt(r.browser.version,10)){var t=a[0];t.onbeforedeactivate=function(){window.event.returnValue=!1,t.onbeforedeactivate=null}}e.preventDefault()});var t=this.model;t.on("changeStartday changeMode",function(){e.renderPartial("[data-role=data-container]"),e.renderPartial("[data-role=pannel-container]"),e.renderPartial("[data-role=month-year-container]"),n(e.element,e.model)}),t.on("changeMonth changeYear",function(){var a=t.get("mode");(a.date||a.year)&&e.renderPartial("[data-role=data-container]"),e.renderPartial("[data-role=month-year-container]"),n(e.element,e.model)}),t.on("changeRange",function(){e.renderPartial("[data-role=data-container]")}),t.on("refresh",function(){n(e.element,e.model)})},show:function(){m.superclass.show.call(this);var e=this.get("output"),a=e.val();a&&this.setFocus(l(a,this.get("format")))},range:function(e){this.model.changeRange(e)},prevYear:function(){this.model.changeYear(-1)},nextYear:function(){this.model.changeYear(1)},prevMonth:function(){this.model.changeMonth(-1)},nextMonth:function(){this.model.changeMonth(1)},setFocus:function(e){this.model.selectDate(e),this.model.changeMode("date"),n(this.element,this.model)},_selectYear:function(e){var a=r(e.target);"year"===a.data("role")?this.model.changeMode("date",{year:a.data("value")}):this.model.changeMode("year",{year:a.data("value")})},_selectMonth:function(e){var a=r(e.target);this.model.changeMode("date",{month:a.data("value")})},_selectDay:function(e){var a=r(e.target);this.model.changeStartDay(a.data("value"))},_selectDate:function(e){var a=r(e.target),t=this.model.selectDate(a.data("value"));this._fillDate(t)},_selectToday:function(){var e=l().format("YYYY-MM-DD"),a=this.model.selectDate(e);this._fillDate(a)},_changeMode:function(e){var a=r(e.target).data("role").substring(5);this.model.changeMode(a)},_keyControl:function(e){var a={68:"date",77:"month",89:"year"};if(e.keyCode in a)return this.model.changeMode(a[e.keyCode]),e.preventDefault(),!1;var t={13:"enter",27:"esc",37:"left",38:"up",39:"right",40:"down"};if(e.keyCode in t){e.preventDefault();var n=t[e.keyCode],r=this.model.get("mode");e.shiftKey&&"down"===n?this.nextYear():e.shiftKey&&"up"===n?this.prevYear():e.shiftKey&&"right"===n?this.nextMonth():e.shiftKey&&"left"===n?this.prevMonth():"esc"===n?this.hide():r.date?this._keyControlDate(n):r.month?this._keyControlMonth(n):r.year&&this._keyControlYear(n)}},_keyControlDate:function(e){if("enter"===e){var a=this.model.selectDate();return this._fillDate(a),void 0}var t={right:1,left:-1,up:-7,down:7};this.model.changeDate(t[e])},_keyControlMonth:function(e){if("enter"===e){var a=this.model.selectDate();return this.model.changeMode("date",{month:a.month()}),void 0}var t={right:1,left:-1,up:-3,down:3};this.model.changeMonth(t[e])},_keyControlYear:function(e){if("enter"===e){var a=this.model.selectDate();return this.model.changeMode("date",{year:a.year()}),void 0}var t={right:1,left:-1,up:-3,down:3};this.model.changeYear(t[e])},_fillDate:function(e){if(!this.model.isInRange(e))return this.trigger("selectDisabledDate",e),this;this.trigger("selectDate",e);var a=this.get("trigger");if(!a)return this;var t=this.get("output");if(t[0].value===void 0)return this;var n=e.format(this.get("format"));t.val(n),this.get("hideOnSelect")&&this.hide()}});m.autoRender=function(e){e.trigger=e.element,e.element="",new m(e)},t.exports=m}),define("arale/calendar/0.8.5/calendar-tpl",["gallery/handlebars/1.0.0/handlebars"],function(e,a,t){var n=e("gallery/handlebars/1.0.0/handlebars");(function(){var e=n.template;n.templates=n.templates||{},t.exports=e(function(e,a,t,n,r){function l(e,a){var n,r,l="";return l+="\n        ",r=t.each.call(e,(n=e.day,null==n||n===!1?n:n.items),{hash:{},inverse:w.noop,fn:w.program(2,i,a),data:a}),(r||0===r)&&(l+=r),l+="\n        "}function i(e,a){var n,r,l="";return l+='\n        <li class="ui-calendar-day ui-calendar-day-',(n=t.value)?n=n.call(e,{hash:{},data:a}):(n=e.value,n=typeof n===_?n.apply(e):n),l+=D(n)+'" data-role="day" data-value="',(n=t.value)?n=n.call(e,{hash:{},data:a}):(n=e.value,n=typeof n===_?n.apply(e):n),l+=D(n)+'">',r={hash:{},data:a},l+=D((n=t._,n?n.call(e,e.label,r):k.call(e,"_",e.label,r)))+"</li>\n        "}function o(e,a){var n,r,l="";return l+="\n        ",r=t.each.call(e,(n=e.date,null==n||n===!1?n:n.items),{hash:{},inverse:w.noop,fn:w.program(5,s,a),data:a}),(r||0===r)&&(l+=r),l+="\n        "}function s(e,a){var n,r="";return r+='\n        <ul class="ui-calendar-date-column">\n            ',n=t.each.call(e,e,{hash:{},inverse:w.noop,fn:w.program(6,h,a),data:a}),(n||0===n)&&(r+=n),r+="\n        </ul>\n        "}function h(e,a){var n,r="";return r+='\n            <li class="ui-calendar-day-',(n=t.day)?n=n.call(e,{hash:{},data:a}):(n=e.day,n=typeof n===_?n.apply(e):n),r+=D(n)+" ",(n=t.className)?n=n.call(e,{hash:{},data:a}):(n=e.className,n=typeof n===_?n.apply(e):n),r+=D(n)+"\n            ",n=t.unless.call(e,e.available,{hash:{},inverse:w.noop,fn:w.program(7,c,a),data:a}),(n||0===n)&&(r+=n),r+='\n            "\n            data-role="date" data-value="',(n=t.value)?n=n.call(e,{hash:{},data:a}):(n=e.value,n=typeof n===_?n.apply(e):n),r+=D(n)+'"\n            >',(n=t.label)?n=n.call(e,{hash:{},data:a}):(n=e.label,n=typeof n===_?n.apply(e):n),r+=D(n)+"</li>\n            "}function c(){return"disabled-date"}function d(e,a){var n,r,l="";return l+="\n        ",r=t.each.call(e,(n=e.month,null==n||n===!1?n:n.items),{hash:{},inverse:w.noop,fn:w.program(10,u,a),data:a}),(r||0===r)&&(l+=r),l+="\n        "}function u(e,a){var n,r="";return r+='\n        <ul class="ui-calendar-month-column">\n            ',n=t.each.call(e,e,{hash:{},inverse:w.noop,fn:w.program(11,m,a),data:a}),(n||0===n)&&(r+=n),r+="\n        </ul>\n        "}function m(e,a){var n,r,l="";return l+='\n            <li data-role="month" data-value="',(n=t.value)?n=n.call(e,{hash:{},data:a}):(n=e.value,n=typeof n===_?n.apply(e):n),l+=D(n)+'">',r={hash:{},data:a},l+=D((n=t._,n?n.call(e,e.label,r):k.call(e,"_",e.label,r)))+"</li>\n            "}function f(e,a){var n,r,l="";return l+="\n        ",r=t.each.call(e,(n=e.year,null==n||n===!1?n:n.items),{hash:{},inverse:w.noop,fn:w.program(14,v,a),data:a}),(r||0===r)&&(l+=r),l+="\n        "}function v(e,a){var n,r="";return r+='\n        <ul class="ui-calendar-year-column">\n            ',n=t.each.call(e,e,{hash:{},inverse:w.noop,fn:w.program(15,g,a),data:a}),(n||0===n)&&(r+=n),r+="\n        </ul>\n        "}function g(e,a){var n,r,l="";return l+='\n            <li data-role="',(n=t.role)?n=n.call(e,{hash:{},data:a}):(n=e.role,n=typeof n===_?n.apply(e):n),l+=D(n)+'" data-value="',(n=t.value)?n=n.call(e,{hash:{},data:a}):(n=e.value,n=typeof n===_?n.apply(e):n),l+=D(n)+'">',r={hash:{},data:a},l+=D((n=t._,n?n.call(e,e.label,r):k.call(e,"_",e.label,r)))+"</li>\n            "}function y(e){var a,t="";return t+='\n        <li class="ui-calendar-time" colspan="2" data-role="time"><span class="ui-calendar-hour">'+D((a=e.time,a=null==a||a===!1?a:a.hour,typeof a===_?a.apply(e):a))+"</span> : "+D((a=e.time,a=null==a||a===!1?a:a.minute,typeof a===_?a.apply(e):a))+"</li>\n        "}this.compilerInfo=[2,">= 1.0.0-rc.3"],t=t||e.helpers,r=r||{};var p,M,Y,b="",_="function",D=this.escapeExpression,k=t.helperMissing,w=this;return b+='<div class="ui-calendar">\n    <ul class="ui-calendar-navigation" data-role="navigation-container">\n        <li class="ui-calendar-previous-year" data-role="prev-year">&lt;&lt;</li>\n        <li class="ui-calendar-previous-month" data-role="prev-month">&lt;</li>\n        <li class="ui-calendar-month-year" data-role="month-year-container">\n        <span class="month" data-role="mode-month" data-value="'+D((p=a.month,p=null==p||p===!1?p:p.current,p=null==p||p===!1?p:p.value,typeof p===_?p.apply(a):p))+'">',Y={hash:{},data:r},b+=D((p=t._,p?p.call(a,(p=a.month,p=null==p||p===!1?p:p.current,null==p||p===!1?p:p.label),Y):k.call(a,"_",(p=a.month,p=null==p||p===!1?p:p.current,null==p||p===!1?p:p.label),Y)))+'</span>\n        <span class="year" data-role="mode-year">'+D((p=a.year,p=null==p||p===!1?p:p.current,p=null==p||p===!1?p:p.label,typeof p===_?p.apply(a):p))+'</span>\n        </li>\n        <li class="ui-calendar-next-month" data-role="next-month">&gt;</li>\n        <li class="ui-calendar-next-year" data-role="next-year">&gt;&gt;</li>\n    </ul>\n\n    <ul class="ui-calendar-control" data-role="pannel-container">\n        ',M=t["if"].call(a,(p=a.mode,null==p||p===!1?p:p.date),{hash:{},inverse:w.noop,fn:w.program(1,l,r),data:r}),(M||0===M)&&(b+=M),b+='\n    </ul>\n\n    <div class="ui-calendar-data-container" data-role="data-container">\n        ',M=t["if"].call(a,(p=a.mode,null==p||p===!1?p:p.date),{hash:{},inverse:w.noop,fn:w.program(4,o,r),data:r}),(M||0===M)&&(b+=M),b+="\n\n        ",M=t["if"].call(a,(p=a.mode,null==p||p===!1?p:p.month),{hash:{},inverse:w.noop,fn:w.program(9,d,r),data:r}),(M||0===M)&&(b+=M),b+="\n\n        ",M=t["if"].call(a,(p=a.mode,null==p||p===!1?p:p.year),{hash:{},inverse:w.noop,fn:w.program(13,f,r),data:r}),(M||0===M)&&(b+=M),b+='\n    </div>\n\n    <ul class="ui-calendar-footer" data-role="time-container">\n        <li class="ui-calendar-today" data-role="today">',Y={hash:{},data:r},b+=D((p=t._,p?p.call(a,(p=a.message,null==p||p===!1?p:p.today),Y):k.call(a,"_",(p=a.message,null==p||p===!1?p:p.today),Y)))+"</li>\n        ",M=t["if"].call(a,(p=a.mode,null==p||p===!1?p:p.time),{hash:{},inverse:w.noop,fn:w.program(17,y,r),data:r}),(M||0===M)&&(b+=M),b+="\n    </ul>\n</div>\n"})})()}),define("arale/calendar/0.8.5/model",["$","arale/base/1.0.1/base","arale/class/1.0.0/class","arale/events/1.0.0/events","gallery/moment/2.0.0/moment"],function(e,a,t){function n(e){if(e=(""+(e||0)).toLowerCase(),h.isNumeric(e))return e=parseInt(e);for(var a=0;f.length>a;a++)if(0===f[a].indexOf(e)){e=a;break}return e}function r(e){var a=[];for(r=0;m.length>r;r++)a.push({value:r,label:m[r]});for(var t={value:e,label:m[e]},n=[],r=0;a.length/3>r;r++)n.push(a.slice(3*r,3*r+3));return{current:t,items:n}}function l(e){for(var a=[{value:e-10,label:". . .",role:"previous-10-year"}],t=e-6;e+4>t;t++)a.push({value:t,label:t,role:"year"});a[7]={value:e,label:e,role:"year",current:!0},a.push({value:e+10,label:". . .",role:"next-10-year"});var n=[];for(t=0;a.length/3>t;t++)n.push(a.slice(3*t,3*t+3));var r={value:e,label:e};return{current:r,items:n}}function i(e){e=n(e);for(var a=[],t=e;7>t;t++)a.push({label:v[t],value:t});for(t=0;e>t;t++)a.push({label:v[t],value:t});var r={value:e,label:v[e]};return{current:r,items:a}}function o(e,a,t){var r,l,i,o=[];a=n(a);var h=function(e,a){o.push({value:e.format("YYYY-MM-DD"),label:e.date(),day:e.day(),className:a,available:s(e,t)})},c=e.clone().date(1),d=c.clone().add("months",-1),u=c.clone().add("months",1);if(r=c.day()-a,0>r&&(r+=7),0!=r)for(i=d.daysInMonth(),f=r-1;f>=0;f--)l=d.date(i-f),h(l,"previous-month");for(i=c.daysInMonth(),f=1;i>=f;f++)l=c.date(f),h(l,"current-month");if(r=35-o.length,0!=r)for(0>r&&(r+=7),f=1;r>=f;f++)l=u.date(f),h(l,"next-month");for(var m=[],f=0;o.length/7>f;f++)m.push(o.slice(7*f,7*f+7));var v={value:e.format("YYYY-MM-DD"),label:e.date()};return{current:v,items:m}}function s(e,a){if(null==a)return!0;if(h.isArray(a)){var t=a[0],n=a[1],r=!0;return t&&(r=r&&e>=d(t)),n&&(r=r&&d(n)>=e),r}return h.isFunction(a)?a(e):!0}var h=e("$"),c=e("arale/base/1.0.1/base"),d=e("gallery/moment/2.0.0/moment"),u=c.extend({attrs:{year:{setter:function(e){return l(e)}},month:{setter:function(e){return r(e)}},day:{setter:function(){return i(this.startDay)}},date:{setter:function(e){return o(e,this.startDay,this.range)}},mode:{setter:function(e){var a={date:!1,month:!1,year:!1};return a[e]=!0,a}},message:null},initialize:function(e){u.superclass.initialize.call(this),this.startDay=e.startDay||0,this.activeTime=d(e.focus).clone(),this.range=e.range||null;var a=e.message||{};a.today="Today",this.set("message",a),this.set("mode","date"),this._refresh()},changeYear:function(e){this.activeTime.add("years",e),this._refresh(),this.trigger("changeYear")},changeMonth:function(e){this.activeTime.add("months",e),this._refresh(),this.trigger("changeMonth")},changeDate:function(e){var a=this.activeTime.format("YYYY-MM");this.activeTime.add("days",e),this._refresh();var t=this.activeTime.format("YYYY-MM");a!=t&&this.get("mode").date&&this.trigger("changeMonth")},changeStartDay:function(e){this.startDay=e,this._refresh(),this.trigger("changeStartday")},changeMode:function(e,a){a||(a={}),"month"in a&&this.activeTime.month(a.month),"year"in a&&this.activeTime.year(a.year),this.get("mode")[e]?this.set("mode","date"):this.set("mode",e),this._refresh(),this.trigger("changeMode")},changeRange:function(e){this.range=e,this._refresh(),this.trigger("changeRange")},selectDate:function(e){if(e){var a=this.activeTime.format("YYYY-MM");this.activeTime=d(e),this._refresh();var t=this.activeTime.format("YYYY-MM");a!=t&&this.get("mode").date&&this.trigger("changeMonth")}return this.activeTime.clone()},isInRange:function(e){return s(e,this.range)},toJSON:function(){var e={},a=this.attrs;for(var t in a)e[t]=this.get(t);return e},_refresh:function(){this.set("year",this.activeTime.year()),this.set("month",this.activeTime.month()),this.set("date",this.activeTime.clone()),this.set("day"),this.trigger("refresh")},range:null,activeTime:null,startDay:0}),m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],f=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],v=["Su","Mo","Tu","We","Th","Fr","Sa"];t.exports=u});