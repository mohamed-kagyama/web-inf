/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore","runtime_dependencies/js-sdk/src/common/util/datetime/RelativeDate","runtime_dependencies/js-sdk/src/common/util/datetime/RelativeTime","runtime_dependencies/js-sdk/src/common/util/datetime/RelativeTimestamp","text!./template/calendar2Template.htm","runtime_dependencies/js-sdk/src/components/dateAndTime/DateAndTimePicker","bundle!calendar","runtime_dependencies/jrs-ui/src/config/dateAndTimeSettings"],function(e,t,n){var i=e("jquery"),a=e("underscore"),r=e("runtime_dependencies/js-sdk/src/common/util/datetime/RelativeDate"),d=e("runtime_dependencies/js-sdk/src/common/util/datetime/RelativeTime"),s=e("runtime_dependencies/js-sdk/src/common/util/datetime/RelativeTimestamp"),o=e("text!./template/calendar2Template.htm"),l=e("runtime_dependencies/js-sdk/src/components/dateAndTime/DateAndTimePicker"),c=e("bundle!calendar");e("runtime_dependencies/jrs-ui/src/config/dateAndTimeSettings");var u={evaluate:/\{\{([\s\S]+?)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,escape:/\{\{-([\s\S]+?)\}\}/g},h=a.template(o,null,u),m={counter:0,activeMark:"activeCalendar2",hasActiveCalendar:function(e){return i(e).hasClass(this.activeMark)},instance:function(e){e=e||{};var t=this,n="hidden",o="calendar2_"+ ++this.counter,u={calContainer:!1,tabs:[],tabButtons:[],rdFunction:void 0,build:function(){e.calendarType=e.calendarType||"datetime",e.disabled=e.disabled||!1,e.relativeTime=e.relativeTime||!1,e.inputField=i(e.inputField),"date"==e.calendarType?u.rdFunction=r:"datetime"==e.calendarType?u.rdFunction=s:"time"==e.calendarType&&(u.rdFunction=d);var t=a.map(a.keys(u.rdFunction.PATTERNS),function(e){return{label:c["CAL_relativeTimestamp_"+e.toLocaleLowerCase()],value:e}});e.inputField.addClass("hasCalendar2"),u.calContainer=i(h({uniqueId:o,i18n:c,rdWords:t,calendarType:e.calendarType})),u.calContainer.appendTo("body"),i("<button type='button' class='ui-datepicker-trigger button picker'></button>").insertAfter(e.inputField),u.initTabs(),u.attachListeners(),e.disabled&&u.calContainer.addClass("disabled"),this.RD.init(u.rdFunction),this.Calendar.init()},attachListeners:function(){u.tabButtons.each(function(e,t){i(t).on("click",function(){u.activateTab(e)})}),e.inputField.next(".ui-datepicker-trigger").on("click",u.show),u.calContainer.find(".closeButton").on("click",u.hide),u.calContainer.find(".nowButton").on("click",a.bind(u.Calendar.setCurrent,u.Calendar)),i(document).on("mousedown",u.checkExternalClick)},removeListeners:function(){u.tabButtons.each(function(e,t){i(t).off("click",function(){u.activateTab(e)})}),e.inputField.next(".ui-datepicker-trigger").off("click",u.show),u.calContainer.find(".closeButton").off("click",u.hide),u.calContainer.find(".nowButton").off("click",a.bind(u.Calendar.setCurrent,u.Calendar)),i(document).off("mousedown",u.checkExternalClick)},checkExternalClick:function(e){"shown"==n&&0===i(e.target).parents("#"+o).length&&u.hide()},initTabs:function(){u.tabs=u.calContainer.find(".tabs > div"),u.tabButtons=u.calContainer.find(".tabsControl > .tabSelect"),"time"!==e.calendarType||e.relativeTime||(u.tabs[1].remove(),u.tabButtons[1].remove(),u.calContainer.find(".tabsControl").hide()),u.activateTab(0)},activateTab:function(e){e>=u.tabs.length||(u.tabButtons.removeClass("opened"),u.tabs.removeClass("opened"),i(u.tabs[e]).addClass("opened"),i(u.tabButtons[e]).addClass("opened"),u.calContainer.find(".nowButton")[1===e?"hide":"show"]())},destroy:function(){e.inputField.removeClass("hasCalendar2"),u.removeListeners(),u.RD.destroy(),u.calContainer.remove()},show:function(){e.inputField.attr("readonly","readonly");var i=e.inputField.val(),a=u.rdFunction.isValid(i);u.activateTab(a?1:0),u.calContainer.show(),u.Calendar.create(),a?u.RD.setValue(i):u.Calendar.setValue(i),u.adjustPosition(),n="shown";var r=e.inputField;r.length&&r.addClass(t.activeMark)},adjustPosition:function(){var t=e.inputField,n=t.offset(),a=u.calContainer.width(),r=u.calContainer.height(),d=i(window),s=d.width(),o=d.height();n.top+25+r<=o||n.top-r-5<0?n.top+=25:n.top=n.top-r-5,n.left+a>s&&(n.left=Math.max(s-(a+20),50)),u.calContainer.offset(n)},hide:function(){e.inputField.removeAttr("readonly"),u.calContainer.hide(),u.Calendar.destroy(),n="hidden";var i=e.inputField;i.length&&i.removeClass(t.activeMark)},RD:{possibleValues:[],holder:!1,date:{},init:function(e){this.date=new e("","+",""),this.holder=u.calContainer.find(".relativeDates > .dates"),this.attachEventListeners()},attachEventListeners:function(){this.holder.find(".measure select, .sign select").on("change",this.onSelect),this.holder.find(".amount input").on("keyup",this.onSelect)},removeEventListeners:function(){this.holder.find(".measure select, .sign select").off("change",this.onSelect),this.holder.find(".amount input").off("keyup",this.onSelect)},onSelect:function(){e.inputField.val(u.RD.getValue()),e.inputField.trigger("change")},destroy:function(){this.removeEventListeners()},getValue:function(){return this.date.setKeyword(this.holder.find(".measure select").val()),this.date.setSign(this.holder.find(".sign select").val()),this.date.setNumber(this.holder.find(".amount input").val()),this.date.toString()},setValue:function(e){var t=u.rdFunction.parse(e);t?this.date=t:(this.date.setKeyword(""),this.date.setSign("+"),this.date.setNumber("")),this.holder.find(".measure select").val(this.date.keyword),this.holder.find(".sign select").val(this.date.sign),this.holder.find(".amount input").val(this.date.number)}},Calendar:{jqueryCalendar:!1,jqueryCalendarConfig:{},jqueryCalendarType:!1,init:function(){this.jqueryCalendarType="datetimepicker","time"==e.calendarType?this.jqueryCalendarType="timepicker":"date"==e.calendarType&&(this.jqueryCalendarType="datepicker"),this.jqueryCalendarConfig={dateFormat:"yy-mm-dd",timeFormat:"HH:mm:ss",showHour:!1,showMinute:!1,showSecond:!1,showTime:!1,constrainInput:!1,showButtonPanel:!1,onSelect:function(t,n){e.inputField.val(t),e.inputField.trigger("change")}},"datetime"!=e.calendarType&&"date"!=e.calendarType||(this.jqueryCalendarConfig=a.extend(this.jqueryCalendarConfig,{changeYear:!0,changeMonth:!0})),"datetime"!=e.calendarType&&"time"!=e.calendarType||(this.jqueryCalendarConfig=a.extend(this.jqueryCalendarConfig,{showTime:!0,showHour:!0,showMinute:!0,showSecond:!0})),this.jqueryCalendarConfig=a.extend(this.jqueryCalendarConfig,e.jqueryPickerOptions||{}),"time"==e.calendarType?delete this.jqueryCalendarConfig.dateFormat:"date"==e.calendarType&&delete this.jqueryCalendarConfig.timeFormat,this.jqueryCalendarConfig.disabled=e.disabled,this.jqueryCalendar=u.calContainer.find("#"+o+"_calendar"),this.jqueryCalendarConfig.el=this.jqueryCalendar},destroy:function(){this.picker.remove()},create:function(){this.picker=new l(this.jqueryCalendarConfig)},getValue:function(){return this.picker.getDate()},setCurrent:function(){this.picker.setDate(new Date),this.jqueryCalendar.find(".ui-datepicker-today").click()},setValue:function(e){this.picker.setDate(e)}}};return u.build(),u}};window.Calendar2=m,n.exports=m});