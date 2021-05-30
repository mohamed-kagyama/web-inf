define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseInputControlView = require('../BaseInputControlView');

var $ = require('jquery');

var SingleSelect = require("runtime_dependencies/js-sdk/src/components/singleSelect/view/SingleSelect");

var CacheableDataProvider = require("runtime_dependencies/js-sdk/src/components/singleSelect/dataprovider/CacheableDataProvider");

var icHelper = require('../../util/inputControlHelpers');

var singleSelectTemplate = require("text!../../template/singleSelectTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseInputControlView.extend({
  template: singleSelectTemplate,
  renderStructure: function renderStructure() {
    if (!this.singleSelect) {
      this.dataProvider = new CacheableDataProvider();
      this.singleSelect = new SingleSelect({
        getData: this.dataProvider.getData
      }).setDisabled(this.model.get("readOnly"));
    }

    if (this.template) {
      this.singleSelect.undelegateEvents();
      this.setElement($(_.template(this.template || "")(this._renderData())));
      this.singleSelect.renderData();
      this.singleSelect.$el.insertBefore(this.$el.find(".jr-mInput-alert"));
      this.singleSelect.delegateEvents();
      this.updateOptionsSelection();
    }
  },
  updateOptionsSelection: function updateOptionsSelection() {
    var controlData = this.model.state.options.toJSON();
    this.dataProvider.setData(controlData);
    var that = this;
    this.singleSelect.fetch(function () {
      that.singleSelect.setValue(icHelper.extractSelection(controlData, true), {
        silent: true
      });
    });
  },
  bindCustomEventListeners: function bindCustomEventListeners() {
    var self = this;
    this.singleSelect.off("selection:change").on("selection:change", function (selection) {
      this.model.changeState(selection);
    }, this);
    this.model.state.options.on("reset", this.updateOptionsSelection, this);
    this.model.state.options.on("change:selected", this.updateOptionsSelection, this);
    this.$el.on("click", ".jr-mInput-label", function () {
      self.singleSelect.$input.focus();
    });
  },
  remove: function remove() {
    this.$el.off('change', 'input');
    this.$el.off('click', 'a');
    this.$el.off('click', '.jr-mInput-label');
    this.singleSelect.remove();
    this.model.state.options.off("reset", this.updateOptionsSelection, this);
    this.model.state.options.off("change:selected", this.updateOptionsSelection, this);
    BaseInputControlView.prototype.remove.call(this);
  }
});

});