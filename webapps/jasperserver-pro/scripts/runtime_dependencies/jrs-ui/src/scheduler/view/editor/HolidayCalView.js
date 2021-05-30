define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var i18n = require("bundle!all");

var Backbone = require('backbone');

var holidayCalendarTemplate = require("text!../../template/editor/holidayCalendarTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft,
 * the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
module.exports = Backbone.View.extend({
  initialize: function initialize() {
    this.listenTo(this.collection, 'reset change', this.render);
  },
  render: function render() {
    var $calendarView = $(_.template(holidayCalendarTemplate, {
      i18n: i18n
    }));
    this.$el.empty().append($calendarView);
    var calendarBlock = this.$el.find('.calendarBlock');
    var calendarSelect = this.$el.find('[name=calendarSelect]'); // who knows, maybe it has the 'disabled' class, so remove it.

    calendarBlock.removeClass('disabled').find('select').attr('disabled', false);
    calendarSelect.empty('');
    var $option;

    if (this.collection.size() === 0) {
      $option = $('<option>').attr('value', '').text(i18n['report.scheduling.job.edit.trigger.calendars.nocalendars']);
      calendarSelect.append($option); // mark the whole block with class name as disabled

      calendarBlock.addClass('disabled').find('select').attr('disabled', 'disabled');
      return this;
    }

    $option = $('<option>').attr('value', '').text(i18n['label.none']);
    calendarSelect.append($option);
    this.collection.forEach(function (calendar) {
      $option = $('<option>').attr('value', calendar.id).text(calendar.id);
      calendarSelect.append($option);
    });
    return this;
  }
});

});