define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var i18n = require('bundle!all');

var _ = require('underscore');

var notificationsTabTemplate = require("text!runtime_dependencies/jrs-ui/src/scheduler/template/editor/notificationsTabTemplate.htm");

var NotificationsTabView = require("runtime_dependencies/jrs-ui/src/scheduler/view/editor/NotificationsTabView");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = NotificationsTabView.extend({
  render: function render() {
    if (this.options.isDashboard) {
      i18n['report.scheduling.job.edit.includereportasrepositorylinksinemailbody'] = i18n['dashboard.scheduling.job.edit.includereportasrepositorylinksinemailbody'];
      i18n['report.scheduling.job.edit.includereportfilesasattachments'] = i18n['dashboard.scheduling.job.edit.includereportfilesasattachments'];
      i18n['report.scheduling.job.edit.includereportfiesaszip'] = i18n['dashboard.scheduling.job.edit.includereportfiesaszip'];
      i18n['report.scheduling.job.edit.includereport'] = i18n['dashboard.scheduling.job.edit.includereport'];
      this.setElement($(_.template(notificationsTabTemplate, {
        i18n: i18n
      })));
      $(this.$('#jrsSchedule_includeHtmlReport').parents('.leaf')[0]).hide();
      $(this.$('#jrsSchedule_dont_send_empty_report').parents('.leaf')[0]).hide();
    } else {
      return NotificationsTabView.prototype.render.apply(this, arguments);
    }
  }
});

});