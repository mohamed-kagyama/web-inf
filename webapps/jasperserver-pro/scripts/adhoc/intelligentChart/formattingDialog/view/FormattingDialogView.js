define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var jQuery = require('jquery');

var Backbone = require('backbone');

var i18n = require("bundle!adhoc_messages");

var AdvancedSectionView = require('../view/AdvancedSectionView');

var AppearanceTabWrapper = require('./appearanceTab/AppearanceTabWrapper');

var templateContent = require("text!../template/FormattingDialogTemplate.htm");

var templateContentAxis = require("text!../template/AxisSectionTemplate.htm");

var templateContentLabels = require("text!../template/LabelsSectionTemplate.htm");

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SUB_VIEW_PROPS = ['seriesColors', 'showDataPoints', 'showScatterLine', 'advancedProperties', 'chartBackgroundColor', 'plotBackgroundColor'];

var getModelJsonWithoutSubViewProps = function getModelJsonWithoutSubViewProps(model) {
  return _.omit(model.toJSON(), SUB_VIEW_PROPS);
};

module.exports = Backbone.View.extend({
  template: _.template(templateContent),
  el: '#chartFormatDialog',
  events: {
    'click .applyButton': '_apply',
    'click .okButton': '_ok',
    'click .cancelButton': '_cancel',
    'click ul.tabSet .tab': '_switchTab',
    'change select#legend': '_disableLegendBorderControl',
    'change input#showSingleMeasuresLabels': '_disableMeasureNamesControl'
  },
  open: function open() {
    this.render();
    dialogs.popup.show(this.el, false, {
      useJQueryForDraggable: true
    });
  },
  setState: function setState() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.model.set(state);
  },
  render: function render() {
    var modelJSON = this.model.toJSON();
    this.previousModelState = modelJSON;
    this.advancedSectionView && this.advancedSectionView.remove();
    this.appearanceTab && this.appearanceTab.remove();
    this.$el.empty();
    this.$el.html(this.template({
      i18n: i18n
    }));
    this.$el.find('#axisSection').html(_.template(templateContentAxis)({
      i18n: i18n
    }));
    this.$el.find('#labelsSection').html(_.template(templateContentLabels)({
      i18n: i18n
    }));
    var appearanceTabProps = {
      showDataPoints: modelJSON.showDataPoints,
      showScatterLine: modelJSON.showScatterLine,
      seriesColors: modelJSON.seriesColors,
      chartBackgroundColor: modelJSON.chartBackgroundColor,
      plotBackgroundColor: modelJSON.plotBackgroundColor,
      gaugesLayout: this.model.get('gaugesLayout'),
      gaugesLayoutOptions: [{
        value: 'bestFit',
        label: i18n['ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_GAUGES_LAYOUT_BEST_FIT']
      }, {
        value: 'horizontal',
        label: i18n['ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_GAUGES_LAYOUT_HORIZONTAL']
      }, {
        value: 'vertical',
        label: i18n['ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_GAUGES_LAYOUT_VERTICAL']
      }],
      gaugesMinValue: this.model.get('gaugesMinValue'),
      gaugesMaxValue: this.model.get('gaugesMaxValue'),
      gaugesDecimalPlaces: this.model.get('gaugesDecimalPlaces'),
      gaugesSuffixLabel: this.model.get('gaugesSuffixLabel'),
      gaugeStopColor1Value: this.model.get('gaugeStopColor1Value'),
      gaugeStopColor2Value: this.model.get('gaugeStopColor2Value'),
      gaugeStopColor3Value: this.model.get('gaugeStopColor3Value'),
      gaugeStopColor4Value: this.model.get('gaugeStopColor4Value'),
      gaugeStopColor1Color: this.model.get('gaugeStopColor1Color'),
      gaugeStopColor2Color: this.model.get('gaugeStopColor2Color'),
      gaugeStopColor3Color: this.model.get('gaugeStopColor3Color'),
      gaugeStopColor4Color: this.model.get('gaugeStopColor4Color')
    };
    this.appearanceTab = new AppearanceTabWrapper(this.$el.find('#appearanceSection')[0], appearanceTabProps);
    this.advancedSectionView = new AdvancedSectionView();
    this.advancedSectionView.reset(this.model.get('advancedProperties'));
    this.$el.find('#advancedSection').html(this.advancedSectionView.$el);

    this._renderFields();

    return this;
  },
  _renderFields: function _renderFields() {
    var fields = getModelJsonWithoutSubViewProps(this.model);
    this.inputFields = {};

    _.each(fields, function (param, name) {
      var input = this.$el.find('#' + name);

      if (input.attr('type') === 'checkbox') {
        this.inputFields[name] = input.prop('checked', param);

        if (name === 'showMeasureOnValueAxis') {
          if (this.model.get('showSingleMeasuresLabels')) {
            this.inputFields[name].prop('disabled', false).parent().removeClass('disabled');
          } else {
            this.inputFields[name].prop('disabled', true).parent().addClass('disabled');
          }
        }
      } else {
        this.inputFields[name] = input.val(param);
      }
    }, this);
  },
  _updateModel: function _updateModel() {
    var options = this._extractData();

    this.model.set(options, {
      validate: true
    });
  },
  _isFormValid: function _isFormValid() {
    this.$el.find('#axisSection .error').removeClass('error');
    this.$el.find('#labelsSection .error').removeClass('error');
    this.$el.find('#advancedSection .error').removeClass('error');
    return this.model.isValid();
  },
  _revertInputs: function _revertInputs() {
    // revert invalid inputs and set attr again
    _.each(this.model.validationError, function (msg, fieldName) {
      var input = this.$el.find('#' + fieldName);
      input.val(this.model.get(fieldName));
    }, this);
  },
  _apply: function _apply() {
    this._updateModel();

    if (!this._isFormValid()) {
      return;
    }

    this.model.applyModel();
  },
  _ok: function _ok() {
    this._updateModel();

    if (!this._isFormValid()) {
      return;
    }

    this.model.applyModel();
    dialogs.popup.hide(this.el);
  },
  _cancel: function _cancel() {
    // reset attributes to server state and set first tab active
    this.model.rollbackChangesAfterApply(this.previousModelState);
    dialogs.popup.hide(this.el);
  },
  _switchTab: function _switchTab(e) {
    this._updateModel();

    if (this._isFormValid() || true) {
      var tabs = this.$el.find('ul.tabSet li.tab');
      tabs.removeClass('selected');
      var currentTab = this.$el.find(e.currentTarget);
      currentTab.addClass('selected');
      currentTab.children('a').removeClass('over');
      var tabId = currentTab.attr('id');
      var sectionName = tabId.substring(0, tabId.indexOf('Tab'));
      this.$el.find('div.body.section.noTitle').addClass('hidden');
      this.$el.find('#' + sectionName + 'Section').removeClass('hidden');
    } else {
      this._revertInputs();
    }

    this._resetAdvancedTab();
  },
  _resetAdvancedTab: function _resetAdvancedTab() {
    this.advancedSectionView.resetState();
  },
  _extractData: function _extractData() {
    var fields = getModelJsonWithoutSubViewProps(this.model);
    var options = {};

    _.each(fields, function (param, name) {
      var input = this.inputFields[name];

      if (input.length) {
        if (input.attr('type') === 'checkbox') {
          options[name] = input.prop('checked');
        } else {
          options[name] = input.val();
        }
      }
    }, this);

    return _.extend({}, options, this.appearanceTab.getState(), {
      advancedProperties: this.advancedSectionView.toJSON()
    });
  },
  _disableMeasureNamesControl: function _disableMeasureNamesControl(e) {
    var $showMeasureOnValueAxis = this.$el.find('input#showMeasureOnValueAxis');

    if (jQuery(e.currentTarget).is(':checked')) {
      $showMeasureOnValueAxis.prop('checked', this._tmpPreviousStateShowMeasureOnValueAxis).prop('disabled', false).parent().removeClass('disabled');
    } else {
      this._tmpPreviousStateShowMeasureOnValueAxis = $showMeasureOnValueAxis.prop('checked');
      $showMeasureOnValueAxis.prop('checked', false).prop('disabled', true).parent().addClass('disabled');
    }
  },
  _disableLegendBorderControl: function _disableLegendBorderControl(e) {
    var $legendBorder = this.$el.find('input#legendBorder');

    if (jQuery(e.currentTarget).val() === 'none') {
      $legendBorder.prop('disabled', true).parent().addClass('disabled');
    } else {
      $legendBorder.prop('disabled', false).parent().removeClass('disabled');
    }
  },
  remove: function remove() {
    this.advancedSectionView.remove();
    this.appearanceTab.remove();
    Backbone.View.prototype.remove.call(this);
  }
});

});