define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseInputControlView = require('../BaseInputControlView');

var $ = require('jquery');

var selectedItemsDataProviderSorterFactory = require("runtime_dependencies/js-sdk/src/components/multiSelect/dataprovider/selectedItemsDataProviderSorterFactory");

var substitutionConstants = require('../../enum/substitutionConstants');

var MultiSelect = require("runtime_dependencies/js-sdk/src/components/multiSelect/view/MultiSelect");

var DataProviderWithLabelHash = require("runtime_dependencies/js-sdk/src/components/multiSelect/dataprovider/DataProviderWithLabelHash");

var icHelper = require('../../util/inputControlHelpers');

var multiSelectTemplate = require("text!../../template/multiSelectTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseInputControlView.extend({
  template: multiSelectTemplate,
  renderStructure: function renderStructure() {
    var self = this;

    if (!this.multiSelect) {
      this.dataProvider = new DataProviderWithLabelHash();
      this.multiSelect = new MultiSelect({
        getData: this.dataProvider.getData,
        selectedListOptions: {
          formatLabel: function formatLabel(value) {
            return self.dataProvider.getDataLabelHash()[value];
          },
          sortFunc: selectedItemsDataProviderSorterFactory.create(substitutionConstants.NULL_SUBSTITUTION_LABEL)
        },
        resizable: true
      });
      this.multiSelect.setDisabled(this.model.get("readOnly"));
    }

    if (this.template) {
      this.multiSelect.undelegateEvents();
      this.setElement($(_.template(this.template || "")(this._renderData())));
      this.multiSelect.render().renderData();
      this.$el.find(".jr-mInput-label").after(this.multiSelect.el); //according to IC specifics, sizer should be before alert message

      this.multiSelect.$el.find(".jr-mSizer").detach().insertAfter(this.$el.find(".jr-mInput-alert"));
      this.multiSelect.delegateEvents();
      this.updateOptionsSelection();
    }
  },
  updateOptionsSelection: function updateOptionsSelection() {
    var controlData = this.model.state.options.toJSON();
    this.dataProvider.setData(controlData);
    var that = this;
    this.multiSelect.fetch(function () {
      var selection = icHelper.extractSelection(controlData);
      that.multiSelect.setValue(selection, {
        silent: true
      });
      that.multiSelect.resize();
    }, {
      keepPosition: true
    });
  },
  bindCustomEventListeners: function bindCustomEventListeners() {
    this.multiSelect.off("selection:change").on("selection:change", function (selection) {
      this.model.changeState(selection);
    }, this);
    this.model.state.options.on("reset", this.updateOptionsSelection, this);
    this.model.state.options.on("change:selected", this.updateOptionsSelection, this);
  },
  remove: function remove() {
    this.multiSelect.remove();
    this.model.state.options.off("reset", this.updateOptionsSelection, this);
    this.model.state.options.off("change:selected", this.updateOptionsSelection, this);
    BaseInputControlView.prototype.remove.call(this);
  }
});

});