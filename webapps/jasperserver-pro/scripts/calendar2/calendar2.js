define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var RelativeDate = require("runtime_dependencies/js-sdk/src/common/util/datetime/RelativeDate");

var RelativeTime = require("runtime_dependencies/js-sdk/src/common/util/datetime/RelativeTime");

var RelativeTimestamp = require("runtime_dependencies/js-sdk/src/common/util/datetime/RelativeTimestamp");

var calendar2Template = require("text!./template/calendar2Template.htm");

var DateAndTimePicker = require("runtime_dependencies/js-sdk/src/components/dateAndTime/DateAndTimePicker");

var i18n = require("bundle!calendar");

require("runtime_dependencies/jrs-ui/src/config/dateAndTimeSettings");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var lodashTemplateSettings = {
  evaluate: /\{\{([\s\S]+?)\}\}/g,
  interpolate: /\{\{=([\s\S]+?)\}\}/g,
  escape: /\{\{-([\s\S]+?)\}\}/g
};

var capitalize = function capitalize(str) {
  str = str == null ? '' : String(str);
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var compiledTemplate = _.template(calendar2Template, null, lodashTemplateSettings);

var Calendar2 = {
  counter: 0,
  // instance counter
  activeMark: 'activeCalendar2',
  // the constant to mark if some element has attached and opened calendar
  // the function can tell you if there is an open calendar on this instance
  hasActiveCalendar: function hasActiveCalendar(elem) {
    return $(elem).hasClass(this.activeMark);
  },
  // service function, returns the Calendar2 object which you can use after
  instance: function instance(config) {
    config = config || {};
    var root = this,
        // pointer to Calendar2 object itself
    state = 'hidden',
        // just a flag
    uniqueId = 'calendar2_' + ++this.counter; // calendar is the object which represents Date or/and Time picker with Relative Date support
    // calendar is the object which represents Date or/and Time picker with Relative Date support

    var calendar = {
      calContainer: false,
      // here we store the link to calendar's DOM tree
      tabs: [],
      // this is the array of links to tabs' DOM trees
      tabButtons: [],
      // the same but for tab controls
      rdFunction: undefined,
      // this is 'main' function, which starts the calendar.
      // this function called automatically
      build: function build() {
        // set values by default
        config.calendarType = config.calendarType || 'datetime';
        config.disabled = config.disabled || false;
        config.relativeTime = config.relativeTime || false;
        config.inputField = $(config.inputField);

        if (config.calendarType == 'date') {
          calendar.rdFunction = RelativeDate;
        } else if (config.calendarType == 'datetime') {
          calendar.rdFunction = RelativeTimestamp;
        } else if (config.calendarType == 'time') {
          calendar.rdFunction = RelativeTime;
        }

        var rdWords = _.map(_.keys(calendar.rdFunction.PATTERNS), function (word) {
          return {
            label: i18n["CAL_relativeTimestamp_" + word.toLocaleLowerCase()],
            value: word
          };
        });

        config.inputField.addClass('hasCalendar2'); // get the HTML for the Calendar2
        // get the HTML for the Calendar2

        calendar.calContainer = $(compiledTemplate({
          uniqueId: uniqueId,
          i18n: i18n,
          rdWords: rdWords,
          calendarType: config.calendarType
        }));
        calendar.calContainer.appendTo('body');
        $('<button type=\'button\' class=\'ui-datepicker-trigger button picker\'></button>').insertAfter(config.inputField);
        calendar.initTabs();
        calendar.attachListeners(); // if user decided to disabled the calendar, then attach a special class to indicate this state
        // if user decided to disabled the calendar, then attach a special class to indicate this state

        if (config.disabled) {
          calendar.calContainer.addClass('disabled');
        } // init relative dates panel and Calendar as well
        // init relative dates panel and Calendar as well


        this.RD.init(calendar.rdFunction);
        this.Calendar.init();
      },
      attachListeners: function attachListeners() {
        calendar.tabButtons.each(function (index, tab) {
          $(tab).on('click', function () {
            calendar.activateTab(index);
          });
        });
        config.inputField.next('.ui-datepicker-trigger').on('click', calendar.show);
        calendar.calContainer.find('.closeButton').on('click', calendar.hide);
        calendar.calContainer.find('.nowButton').on('click', _.bind(calendar.Calendar.setCurrent, calendar.Calendar));
        $(document).on('mousedown', calendar.checkExternalClick);
      },
      removeListeners: function removeListeners() {
        calendar.tabButtons.each(function (index, tab) {
          $(tab).off('click', function () {
            calendar.activateTab(index);
          });
        });
        config.inputField.next('.ui-datepicker-trigger').off('click', calendar.show);
        calendar.calContainer.find('.closeButton').off('click', calendar.hide);
        calendar.calContainer.find('.nowButton').off('click', _.bind(calendar.Calendar.setCurrent, calendar.Calendar));
        $(document).off('mousedown', calendar.checkExternalClick);
      },
      // this function used to determine the moment when user clicked outside the calendar
      // If this happens, this is the indicator to close the calendar
      checkExternalClick: function checkExternalClick(event) {
        if (state == 'shown' && $(event.target).parents('#' + uniqueId).length === 0) {
          calendar.hide();
        }
      },
      initTabs: function initTabs() {
        calendar.tabs = calendar.calContainer.find('.tabs > div');
        calendar.tabButtons = calendar.calContainer.find('.tabsControl > .tabSelect');

        if (config.calendarType === 'time' && !config.relativeTime) {
          calendar.tabs[1].remove();
          calendar.tabButtons[1].remove();
          calendar.calContainer.find('.tabsControl').hide();
        }

        calendar.activateTab(0);
      },
      // used to activate
      activateTab: function activateTab(index) {
        // sanity check
        if (index >= calendar.tabs.length) {
          return;
        }

        calendar.tabButtons.removeClass('opened');
        calendar.tabs.removeClass('opened');
        $(calendar.tabs[index]).addClass('opened');
        $(calendar.tabButtons[index]).addClass('opened');
        calendar.calContainer.find('.nowButton')[index === 1 ? 'hide' : 'show']();
      },
      destroy: function destroy() {
        config.inputField.removeClass('hasCalendar2');
        calendar.removeListeners();
        calendar.RD.destroy();
        calendar.calContainer.remove();
      },
      show: function show() {
        config.inputField.attr('readonly', 'readonly');
        var inputValue = config.inputField.val(),
            inputIsValidRD = calendar.rdFunction.isValid(inputValue);
        calendar.activateTab(inputIsValidRD ? 1 : 0);
        calendar.calContainer.show();
        calendar.Calendar.create();
        inputIsValidRD ? calendar.RD.setValue(inputValue) : calendar.Calendar.setValue(inputValue);
        calendar.adjustPosition(); // place calendar relatively to the called element
        // place calendar relatively to the called element

        state = 'shown'; // 'attachTo' literally means not to attach to the DOM, but to keep relation with this element
        // 'attachTo' literally means not to attach to the DOM, but to keep relation with this element

        var anchor = config.inputField;

        if (anchor.length) {
          anchor.addClass(root.activeMark);
        }
      },
      adjustPosition: function adjustPosition() {
        var anchor = config.inputField;
        var off = anchor.offset();
        var myw = calendar.calContainer.width(),
            myh = calendar.calContainer.height();
        var $w = $(window),
            ww = $w.width(),
            wh = $w.height();

        if (off.top + 25 + myh <= wh || off.top - myh - 5 < 0) {
          // if we don't exceed window height or there is not enough space at the top of the input
          // we put control at the bottom of input field
          off.top += 25;
        } else {
          // in other case we put control at the top of input field
          off.top = off.top - myh - 5;
        }

        if (off.left + myw > ww) {
          off.left = Math.max(ww - (myw + 20), 50); // not closer than 50 pixels to the left of the screen
        }

        calendar.calContainer.offset(off);
      },
      // just hides the calendar from the screen
      hide: function hide() {
        config.inputField.removeAttr('readonly');
        calendar.calContainer.hide();
        calendar.Calendar.destroy();
        state = 'hidden'; // remove the mark from the 'inputField' element
        // remove the mark from the 'inputField' element

        var anchor = config.inputField;

        if (anchor.length) {
          anchor.removeClass(root.activeMark);
        }
      },
      // RD stands for Relative Dates
      RD: {
        possibleValues: [],
        // possible values which user can select
        holder: false,
        // just the container
        date: {},
        init: function init(rdConstructor) {
          this.date = new rdConstructor('', '+', '');
          this.holder = calendar.calContainer.find('.relativeDates > .dates');
          this.attachEventListeners();
        },
        attachEventListeners: function attachEventListeners() {
          this.holder.find('.measure select, .sign select').on('change', this.onSelect);
          this.holder.find('.amount input').on('keyup', this.onSelect);
        },
        removeEventListeners: function removeEventListeners() {
          this.holder.find('.measure select, .sign select').off('change', this.onSelect);
          this.holder.find('.amount input').off('keyup', this.onSelect);
        },
        onSelect: function onSelect() {
          config.inputField.val(calendar.RD.getValue());
          config.inputField.trigger('change');
        },
        destroy: function destroy() {
          this.removeEventListeners();
        },
        getValue: function getValue() {
          this.date.setKeyword(this.holder.find('.measure select').val());
          this.date.setSign(this.holder.find('.sign select').val());
          this.date.setNumber(this.holder.find('.amount input').val());
          return this.date.toString();
        },
        setValue: function setValue(rdValue) {
          var rd = calendar.rdFunction.parse(rdValue);

          if (rd) {
            this.date = rd;
          } else {
            this.date.setKeyword('');
            this.date.setSign('+');
            this.date.setNumber('');
          }

          this.holder.find('.measure select').val(this.date.keyword);
          this.holder.find('.sign select').val(this.date.sign);
          this.holder.find('.amount input').val(this.date.number);
        }
      },
      Calendar: {
        jqueryCalendar: false,
        jqueryCalendarConfig: {},
        jqueryCalendarType: false,
        init: function init() {
          this.jqueryCalendarType = 'datetimepicker';

          if (config.calendarType == 'time') {
            this.jqueryCalendarType = 'timepicker';
          } else if (config.calendarType == 'date') {
            this.jqueryCalendarType = 'datepicker';
          }

          this.jqueryCalendarConfig = {
            dateFormat: 'yy-mm-dd',
            timeFormat: 'HH:mm:ss',
            showHour: false,
            showMinute: false,
            showSecond: false,
            showTime: false,
            constrainInput: false,
            showButtonPanel: false,
            onSelect: function onSelect(dateStr, instance) {
              config.inputField.val(dateStr);
              config.inputField.trigger('change');
            }
          };

          if (config.calendarType == 'datetime' || config.calendarType == 'date') {
            this.jqueryCalendarConfig = _.extend(this.jqueryCalendarConfig, {
              changeYear: true,
              changeMonth: true
            });
          }

          if (config.calendarType == 'datetime' || config.calendarType == 'time') {
            this.jqueryCalendarConfig = _.extend(this.jqueryCalendarConfig, {
              showTime: true,
              showHour: true,
              showMinute: true,
              showSecond: true
            });
          } // apply supplied by user config options to jquery's calendar
          // apply supplied by user config options to jquery's calendar


          this.jqueryCalendarConfig = _.extend(this.jqueryCalendarConfig, config.jqueryPickerOptions || {}); // clean other type format for provide right settings to dateAndTimePicker
          // clean other type format for provide right settings to dateAndTimePicker

          if (config.calendarType == 'time') {
            delete this.jqueryCalendarConfig.dateFormat;
          } else if (config.calendarType == 'date') {
            delete this.jqueryCalendarConfig.timeFormat;
          } // apply special 'disabled' state option
          // apply special 'disabled' state option


          this.jqueryCalendarConfig.disabled = config.disabled; // initialize the jquery's calendar
          // initialize the jquery's calendar

          this.jqueryCalendar = calendar.calContainer.find('#' + uniqueId + '_calendar');
          this.jqueryCalendarConfig.el = this.jqueryCalendar;
        },
        destroy: function destroy() {
          this.picker.remove();
        },
        create: function create() {
          this.picker = new DateAndTimePicker(this.jqueryCalendarConfig);
        },
        getValue: function getValue() {
          return this.picker.getDate();
        },
        setCurrent: function setCurrent() {
          this.picker.setDate(new Date());
          this.jqueryCalendar.find('.ui-datepicker-today').click();
        },
        setValue: function setValue(date) {
          this.picker.setDate(date);
        }
      }
    }; // Ok, now, when the object is constructed, call the build function to initialize the Calendar2
    // Ok, now, when the object is constructed, call the build function to initialize the Calendar2

    calendar.build(); // and then, return this object
    // and then, return this object

    return calendar;
  }
}; // expose module to global scope for modules that are not AMD-compliant

window.Calendar2 = Calendar2;
module.exports = Calendar2;

});