define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseInputControlView = require('../BaseInputControlView');

var Sizer = require("runtime_dependencies/js-sdk/src/components/sizer/Sizer");

var $ = require('jquery');

var _ = require('underscore');

var icHelper = require('../../util/inputControlHelpers');

var singleSelectRadioTemplate = require("text!../../template/singleSelectRadioTemplate.htm");

var radioInputItem = require("text!../../template/radioInputItem.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DEFAULT_MIN_ITEMS_COUNT = 3,
    DEFAULT_VISIBLE_ITEMS_COUNT = 5,
    BORDER_OFFSET = 2;
module.exports = BaseInputControlView.extend({
  template: singleSelectRadioTemplate,
  renderStructure: function renderStructure() {
    this.$el = $(_.template(this.template || "")(this._renderData()));
    this.$radioContainer = this.$el.find('.jr-mInput-set');
    this.renderOptions();
    this.once("attached", this._checkForRealAttachedToDOM, this);
    return this;
  },
  renderOptions: function renderOptions() {
    var list = this.$radioContainer.find('ul')[0];

    var data = _.map(this.model.state.options.toJSON(), function (val) {
      var result = _.clone(val);

      result.readOnly = this.model.get("readOnly");
      result.name = this.getOptionName();
      result.uuid = "jr-label-id-" + _.uniqueId(this.model.get("id"));
      return result;
    }, this);

    icHelper.setInnerHtml(list, function (data) {
      return _.template(radioInputItem)(data);
    }, {
      data: data
    });

    this._handleHeight();
  },
  updateOptionsSelection: function updateOptionsSelection() {
    var that = this;
    this.model.state.options.each(function (option) {
      that.$radioContainer.find("input[value='" + option.get("value") + "']").prop('checked', option.get("selected"));
    });

    this._handleHeight();
  },
  _checkForRealAttachedToDOM: function _checkForRealAttachedToDOM() {
    if (this._getItemHeight()) {
      this.attached = true;
      this.$radioContainer.height(this._calcHeightByItemsCount(DEFAULT_VISIBLE_ITEMS_COUNT));

      this._initSizer();
    } else {
      _.delay(_.bind(this._checkForRealAttachedToDOM, this), 500);
    }
  },
  _initSizer: function _initSizer() {
    this.sizer = new Sizer({
      container: this.$radioContainer
    });
    this.$el.append(this.sizer.$el);

    this._handleHeight();
  },
  _handleHeight: function _handleHeight() {
    var totalItems = this.model.state.options.length;

    if (!this.attached || !totalItems || !this._getItemHeight()) {
      return;
    }

    var currentHeight = this.$radioContainer.height(),
        height = currentHeight; // calculate min and max for sizer

    var minHeight = this._calcHeightByItemsCount(DEFAULT_MIN_ITEMS_COUNT);

    var maxHeight = this._calcHeightByItemsCount(totalItems) + BORDER_OFFSET; // calculate height for container

    if (totalItems <= DEFAULT_VISIBLE_ITEMS_COUNT) {
      // if totalItems smaller than DEFAULT_VISIBLE_ITEMS_COUNT then set full height and equalize min and max (to disable sizer)
      minHeight = maxHeight = height = this._calcHeightByItemsCount(Math.max(DEFAULT_MIN_ITEMS_COUNT, totalItems));
    } else if (currentHeight > maxHeight) {
      // currentHeight bigger than maxHeight, so we need to crop it to maxHeight
      height = this._calcHeightByItemsCount(totalItems);
    }

    this.$radioContainer.height(height);
    this.sizer.updateMinMax({
      minHeight: minHeight,
      maxHeight: maxHeight
    });

    if (minHeight === maxHeight) {
      this.sizer.hide();
      this.$radioContainer.css("overflow-y", "auto");
    } else {
      this.sizer.show();
      this.$radioContainer.css("overflow-y", "scroll");
    }
  },
  _calcHeightByItemsCount: function _calcHeightByItemsCount(count) {
    var itemHeight = this._getItemHeight(),
        offset = Math.round(parseFloat(this.$radioContainer.find("ul").css("margin-top")) || 0);

    return count * itemHeight + offset;
  },
  _getItemHeight: function _getItemHeight() {
    return this.$radioContainer.find("li").outerHeight();
  },
  getOptionName: function getOptionName() {
    return this.model.get("id") + "_option";
  },
  bindCustomEventListeners: function bindCustomEventListeners() {
    if (!this.model.get("readOnly")) {
      var that = this;
      this.$el.on('change', 'input', _.bind(function (evt) {
        var selection = evt.target.value; // for better performance in IE7

        setTimeout(function () {
          that.model.changeState(selection);
        });
      }, this));
    }

    this.model.state.options.on("reset", this.renderOptions, this);
    this.model.state.options.on("change:selected", this.updateOptionsSelection, this);
  },
  remove: function remove() {
    this.$el.off('change', 'input');
    this.singleSelect && this.singleSelect.remove();
    this.model.state.options.off("reset", this.renderOptions, this);
    this.model.state.options.off("change:selected", this.updateOptionsSelection, this);
    BaseInputControlView.prototype.remove.call(this);
  }
});

});