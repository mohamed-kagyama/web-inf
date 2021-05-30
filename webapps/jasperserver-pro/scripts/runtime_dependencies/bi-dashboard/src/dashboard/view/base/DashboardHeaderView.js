define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var dashboardHeaderTemplate = require("text!../../template/dashboardHeaderTemplate.htm");

var i18n = require("bundle!DashboardBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DashboardHeaderView = Backbone.View.extend({
  el: _.template(dashboardHeaderTemplate, {
    i18n: i18n
  }),
  initialize: function initialize(options) {
    var self = this;
    this.model = options.model;

    if (this.model) {
      this.listenTo(this.model, "change:label", function () {
        this.setTitle(self.model.get("label"));
      });
    }

    this.$toolbarPlaceholder = this.$(".pageHeader-title-controls:not(.pageHeader-title-controlsRight)");
  },
  setTitle: function setTitle(title) {
    this.$el.find(".pageHeader-title-text").text(title);
  },
  setTextButton: function setTextButton(title) {
    this.$el.find('.jr-mButton-label.jr')[0].textContent = title;
  }
});
module.exports = DashboardHeaderView;

});